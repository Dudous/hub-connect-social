
import { Bell, Menu, MessageSquare, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import MobileNav from "./MobileNav";

const Header = () => {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/home") return "Home";
    if (path === "/explore") return "Explore";
    if (path === "/messages") return "Messages";
    if (path === "/notifications") return "Notifications";
    if (path === "/profile") return "Profile";
    return "ConnectHub";
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-4">
          <button 
            className="md:hidden"
            onClick={() => setShowMobileNav(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-semibold">{getPageTitle()}</h1>
        </div>

        <div className="hidden md:flex w-full max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search ConnectHub"
              className="w-full pl-8 bg-gray-100 border-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost" className="text-gray-600">
            <Bell className="h-5 w-5" />
          </Button>
          <Button size="icon" variant="ghost" className="text-gray-600">
            <MessageSquare className="h-5 w-5" />
          </Button>

          <button className="ml-2 h-8 w-8 rounded-full bg-connecthub-purple text-white flex items-center justify-center">
            JD
          </button>
        </div>
      </div>

      <MobileNav isOpen={showMobileNav} onClose={() => setShowMobileNav(false)} />
    </header>
  );
};

export default Header;
