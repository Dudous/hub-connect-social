
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Paperclip, SendHorizonal, Smile } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onTyping?: () => void;
  isLoading?: boolean;
}

const ChatInput = ({ onSendMessage, onTyping, isLoading = false }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    if (onTyping) {
      onTyping();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t p-3">
      <div className="flex items-end gap-2">
        <div className="flex-1 relative">
          <Textarea
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="resize-none pr-12 min-h-[60px] max-h-32"
            disabled={isLoading}
          />
          
          <div className="absolute right-2 bottom-2 flex gap-1">
            <Button type="button" size="icon" variant="ghost" className="h-8 w-8">
              <Smile className="h-5 w-5 text-gray-500" />
            </Button>
            
            <Button type="button" size="icon" variant="ghost" className="h-8 w-8">
              <Paperclip className="h-5 w-5 text-gray-500" />
            </Button>
          </div>
        </div>
        
        <Button 
          type="submit"
          size="icon" 
          className="gradient-bg rounded-full h-10 w-10"
          disabled={!message.trim() || isLoading}
        >
          <SendHorizonal className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
};

export default ChatInput;
