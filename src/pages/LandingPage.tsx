
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AuthForm from "@/components/auth/AuthForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex flex-col md:flex-row flex-1">
        {/* Left Side - Hero Image and Text */}
        <div className="bg-gradient-to-br from-connecthub-blue to-connecthub-purple md:w-1/2 p-8 flex items-center justify-center">
          <div className="max-w-md text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Connect with friends and the world around you
            </h1>
            <p className="text-lg text-white/80">
              Join ConnectHub today to share ideas, connect with others, and build your network.
            </p>
          </div>
        </div>
        
        {/* Right Side - Auth Form */}
        <div className="md:w-1/2 p-8 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="text-center md:text-left mb-8">
              <h1 className="text-3xl font-bold gradient-text mb-2">ConnectHub</h1>
              <p className="text-gray-600">
                The social platform for meaningful connections
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <Tabs 
                value={activeTab} 
                onValueChange={(value) => setActiveTab(value as "login" | "register")} 
                className="w-full"
              >
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="login">Sign In</TabsTrigger>
                  <TabsTrigger value="register">Sign Up</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                  <AuthForm isLogin={true} />
                </TabsContent>
                <TabsContent value="register">
                  <AuthForm isLogin={false} />
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Demo mode button for quick access */}
            <div className="mt-6 text-center">
              <Button 
                variant="link" 
                className="text-connecthub-purple" 
                onClick={() => navigate("/home")}
              >
                Continue as Guest
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
