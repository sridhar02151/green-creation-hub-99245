import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CameraUpload } from "./CameraUpload";
import { useState } from "react";
import {
  TrendingUp,
  Award,
  Heart,
  Recycle,
  Users,
  ShoppingBag,
  Camera,
  Lightbulb,
  Star,
  Target,
  Calendar,
  ArrowRight
} from "lucide-react";

interface User {
  name: string;
  email: string;
  avatar?: string;
}

interface DashboardContentProps {
  user: User;
  onNavigate?: (tab: string) => void;
}

export const DashboardContent = ({ user, onNavigate }: DashboardContentProps) => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const handleQuickAction = (actionType: string) => {
    switch (actionType) {
      case "upload":
        setIsCameraOpen(true);
        break;
      case "ai-ideas":
        if (onNavigate) {
          onNavigate("diy-hub");
        } else {
          alert("💡 AI Ideas feature coming soon! Get personalized upcycling suggestions based on your materials.");
        }
        break;
      case "find-dealers":
        if (onNavigate) {
          onNavigate("dealer-connect");
        } else {
          alert("🔍 Dealer Connect feature coming soon! Find local waste material dealers near you.");
        }
        break;
      default:
        alert("Feature coming soon!");
    }
  };

  const handleViewAllGoals = () => {
    alert("📅 Goals tracking feature coming soon! Monitor your sustainability journey with detailed analytics.");
  };
  const stats = [
    { label: "Items Rescued", value: "127", icon: Recycle, color: "text-green-600", trend: "+12%" },
    { label: "DIY Projects", value: "23", icon: Award, color: "text-blue-600", trend: "+5%" },
    { label: "Community Karma", value: "856", icon: Heart, color: "text-red-500", trend: "+18%" },
    { label: "CO₂ Saved", value: "2.1kg", icon: Target, color: "text-purple-600", trend: "+8%" }
  ];

  const recentActivities = [
    {
      id: 1,
      user: "Sarah M.",
      action: "loved your wine bottle planter tutorial",
      time: "2 hours ago",
      avatar: "SM",
      type: "love"
    },
    {
      id: 2,
      user: "Green Community",
      action: "You reached 100 recycled items milestone!",
      time: "1 day ago",
      avatar: "GC",
      type: "milestone"
    },
    {
      id: 3,
      user: "Alex K.",
      action: "commented on your marketplace listing",
      time: "2 days ago",
      avatar: "AK",
      type: "comment"
    }
  ];

  const quickActions = [
    {
      title: "Share Creation",
      description: "Upload your latest DIY project",
      icon: Camera,
      color: "bg-gradient-hero",
      action: "Upload Now",
      actionType: "upload"
    },
    {
      title: "Get AI Ideas",
      description: "AI-powered upcycling suggestions",
      icon: Lightbulb,
      color: "bg-primary",
      action: "Explore Ideas",
      actionType: "ai-ideas"
    },
    {
      title: "Find Materials",
      description: "Connect with local waste dealers",
      icon: Users,
      color: "bg-accent",
      action: "Find Dealers",
      actionType: "find-dealers"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {user.name}! 🌱
          </h1>
          <p className="text-muted-foreground mt-2">
            Ready to make today more sustainable? Here's what's happening in your eco journey.
          </p>
        </div>
        <Avatar className="w-16 h-16 border-4 border-primary/20">
          <AvatarImage src={user.avatar} />
          <AvatarFallback className="bg-gradient-hero text-white text-xl">
            {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <Badge variant="secondary" className={`${stat.color} bg-transparent`}>
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {stat.trend}
                    </Badge>
                  </div>
                </div>
                <div className={`p-3 rounded-full bg-muted/30`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickActions.map((action, index) => (
          <Card key={index} className="group hover:shadow-xl transition-all duration-300 cursor-pointer">
            <CardHeader className="pb-3">
              <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mb-4`}>
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl">{action.title}</CardTitle>
              <CardDescription>{action.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="hero" 
                className="w-full group-hover:scale-105 transition-transform"
                onClick={() => handleQuickAction(action.actionType)}
              >
                {action.action}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity and Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-accent" />
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription>
              What's happening in your eco community
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                <Avatar className="w-10 h-10 border border-accent/30">
                  <AvatarFallback className="bg-gradient-nature text-primary text-sm">
                    {activity.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-semibold text-primary">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
                {activity.type === "love" && <Heart className="w-4 h-4 text-red-500" />}
                {activity.type === "milestone" && <Star className="w-4 h-4 text-yellow-500" />}
                {activity.type === "comment" && <Users className="w-4 h-4 text-blue-500" />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Monthly Goals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-primary" />
              <span>Monthly Goals</span>
            </CardTitle>
            <CardDescription>
              Track your sustainability progress
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Recycle 50 items</span>
                <span className="text-sm text-muted-foreground">32/50</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-gradient-hero h-2 rounded-full" style={{ width: "64%" }}></div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Complete 10 DIY projects</span>
                <span className="text-sm text-muted-foreground">7/10</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-gradient-nature h-2 rounded-full" style={{ width: "70%" }}></div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Help 5 community members</span>
                <span className="text-sm text-muted-foreground">3/5</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-earth-warm h-2 rounded-full" style={{ width: "60%" }}></div>
              </div>
            </div>

            <Button variant="nature" className="w-full mt-4" onClick={handleViewAllGoals}>
              <Calendar className="w-4 h-4 mr-2" />
              View All Goals
            </Button>
          </CardContent>
        </Card>
      </div>

      <CameraUpload 
        isOpen={isCameraOpen} 
        onClose={() => setIsCameraOpen(false)} 
      />
    </div>
  );
};