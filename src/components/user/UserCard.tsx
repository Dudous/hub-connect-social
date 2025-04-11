
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export interface UserData {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  bio?: string;
  isFollowing: boolean;
}

interface UserCardProps {
  user: UserData;
  onFollow?: (userId: string, isFollowing: boolean) => void;
}

const UserCard = ({ user, onFollow }: UserCardProps) => {
  const [isFollowing, setIsFollowing] = React.useState(user.isFollowing);

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
    if (onFollow) {
      onFollow(user.id, !isFollowing);
    }
  };

  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center">
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src={user.avatar} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <div>
          <div className="flex items-center">
            <h3 className="font-medium">{user.name}</h3>
            {user.isFollowing && (
              <span className="ml-2 text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full">
                Following
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500">@{user.username}</p>
        </div>
      </div>
      
      <Button
        variant={isFollowing ? "outline" : "default"}
        className={isFollowing ? 
          "rounded-full border-gray-300 hover:bg-red-50 hover:text-red-600 hover:border-red-200" : 
          "rounded-full gradient-bg"
        }
        onClick={handleFollowClick}
      >
        {isFollowing ? "Following" : "Follow"}
      </Button>
    </div>
  );
};

export default UserCard;
