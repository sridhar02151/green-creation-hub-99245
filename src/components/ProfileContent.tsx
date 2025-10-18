import React, { useState } from "react";
import { UploadDIYProject } from "./UploadDIYProject";
import { SellItemDialog } from "./SellItemDialog";
import { EditProfileDialog } from "./EditProfileDialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Leaf,
  Recycle,
  Heart,
  Settings,
  Edit,
  Upload,
  Plus,
  Camera
} from "lucide-react";
import { toast } from "sonner";

interface DIYProject {
  id: string;
  title: string;
  description: string;
  materials: string;
  difficulty: string;
  images: string[];
  videos: string[];
  createdAt: Date;
}

interface ProfileContentProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export const ProfileContent = ({ user }: ProfileContentProps) => {
  const [diyProjects, setDiyProjects] = useState<DIYProject[]>([]);

  const handleProjectUploaded = (project: DIYProject) => {
    setDiyProjects(prev => [project, ...prev]);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Profile Header */}
      <Card className="overflow-hidden">
        <div className="h-24 md:h-32 bg-gradient-nature"></div>
        <CardContent className="relative pt-12 md:pt-16 pb-4 md:pb-6 px-4 md:px-6">
          <Avatar className="absolute -top-8 md:-top-12 left-4 md:left-6 w-16 h-16 md:w-24 md:h-24 border-4 border-background">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="bg-gradient-nature text-primary text-xl">
              {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          
          <div className="pl-20 md:pl-32">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-foreground">{user.name}</h1>
                <p className="text-sm md:text-base text-muted-foreground">{user.email}</p>
              </div>
              <EditProfileDialog user={user}>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </EditProfileDialog>
            </div>
            
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <Badge variant="secondary" className="flex items-center space-x-1 text-xs">
                <Heart className="w-3 h-3" />
                <span>Eco Warrior</span>
              </Badge>
              <Badge variant="outline" className="flex items-center space-x-1 text-xs">
                <Leaf className="w-3 h-3" />
                <span>Green Expert</span>
              </Badge>
              <Badge variant="outline" className="flex items-center space-x-1 text-xs">
                <Recycle className="w-3 h-3" />
                <span>Upcycling Pro</span>
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
        {/* Main Content */}
        <div className="xl:col-span-2 space-y-4 md:space-y-6">

          {/* Eco Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Leaf className="w-5 h-5" />
                <span>Eco Activities</span>
              </CardTitle>
              <CardDescription>Your environmental impact and activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="text-center p-3 md:p-4 rounded-lg bg-accent/50">
                  <div className="text-xl md:text-2xl font-bold text-primary">{diyProjects.length}</div>
                  <div className="text-xs md:text-sm text-muted-foreground">DIY Projects</div>
                </div>
                <div className="text-center p-3 md:p-4 rounded-lg bg-accent/50">
                  <div className="text-xl md:text-2xl font-bold text-primary">0</div>
                  <div className="text-xs md:text-sm text-muted-foreground">Items Sold</div>
                </div>
                <div className="text-center p-3 md:p-4 rounded-lg bg-accent/50">
                  <div className="text-xl md:text-2xl font-bold text-primary">0</div>
                  <div className="text-xs md:text-sm text-muted-foreground">kg CO₂ Saved</div>
                </div>
                <div className="text-center p-3 md:p-4 rounded-lg bg-accent/50">
                  <div className="text-xl md:text-2xl font-bold text-primary">0</div>
                  <div className="text-xs md:text-sm text-muted-foreground">Community Posts</div>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                <UploadDIYProject onProjectUploaded={handleProjectUploaded}>
                  <Button variant="outline" className="h-16 md:h-20 flex-col space-y-1 md:space-y-2 w-full text-xs md:text-sm">
                    <Camera className="w-5 h-5 md:w-6 md:h-6" />
                    <span className="text-xs md:text-sm">Upload DIY Project</span>
                  </Button>
                </UploadDIYProject>
                <SellItemDialog>
                  <Button variant="outline" className="h-16 md:h-20 flex-col space-y-1 md:space-y-2 w-full text-xs md:text-sm">
                    <Upload className="w-5 h-5 md:w-6 md:h-6" />
                    <span className="text-xs md:text-sm">Sell Your Items</span>
                  </Button>
                </SellItemDialog>
              </div>
            </CardContent>
          </Card>

          {/* DIY Projects */}
          {diyProjects.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Camera className="w-5 h-5" />
                  <span>My DIY Projects</span>
                </CardTitle>
                <CardDescription>Your uploaded creative projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {diyProjects.map((project) => (
                    <Card key={project.id} className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <h3 className="font-semibold text-foreground">{project.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {project.difficulty || "Medium"}
                          </Badge>
                        </div>
                        
                        {(project.images.length > 0 || project.videos.length > 0) && (
                          <div className="grid grid-cols-3 gap-2">
                            {project.images.slice(0, 3).map((image, index) => (
                              <img
                                key={`img-${index}`}
                                src={image}
                                alt={`${project.title} ${index + 1}`}
                                className="w-full h-20 object-cover rounded-lg"
                              />
                            ))}
                            {project.videos.slice(0, 3).map((video, index) => (
                              <video
                                key={`vid-${index}`}
                                src={video}
                                className="w-full h-20 object-cover rounded-lg"
                                controls
                              />
                            ))}
                          </div>
                        )}
                        
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {project.description}
                        </p>
                        
                        {project.materials && (
                          <div className="text-xs text-muted-foreground">
                            <span className="font-medium">Materials:</span> {project.materials}
                          </div>
                        )}
                        
                        <div className="text-xs text-muted-foreground">
                          {project.createdAt.toLocaleDateString()}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Achievements & Settings */}
        <div className="space-y-4 md:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="w-5 h-5" />
                <span>Achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-accent/30">
                <div className="w-10 h-10 rounded-full bg-gradient-nature flex items-center justify-center">
                  <Recycle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-medium">Eco Warrior</div>
                  <div className="text-xs text-muted-foreground">Completed 10+ projects</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-accent/30">
                <div className="w-10 h-10 rounded-full bg-gradient-nature flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-medium">Community Helper</div>
                  <div className="text-xs text-muted-foreground">Helped 5+ members</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-accent/30">
                <div className="w-10 h-10 rounded-full bg-gradient-nature flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-medium">Green Expert</div>
                  <div className="text-xs text-muted-foreground">Saved 20kg+ CO₂</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Quick Settings</span>
              </CardTitle>
            </CardHeader>
           <CardContent className="space-y-3">
             <Button 
               variant="outline" 
               className="w-full justify-start"
               onClick={() => toast.success("Email notification settings updated!")}
             >
               <Mail className="w-4 h-4 mr-2" />
               Email Notifications
             </Button>
             <Button 
               variant="outline" 
               className="w-full justify-start"
               onClick={() => toast.success("Privacy settings updated!")}
             >
               <Phone className="w-4 h-4 mr-2" />
               Privacy Settings
             </Button>
             <Button 
               variant="outline" 
               className="w-full justify-start"
               onClick={() => toast.success("Location preferences saved!")}
             >
               <MapPin className="w-4 h-4 mr-2" />
               Location Preferences
             </Button>
           </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};