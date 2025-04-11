
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Heart, MessageCircle, MoreHorizontal, Repeat2, Share } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export interface PostData {
  id: string;
  author: {
    id: string;
    name: string;
    username: string;
    avatar?: string;
  };
  content: string;
  image?: string;
  createdAt: Date;
  likes: number;
  comments: number;
  reposts: number;
  isLiked?: boolean;
}

interface PostCardProps {
  post: PostData;
}

const PostCard = ({ post }: PostCardProps) => {
  const [liked, setLiked] = useState(post.isLiked || false);
  const [likeCount, setLikeCount] = useState(post.likes);
  
  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
      <div className="flex items-start space-x-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={post.author.avatar} />
          <AvatarFallback>
            {post.author.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <p className="font-medium text-gray-900">{post.author.name}</p>
              <span className="text-gray-500">@{post.author.username}</span>
              <span className="text-gray-400">·</span>
              <span className="text-gray-500 text-sm">
                {formatDistanceToNow(post.createdAt, { addSuffix: true })}
              </span>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Bookmark</DropdownMenuItem>
                <DropdownMenuItem>Report</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">Block User</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <p className="mt-2 text-gray-800">{post.content}</p>
          
          {post.image && (
            <div className="mt-3">
              <img 
                src={post.image} 
                alt="Post content" 
                className="rounded-xl max-h-96 w-full object-cover" 
              />
            </div>
          )}
          
          <div className="flex items-center justify-between mt-4 text-gray-500">
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center space-x-1" 
              onClick={handleLike}
            >
              <Heart className={cn(
                "h-4 w-4", 
                liked ? "text-red-500 fill-red-500" : ""
              )} />
              <span>{likeCount}</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="flex items-center space-x-1">
              <MessageCircle className="h-4 w-4" />
              <span>{post.comments}</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="flex items-center space-x-1">
              <Repeat2 className="h-4 w-4" />
              <span>{post.reposts}</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="flex items-center">
              <Share className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
