import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppLayout from "@/components/layout/AppLayout";
import { Heart, MessageSquare, UserPlus, Star } from "lucide-react";

interface Notification {
  id: string;
  type: "like" | "comment" | "follow" | "mention";
  user: {
    id: string;
    name: string;
    username: string;
    avatar?: string;
  };
  content?: string;
  postId?: string;
  timestamp: Date;
  isRead: boolean;
}

// Sample notifications
const sampleNotifications: Notification[] = [
  {
    id: "notif1",
    type: "like",
    user: {
      id: "user2",
      name: "Sarah Johnson",
      username: "sarahj",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    content: "Just launched my new project! Check it out and let me know what you think.",
    postId: "post1",
    timestamp: new Date(Date.now() - 25 * 60 * 1000),
    isRead: false,
  },
  {
    id: "notif2",
    type: "follow",
    user: {
      id: "user7",
      name: "Michael Brown",
      username: "michaelb",
      avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    },
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    isRead: true,
  },
  {
    id: "notif3",
    type: "comment",
    user: {
      id: "user3",
      name: "Tech Insights",
      username: "techinsights",
      avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    },
    content: "Great insight! Have you considered the implications for privacy?",
    postId: "post3",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    isRead: false,
  },
  {
    id: "notif4",
    type: "mention",
    user: {
      id: "user4",
      name: "Alex Williams",
      username: "alexw",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    },
    content: "Hey @johndoe, what do you think about this new framework?",
    postId: "post4",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    isRead: true,
  },
];

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      setNotifications(sampleNotifications);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const getIconForNotificationType = (type: string) => {
    switch (type) {
      case "like":
        return <Heart className="h-4 w-4 text-red-500" />;
      case "comment":
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case "follow":
        return <UserPlus className="h-4 w-4 text-green-500" />;
      case "mention":
        return <Star className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };
  
  const getNotificationText = (notification: Notification) => {
    switch (notification.type) {
      case "like":
        return "liked your post";
      case "comment":
        return "commented on your post";
      case "follow":
        return "followed you";
      case "mention":
        return "mentioned you in a post";
      default:
        return "";
    }
  };
  
  const filteredNotifications = notifications.filter((notif) => {
    if (activeTab === "all") return true;
    return notif.type === activeTab;
  });
  
  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };
  
  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Notifications</h1>
          <button className="text-sm text-connecthub-blue hover:underline">
            Mark all as read
          </button>
        </div>
        
        <Tabs defaultValue="all" className="mb-6">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="all" onClick={() => setActiveTab("all")}>
              All
            </TabsTrigger>
            <TabsTrigger value="like" onClick={() => setActiveTab("like")}>
              Likes
            </TabsTrigger>
            <TabsTrigger value="comment" onClick={() => setActiveTab("comment")}>
              Comments
            </TabsTrigger>
            <TabsTrigger value="follow" onClick={() => setActiveTab("follow")}>
              Follows
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
              {loading ? (
                // Loading skeleton
                Array(4)
                  .fill(null)
                  .map((_, i) => (
                    <div key={i} className="p-4 flex animate-pulse">
                      <div className="h-10 w-10 bg-gray-200 rounded-full mr-3" />
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                        <div className="h-3 bg-gray-200 rounded w-1/2" />
                      </div>
                    </div>
                  ))
              ) : filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 flex ${
                      !notification.isRead ? "bg-blue-50" : ""
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={notification.user.avatar} />
                      <AvatarFallback>
                        {notification.user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-start gap-1">
                        <span className="font-medium">{notification.user.name}</span>
                        <span>{getNotificationText(notification)}</span>
                        {!notification.isRead && (
                          <span className="h-2 w-2 rounded-full bg-connecthub-blue mt-2" />
                        )}
                      </div>
                      
                      {notification.content && (
                        <p className="text-gray-600 text-sm mt-1 line-clamp-1">
                          "{notification.content}"
                        </p>
                      )}
                      
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center text-xs text-gray-500 gap-1">
                          {getIconForNotificationType(notification.type)}
                          <span>
                            {formatDistanceToNow(notification.timestamp, {
                              addSuffix: true,
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500">
                  No notifications found
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Other tabs use the same content component with different filtering */}
          <TabsContent value="like" className="mt-4">
            <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
              {/* Content populated by the filteredNotifications */}
              {filteredNotifications.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  No like notifications
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="comment" className="mt-4">
            <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
              {/* Content populated by the filteredNotifications */}
              {filteredNotifications.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  No comment notifications
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="follow" className="mt-4">
            <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
              {/* Content populated by the filteredNotifications */}
              {filteredNotifications.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  No follow notifications
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default NotificationsPage;
