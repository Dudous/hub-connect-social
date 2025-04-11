import { useState, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AppLayout from "@/components/layout/AppLayout";
import { Message } from "@/components/chat/MessageList";
import MessageList from "@/components/chat/MessageList";
import ChatInput from "@/components/chat/ChatInput";
import { Search } from "lucide-react";
import { useChat } from "@/hooks/useChat";
import { toast } from "@/components/ui/sonner";

interface Conversation {
  id: string;
  user: {
    id: string;
    name: string;
    username: string;
    avatar?: string;
    isOnline: boolean;
  };
  lastMessage?: {
    text: string;
    timestamp: Date;
    isRead: boolean;
    sentByMe: boolean;
  };
}

const currentUser = {
  id: "currentUser",
  name: "John Doe",
  username: "johndoe"
};

const sampleConversations: Conversation[] = [
  {
    id: "conv1",
    user: {
      id: "user2",
      name: "Sarah Johnson",
      username: "sarahj",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      isOnline: true,
    },
    lastMessage: {
      text: "That sounds great! Looking forward to it.",
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      isRead: true,
      sentByMe: false,
    },
  },
  {
    id: "conv2",
    user: {
      id: "user3",
      name: "Tech Insights",
      username: "techinsights",
      avatar: "https://randomuser.me/api/portraits/men/46.jpg",
      isOnline: false,
    },
    lastMessage: {
      text: "Thanks for sharing that article!",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: true,
      sentByMe: true,
    },
  },
  {
    id: "conv3",
    user: {
      id: "user4",
      name: "Alex Williams",
      username: "alexw",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      isOnline: true,
    },
    lastMessage: {
      text: "When are you free to discuss the project?",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      isRead: false,
      sentByMe: false,
    },
  },
];

const sampleMessages: Message[] = [
  {
    id: "msg1",
    text: "Hey there! How's your day going?",
    senderId: "user2",
    senderName: "Sarah Johnson",
    senderAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    timestamp: new Date(Date.now() - 35 * 60 * 1000),
    isRead: true,
    isSent: true,
  },
  {
    id: "msg2",
    text: "Hi Sarah! Pretty good, just working on the ConnectHub project. How about you?",
    senderId: "currentUser",
    senderName: "John Doe",
    timestamp: new Date(Date.now() - 34 * 60 * 1000),
    isRead: true,
    isSent: true,
  },
  {
    id: "msg3",
    text: "I'm good too! I saw your latest post about the project. It looks amazing!",
    senderId: "user2",
    senderName: "Sarah Johnson",
    senderAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    isRead: true,
    isSent: true,
  },
  {
    id: "msg4",
    text: "Thank you! I've been working hard on it. Would you like to meet up sometime to discuss potential collaborations?",
    senderId: "currentUser",
    senderName: "John Doe",
    timestamp: new Date(Date.now() - 25 * 60 * 1000),
    isRead: true,
    isSent: true,
  },
  {
    id: "msg5",
    text: "That sounds great! Looking forward to it.",
    senderId: "user2",
    senderName: "Sarah Johnson",
    senderAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    isRead: true,
    isSent: true,
  },
];

const MessagesPage = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  const activeConversation = conversations.find(conv => conv.id === selectedConversation);
  
  const { 
    connected,
    messages, 
    isTyping,
    sendMessage,
    setTyping,
    fetchConversations
  } = useChat({
    conversationId: selectedConversation || "default",
    userId: currentUser.id,
    userName: currentUser.name
  });
  
  useEffect(() => {
    const loadConversations = async () => {
      setLoading(true);
      
      try {
        setConversations(sampleConversations);
        
        if (sampleConversations.length > 0) {
          setSelectedConversation(sampleConversations[0].id);
        }
      } catch (error) {
        console.error("Error loading conversations:", error);
        toast.error("Failed to load conversations");
      } finally {
        setLoading(false);
      }
    };
    
    loadConversations();
  }, []);
  
  const handleSendMessage = (text: string) => {
    if (!selectedConversation || !activeConversation) return;
    
    try {
      sendMessage({
        text,
        receiverId: activeConversation.user.id
      });
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    }
  };
  
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const handleTyping = () => {
    if (!selectedConversation) return;
    
    setTyping(true);
    
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    typingTimeoutRef.current = setTimeout(() => {
      setTyping(false);
    }, 2000);
  };
  
  return (
    <AppLayout>
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm h-[calc(100vh-180px)] flex flex-col md:flex-row overflow-hidden">
        <div className="md:w-80 border-r border-gray-200 flex flex-col">
          <div className="p-3 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search messages"
                className="pl-8 bg-gray-100 border-none"
              />
            </div>
          </div>
          
          <div className="overflow-y-auto flex-1">
            {loading ? (
              Array(3)
                .fill(null)
                .map((_, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 border-b border-gray-100 animate-pulse">
                    <div className="h-12 w-12 rounded-full bg-gray-200" />
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-24 mb-2" />
                      <div className="h-3 bg-gray-200 rounded w-32" />
                    </div>
                  </div>
                ))
            ) : (
              conversations.map((conv) => (
                <button
                  key={conv.id}
                  className={`flex items-center gap-3 p-3 w-full text-left hover:bg-gray-50 transition-colors ${
                    selectedConversation === conv.id ? "bg-gray-50" : ""
                  } ${!conv.lastMessage?.isRead && conv.lastMessage?.sentByMe === false ? "font-medium" : ""}`}
                  onClick={() => setSelectedConversation(conv.id)}
                >
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={conv.user.avatar} />
                      <AvatarFallback>{conv.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {conv.user.isOnline && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium truncate">{conv.user.name}</p>
                      {conv.lastMessage && (
                        <p className="text-xs text-gray-500">
                          {conv.lastMessage.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      )}
                    </div>
                    
                    {conv.lastMessage && (
                      <p className="text-xs text-gray-500 truncate">
                        {conv.lastMessage.sentByMe && "You: "}
                        {conv.lastMessage.text}
                      </p>
                    )}
                  </div>
                  
                  {!conv.lastMessage?.isRead && !conv.lastMessage?.sentByMe && (
                    <span className="h-2.5 w-2.5 rounded-full bg-connecthub-blue" />
                  )}
                </button>
              ))
            )}
          </div>
        </div>
        
        <div className="flex-1 flex flex-col">
          {selectedConversation && activeConversation ? (
            <>
              <div className="p-3 border-b border-gray-200 flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={activeConversation.user.avatar} />
                  <AvatarFallback>
                    {activeConversation.user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <p className="font-medium">{activeConversation.user.name}</p>
                  <p className="text-xs text-gray-500">
                    {activeConversation.user.isOnline ? (
                      <span className="text-green-500">Online</span>
                    ) : (
                      "Offline"
                    )}
                  </p>
                </div>
                
                {!connected && (
                  <div className="ml-auto px-2 py-1 text-xs bg-yellow-50 text-yellow-700 rounded">
                    Reconnecting...
                  </div>
                )}
              </div>
              
              <div className="flex-1 overflow-y-auto">
                <MessageList messages={messages} currentUserId={currentUser.id} />
                
                {Object.values(isTyping).some(Boolean) && (
                  <div className="px-4 py-2 text-sm text-gray-500 italic">
                    Someone is typing...
                  </div>
                )}
              </div>
              
              <ChatInput 
                onSendMessage={handleSendMessage} 
                isLoading={!connected}
                onTyping={handleTyping}
              />
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select a conversation to start messaging
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default MessagesPage;
