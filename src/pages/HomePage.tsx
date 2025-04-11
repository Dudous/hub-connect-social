
import React, { useEffect, useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import CreatePostForm from "@/components/post/CreatePostForm";
import PostCard, { PostData } from "@/components/post/PostCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data for initial posts
const initialPosts: PostData[] = [
  {
    id: "1",
    author: {
      id: "user1",
      name: "John Doe",
      username: "johndoe",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    content: "Just launched my new project! Check it out and let me know what you think. #webdev #react",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    likes: 24,
    comments: 5,
    reposts: 2,
    isLiked: false,
  },
  {
    id: "2",
    author: {
      id: "user2",
      name: "Sarah Johnson",
      username: "sarahj",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    content: "Beautiful day for hiking! Nature is the best therapy. 🌲🥾",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    likes: 56,
    comments: 3,
    reposts: 7,
    isLiked: true,
  },
  {
    id: "3",
    author: {
      id: "user3",
      name: "Tech Insights",
      username: "techinsights",
      avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    },
    content: "The future of AI is not about replacing humans, but enhancing human capabilities. What are your thoughts on the ethical implications of advanced AI systems?",
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    likes: 89,
    comments: 32,
    reposts: 14,
    isLiked: false,
  },
];

const HomePage = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [activeTab, setActiveTab] = useState("for-you");
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading from API
    const timer = setTimeout(() => {
      setPosts(initialPosts);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        <Tabs defaultValue="for-you" className="mb-4">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="for-you" onClick={() => setActiveTab("for-you")}>
              For You
            </TabsTrigger>
            <TabsTrigger value="following" onClick={() => setActiveTab("following")}>
              Following
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <CreatePostForm />
        
        <div>
          {loading ? (
            // Loading skeleton
            Array(3)
              .fill(null)
              .map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-4 mb-4 animate-pulse">
                  <div className="flex items-start space-x-3">
                    <div className="h-10 w-10 bg-gray-200 rounded-full" />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <div className="h-4 bg-gray-200 rounded w-24" />
                        <div className="h-4 bg-gray-200 rounded w-16" />
                      </div>
                      <div className="h-4 bg-gray-200 rounded w-3/4 mt-2" />
                      <div className="h-4 bg-gray-200 rounded w-1/2 mt-2" />
                      <div className="h-64 bg-gray-200 rounded-xl mt-3" />
                    </div>
                  </div>
                </div>
              ))
          ) : (
            posts.map((post) => <PostCard key={post.id} post={post} />)
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default HomePage;
