
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppLayout from "@/components/layout/AppLayout";
import ProfileHeader, { ProfileData } from "@/components/user/ProfileHeader";
import PostCard, { PostData } from "@/components/post/PostCard";

// Sample profile data
const sampleProfile: ProfileData = {
  id: "user1",
  name: "John Doe",
  username: "johndoe",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  coverImage: "https://images.unsplash.com/photo-1500964757637-c85e8a162699?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1503&q=80",
  bio: "Software developer, tech enthusiast, and coffee lover. Building the future one line of code at a time.",
  location: "San Francisco, CA",
  website: "johndoe.dev",
  joinedDate: new Date(2021, 3, 15),
  following: 235,
  followers: 512,
  isFollowing: false,
  isCurrentUser: true,
};

// Sample posts for this profile
const samplePosts: PostData[] = [
  {
    id: "1",
    author: {
      id: "user1",
      name: "John Doe",
      username: "johndoe",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    content: "Just launched my new project! Check it out and let me know what you think. #webdev #react",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    likes: 24,
    comments: 5,
    reposts: 2,
  },
  {
    id: "2",
    author: {
      id: "user1",
      name: "John Doe",
      username: "johndoe",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    content: "Working on a new feature for ConnectHub. Can't wait to share it with you all!",
    image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    likes: 42,
    comments: 7,
    reposts: 3,
  },
];

const ProfilePage = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [posts, setPosts] = useState<PostData[]>([]);
  const [activeTab, setActiveTab] = useState("posts");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      setProfile(sampleProfile);
      setPosts(samplePosts);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <AppLayout>
        <div className="animate-pulse">
          <div className="h-48 bg-gray-200 w-full"></div>
          <div className="px-4">
            <div className="flex justify-between">
              <div className="h-32 w-32 bg-gray-200 rounded-full -mt-16 border-4 border-white"></div>
              <div className="h-10 w-28 bg-gray-200 rounded-full mt-24"></div>
            </div>
            <div className="mt-4 space-y-3">
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!profile) {
    return (
      <AppLayout>
        <div className="text-center py-10">
          <p>Profile not found</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <ProfileHeader profile={profile} />

      <div className="mt-4">
        <Tabs defaultValue="posts">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="posts" onClick={() => setActiveTab("posts")}>
              Posts
            </TabsTrigger>
            <TabsTrigger value="replies" onClick={() => setActiveTab("replies")}>
              Replies
            </TabsTrigger>
            <TabsTrigger value="media" onClick={() => setActiveTab("media")}>
              Media
            </TabsTrigger>
            <TabsTrigger value="likes" onClick={() => setActiveTab("likes")}>
              Likes
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="posts" className="pt-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </TabsContent>
          
          <TabsContent value="replies" className="text-center py-10 text-gray-500">
            No replies yet
          </TabsContent>
          
          <TabsContent value="media" className="text-center py-10 text-gray-500">
            No media posts yet
          </TabsContent>
          
          <TabsContent value="likes" className="text-center py-10 text-gray-500">
            No liked posts yet
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default ProfilePage;
