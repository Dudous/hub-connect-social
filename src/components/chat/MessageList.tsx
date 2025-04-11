
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export interface Message {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  timestamp: Date;
  isRead: boolean;
  isSent: boolean;
}

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
}

const MessageList = ({ messages, currentUserId }: MessageListProps) => {
  return (
    <div className="flex flex-col space-y-4 p-4">
      {messages.map((message) => {
        const isOwnMessage = message.senderId === currentUserId;
        
        return (
          <div 
            key={message.id} 
            className={cn(
              "flex gap-2", 
              isOwnMessage ? "flex-row-reverse" : ""
            )}
          >
            {!isOwnMessage && (
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarImage src={message.senderAvatar} />
                <AvatarFallback>
                  {message.senderName.charAt(0)}
                </AvatarFallback>
              </Avatar>
            )}
            
            <div>
              <div 
                className={cn(
                  "px-4 py-2 rounded-2xl max-w-xs",
                  isOwnMessage 
                    ? "bg-connecthub-blue text-white rounded-br-none" 
                    : "bg-gray-100 text-gray-900 rounded-bl-none"
                )}
              >
                <p>{message.text}</p>
              </div>
              
              <div 
                className={cn(
                  "text-xs mt-1", 
                  isOwnMessage ? "text-right" : "",
                  "text-gray-500"
                )}
              >
                {formatDistanceToNow(message.timestamp, { addSuffix: true })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
