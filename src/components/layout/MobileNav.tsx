
import { Home, MessageSquare, Search, User, Users, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNav = ({ isOpen, onClose }: MobileNavProps) => {
  const navItems = [
    { icon: Home, label: "Home", path: "/home" },
    { icon: Users, label: "Explore", path: "/explore" },
    { icon: MessageSquare, label: "Messages", path: "/messages" },
    { icon: Search, label: "Search", path: "/search" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60">
      <div className="fixed inset-y-0 left-0 w-3/4 max-w-xs bg-white shadow-lg animate-fade-in">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold gradient-text">ConnectHub</h2>
          <button onClick={onClose} className="p-1">
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="p-4">
          <div className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-3 rounded-md transition-colors",
                    "hover:bg-gray-100",
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
          </div>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <button className="gradient-bg w-full text-white py-3 px-4 rounded-full font-medium">
            New Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
