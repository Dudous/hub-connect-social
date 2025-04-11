
import { Home, Users, MessageSquare, Bell, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const navItems = [
    { icon: Home, label: "Home", path: "/home" },
    { icon: Users, label: "Explore", path: "/explore" },
    { icon: MessageSquare, label: "Messages", path: "/messages" },
    { icon: Bell, label: "Notifications", path: "/notifications" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold gradient-text">ConnectHub</h1>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                "hover:bg-gray-100 text-gray-700",
                isActive
                  ? "bg-gray-100 text-connecthub-blue font-medium"
                  : "text-gray-700"
              )
            }
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto">
        <button className="gradient-bg w-full text-white py-2 px-4 rounded-full font-medium">
          New Post
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
