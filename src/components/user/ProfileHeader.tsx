
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CalendarDays, Link as LinkIcon, MapPin } from "lucide-react";

export interface ProfileData {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  coverImage?: string;
  bio?: string;
  location?: string;
  website?: string;
  joinedDate: Date;
  following: number;
  followers: number;
  isFollowing: boolean;
  isCurrentUser: boolean;
}

interface ProfileHeaderProps {
  profile: ProfileData;
}

const ProfileHeader = ({ profile }: ProfileHeaderProps) => {
  const [isFollowing, setIsFollowing] = useState(profile.isFollowing);
  const [followerCount, setFollowerCount] = useState(profile.followers);
  
  const handleFollowClick = () => {
    if (isFollowing) {
      setFollowerCount(followerCount - 1);
    } else {
      setFollowerCount(followerCount + 1);
    }
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="border-b border-gray-200 pb-4">
      <div className="h-32 md:h-48 bg-gray-200 relative">
        {profile.coverImage ? (
          <img 
            src={profile.coverImage} 
            alt="Cover" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-connecthub-blue/30 to-connecthub-purple/30" />
        )}
      </div>
      
      <div className="px-4">
        <div className="flex justify-between items-start -mt-12 md:-mt-16 relative">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-white">
            <AvatarImage src={profile.avatar} />
            <AvatarFallback className="text-2xl">
              {profile.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          
          {profile.isCurrentUser ? (
            <Button variant="outline" className="mt-16 md:mt-24 rounded-full">
              Edit Profile
            </Button>
          ) : (
            <Button 
              variant={isFollowing ? "outline" : "default"}
              className={`mt-16 md:mt-24 rounded-full ${isFollowing ? 
                "hover:bg-red-50 hover:text-red-600 hover:border-red-200" : 
                "gradient-bg"}`}
              onClick={handleFollowClick}
            >
              {isFollowing ? "Following" : "Follow"}
            </Button>
          )}
        </div>
        
        <div className="mt-3">
          <h1 className="text-xl font-bold">{profile.name}</h1>
          <p className="text-gray-500">@{profile.username}</p>
          
          {profile.bio && (
            <p className="mt-3 text-gray-800">{profile.bio}</p>
          )}
          
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-sm text-gray-500">
            {profile.location && (
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{profile.location}</span>
              </div>
            )}
            
            {profile.website && (
              <div className="flex items-center">
                <LinkIcon className="h-4 w-4 mr-1" />
                <a 
                  href={profile.website.startsWith('http') ? profile.website : `https://${profile.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-connecthub-blue hover:underline"
                >
                  {profile.website.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
            
            <div className="flex items-center">
              <CalendarDays className="h-4 w-4 mr-1" />
              <span>
                Joined {profile.joinedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
            </div>
          </div>
          
          <div className="flex gap-4 mt-3">
            <a href="#" className="hover:underline">
              <span className="font-semibold">{profile.following}</span>
              <span className="text-gray-500 ml-1">Following</span>
            </a>
            <a href="#" className="hover:underline">
              <span className="font-semibold">{followerCount}</span>
              <span className="text-gray-500 ml-1">Followers</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
