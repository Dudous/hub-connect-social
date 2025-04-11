
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

// Initialize express app
const app = express();
app.use(cors());
app.use(express.json());

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:8080", // Your frontend URL
    methods: ["GET", "POST"]
  }
});

// In-memory storage for messages (replace with a database in production)
const messages = [];
const conversations = new Map();

// Socket.IO connection handler
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
  
  // Handle joining a conversation
  socket.on('join_conversation', (conversationId) => {
    socket.join(conversationId);
    console.log(`User ${socket.id} joined conversation: ${conversationId}`);
    
    // Send conversation history to the user
    const conversationMessages = messages.filter(
      msg => msg.conversationId === conversationId
    );
    socket.emit('conversation_history', conversationMessages);
  });

  // Handle sending messages
  socket.on('send_message', (messageData) => {
    console.log('Message received:', messageData);
    
    const newMessage = {
      id: Date.now().toString(),
      ...messageData,
      timestamp: new Date(),
    };
    
    // Store the message
    messages.push(newMessage);
    
    // Add to conversation tracking
    if (!conversations.has(messageData.conversationId)) {
      conversations.set(messageData.conversationId, []);
    }
    conversations.get(messageData.conversationId).push(newMessage);
    
    // Broadcast to everyone in the conversation
    io.to(messageData.conversationId).emit('receive_message', newMessage);
  });

  // Handle typing indicator
  socket.on('typing', (data) => {
    socket.to(data.conversationId).emit('user_typing', {
      userId: data.userId,
      username: data.username,
      isTyping: data.isTyping
    });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// API Routes for conversations and messages
app.get('/api/conversations/:userId', (req, res) => {
  const { userId } = req.params;
  
  // In a real app, you would query a database here
  // This is just a simple implementation
  const userConversations = Array.from(conversations.entries())
    .filter(([_, msgs]) => 
      msgs.some(msg => msg.senderId === userId || msg.receiverId === userId)
    )
    .map(([conversationId, msgs]) => {
      const lastMessage = msgs[msgs.length - 1];
      const otherUserId = lastMessage.senderId === userId ? 
        lastMessage.receiverId : lastMessage.senderId;
      
      // In a real app, you would lookup user details from a database
      return {
        id: conversationId,
        user: {
          id: otherUserId,
          name: `User ${otherUserId}`, // Placeholder
          username: `user${otherUserId}`,
          isOnline: true // Placeholder - would be tracked properly in a real app
        },
        lastMessage: {
          text: lastMessage.text,
          timestamp: lastMessage.timestamp,
          isRead: lastMessage.isRead || false,
          sentByMe: lastMessage.senderId === userId
        }
      };
    });
  
  res.json(userConversations);
});

app.get('/api/messages/:conversationId', (req, res) => {
  const { conversationId } = req.params;
  const conversationMessages = messages.filter(
    msg => msg.conversationId === conversationId
  );
  res.json(conversationMessages);
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
