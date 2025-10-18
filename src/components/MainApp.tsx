import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Recycle,
  Home,
  Wrench,
  ShoppingBag,
  Users,
  Settings,
  LogOut,
  Hammer,
  Store,
  Phone,
  TrendingUp,
  Award,
  Heart,
  User
} from "lucide-react";
import reviewGreenLogo from "@/assets/review-green-logo.png";
import {
  SidebarProvider,
  SidebarTrigger,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar";
import { DashboardContent } from "./DashboardContent";
import { DIYHubContent } from "./DIYHubContent";
import { EcoMartContent } from "./EcoMartContent";
import { DealerConnectContent } from "./DealerConnectContent";
import { ProfileContent } from "./ProfileContent";

interface User {
  name: string;
  email: string;
  avatar?: string;
}

interface MainAppProps {
  user: User;
  onSignOut: () => void;
}

const AppSidebar = ({ user, onSignOut, activeTab, setActiveTab }: { 
  user: User; 
  onSignOut: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) => {
  const { state } = useSidebar();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "diy-hub", label: "DIY Hub", icon: Hammer },
    { id: "ecomart", label: "EcoMart", icon: Store },
    { id: "dealer-connect", label: "Dealer Connect", icon: Phone },
  ];

  const bottomItems = [
    { id: "profile", label: "Profile", icon: User },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "logout", label: "Sign Out", icon: LogOut, action: onSignOut },
  ];

  return (
    <Sidebar className={state === "collapsed" ? "w-16" : "w-64 md:w-64 w-56"} collapsible="icon">
      <SidebarContent className="bg-sidebar-background">
        {/* Logo Section */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
              <img src={reviewGreenLogo} alt="Review Green Logo" className="w-full h-full object-contain" />
            </div>
            {state !== "collapsed" && (
              <div>
                <h1 className="text-lg font-bold text-sidebar-foreground">Review Green</h1>
                <p className="text-xs text-sidebar-foreground/60">Eco Community</p>
              </div>
            )}
          </div>
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full ${
                      activeTab === item.id
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "hover:bg-sidebar-accent/50"
                    }`}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    {state !== "collapsed" && <span className="ml-3">{item.label}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Section */}
        <div className="mt-auto border-t border-sidebar-border p-4">
          {state !== "collapsed" && (
            <div className="flex items-center space-x-3 mb-4">
              <Avatar className="w-10 h-10 border-2 border-primary/20">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="bg-gradient-nature text-primary">
                  {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-sidebar-foreground truncate">
                  {user.name}
                </p>
                <p className="text-xs text-sidebar-foreground/60 truncate">
                  {user.email}
                </p>
              </div>
            </div>
          )}

          <SidebarMenu>
            {bottomItems.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  onClick={item.action || (() => setActiveTab(item.id))}
                  className="w-full hover:bg-sidebar-accent/50"
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {state !== "collapsed" && <span className="ml-3">{item.label}</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export const MainApp = ({ user, onSignOut }: MainAppProps) => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardContent user={user} onNavigate={setActiveTab} />;
      case "diy-hub":
        return <DIYHubContent />;
      case "ecomart":
        return <EcoMartContent />;
      case "dealer-connect":
        return <DealerConnectContent />;
      case "profile":
        return <ProfileContent user={user} />;
      default:
        return <DashboardContent user={user} onNavigate={setActiveTab} />;
    }
  };

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar user={user} onSignOut={onSignOut} activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="h-14 md:h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center px-4 md:px-6 flex-shrink-0">
            <SidebarTrigger className="mr-2 md:mr-4 p-2" />
            <div className="flex-1 min-w-0">
              <h2 className="text-lg md:text-xl font-semibold text-foreground capitalize truncate">
                {activeTab.replace('-', ' ')}
              </h2>
            </div>
            <div className="flex items-center space-x-2 md:space-x-4 flex-shrink-0">
              <Badge variant="secondary" className="hidden sm:flex items-center space-x-1">
                <Heart className="w-3 h-3" />
                <span className="text-xs">Eco Warrior</span>
              </Badge>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto">
            <div className="container mx-auto p-4 md:p-6 max-w-full">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};