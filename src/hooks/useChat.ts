
import { useState, useEffect, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { Message } from "@/components/chat/MessageList";

const SOCKET_URL = "http://localhost:3001";

interface ChatState {
  connected: boolean;
  messages: Message[];
  isTyping: {[userId: string]: boolean};
}

interface UseChatOptions {
  conversationId: string;
  userId: string;
  userName: string;
}

interface SendMessageParams {
  text: string;
  receiverId: string;
}

export const useChat = ({ conversationId, userId, userName }: UseChatOptions) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [state, setState] = useState<ChatState>({
    connected: false,
    messages: [],
    isTyping: {},
  });

  // Initialize connection
  useEffect(() => {
    const socketInstance = io(SOCKET_URL);
    
    socketInstance.on("connect", () => {
      console.log("Connected to chat server");
      setState(prev => ({ ...prev, connected: true }));
      
      // Join the conversation room
      socketInstance.emit("join_conversation", conversationId);
    });
    
    socketInstance.on("disconnect", () => {
      console.log("Disconnected from chat server");
      setState(prev => ({ ...prev, connected: false }));
    });
    
    socketInstance.on("conversation_history", (messages: Message[]) => {
      setState(prev => ({ ...prev, messages }));
    });
    
    socketInstance.on("receive_message", (message: Message) => {
      setState(prev => ({
        ...prev,
        messages: [...prev.messages, message],
      }));
    });
    
    socketInstance.on("user_typing", ({ userId, isTyping }) => {
      setState(prev => ({
        ...prev,
        isTyping: { ...prev.isTyping, [userId]: isTyping },
      }));
    });
    
    setSocket(socketInstance);
    
    return () => {
      socketInstance.disconnect();
    };
  }, [conversationId]);

  // Send message
  const sendMessage = useCallback(({ text, receiverId }: SendMessageParams) => {
    if (!socket || !socket.connected) return;
    
    const messageData = {
      conversationId,
      text,
      senderId: userId,
      senderName: userName,
      receiverId,
      timestamp: new Date(),
      isRead: false,
    };
    
    socket.emit("send_message", messageData);
  }, [socket, conversationId, userId, userName]);

  // Typing indicator
  const setTyping = useCallback((isTyping: boolean) => {
    if (!socket || !socket.connected) return;
    
    socket.emit("typing", {
      conversationId,
      userId,
      username: userName,
      isTyping,
    });
  }, [socket, conversationId, userId, userName]);

  // Fetch conversation list (for initial load)
  const fetchConversations = useCallback(async () => {
    try {
      const response = await fetch(`${SOCKET_URL}/api/conversations/${userId}`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching conversations:", error);
      return [];
    }
  }, [userId]);

  return {
    connected: state.connected,
    messages: state.messages,
    isTyping: state.isTyping,
    sendMessage,
    setTyping,
    fetchConversations,
  };
};
