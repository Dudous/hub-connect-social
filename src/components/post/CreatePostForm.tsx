
import { useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Image, Smile, X } from "lucide-react";

const CreatePostForm = () => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && !image) return;
    
    setIsSubmitting(true);
    
    // In a real app, this would send the post to your API
    setTimeout(() => {
      setContent("");
      setImage(null);
      setIsSubmitting(false);
      
      // For demo purposes, we'd add the new post to the feed here
      console.log("Post submitted:", { content, image });
    }, 1000);
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
      <div className="flex gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <Textarea
            placeholder="What's happening?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-20 border-none resize-none p-0 focus-visible:ring-0 text-base placeholder:text-gray-500"
          />
          
          {image && (
            <div className="relative mt-3">
              <img
                src={image}
                alt="Upload preview"
                className="rounded-xl max-h-80 w-full object-cover"
              />
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full h-8 w-8"
                onClick={() => setImage(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
          
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
            <div className="flex gap-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-connecthub-blue rounded-full"
                onClick={() => fileInputRef.current?.click()}
              >
                <Image className="h-5 w-5" />
              </Button>
              <input 
                ref={fileInputRef}
                type="file" 
                accept="image/*" 
                onChange={handleFileChange}
                hidden
              />
              
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-connecthub-blue rounded-full"
              >
                <Smile className="h-5 w-5" />
              </Button>
            </div>
            
            <Button
              type="submit"
              className="gradient-bg rounded-full px-5"
              disabled={(!content.trim() && !image) || isSubmitting}
            >
              {isSubmitting ? "Posting..." : "Post"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreatePostForm;
