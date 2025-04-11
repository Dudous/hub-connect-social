
import { useState, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostCard, { PostData } from "@/components/post/PostCard";
import UserCard, { UserData } from "@/components/user/UserCard";
import { Search } from "lucide-react";

// Sample trending posts
const trendingPosts: PostData[] = [
  {
    id: "trend1",
    author: {
      id: "user5",
      name: "Tech News",
      username: "technews",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    content: "Breaking: Major tech company announces revolutionary AI breakthrough that could change how we interact with technology forever. #AI #TechNews",
    image: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    likes: 2542,
    comments: 328,
    reposts: 1024,
  },
  {
    id: "trend2",
    author: {
      id: "user6",
      name: "Travel Adventures",
      username: "travelbugs",
      avatar: "https://randomuser.me/api/portraits/men/36.jpg",
    },
    content: "The most breathtaking sunset I've ever witnessed. Santorini, you've stolen my heart! 🌅 #Travel #Greece #IslandLife",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    likes: 3891,
    comments: 245,
    reposts: 872,
  },
];

// Sample recommended users
const recommendedUsers: UserData[] = [
  {
    id: "rec1",
    name: "Jane Smith",
    username: "janesmith",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    bio: "UX Designer, Coffee Enthusiast",
    isFollowing: false,
  },
  {
    id: "rec2",
    name: "Mark Wilson",
    username: "markw",
    avatar: "https://randomuser.me/api/portraits/men/88.jpg",
    bio: "Entrepreneur, Tech Investor",
    isFollowing: false,
  },
  {
    id: "rec3",
    name: "Lisa Chen",
    username: "lisachen",
    avatar: "https://randomuser.me/api/portraits/women/79.jpg",
    bio: "Software Engineer at Google",
    isFollowing: true,
  },
  {
    id: "rec4",
    name: "Dev Community",
    username: "devcom",
    avatar: "https://randomuser.me/api/portraits/men/51.jpg",
    bio: "News and resources for developers",
    isFollowing: false,
  },
];

const ExplorePage = () => {
  const [activeTab, setActiveTab] = useState("trending");
  const [search, setSearch] = useState("");
  
  const handleFollow = (userId: string, isFollowing: boolean) => {
    console.log(`User ${userId} is now ${isFollowing ? 'followed' : 'unfollowed'}`);
    // In a real app, this would make an API call to update the follow status
  };
  
  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search ConnectHub"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 py-6 text-lg"
            />
          </div>
        </div>
        
        <Tabs defaultValue="trending" className="mb-6">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="trending" onClick={() => setActiveTab("trending")}>
              Trending
            </TabsTrigger>
            <TabsTrigger value="people" onClick={() => setActiveTab("people")}>
              People
            </TabsTrigger>
            <TabsTrigger value="news" onClick={() => setActiveTab("news")}>
              News
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="trending" className="mt-4">
            <h2 className="text-lg font-semibold mb-4">Trending Today</h2>
            {trendingPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </TabsContent>
          
          <TabsContent value="people" className="mt-4">
            <h2 className="text-lg font-semibold mb-4">People you might know</h2>
            <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
              {recommendedUsers.map((user) => (
                <div key={user.id} className="p-4">
                  <UserCard user={user} onFollow={handleFollow} />
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="news" className="mt-4">
            <h2 className="text-lg font-semibold mb-4">Latest News</h2>
            <div className="text-center py-10 text-gray-500">
              News feed is coming soon!
            </div>
          </TabsContent>
        </Tabs>
        
        {activeTab === "trending" && (
          <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
            <h3 className="font-semibold mb-3">Who to follow</h3>
            <div className="space-y-3">
              {recommendedUsers.slice(0, 3).map((user) => (
                <UserCard key={user.id} user={user} onFollow={handleFollow} />
              ))}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default ExplorePage;
