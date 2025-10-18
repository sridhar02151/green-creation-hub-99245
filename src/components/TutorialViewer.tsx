import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Play,
  Pause,
  ArrowLeft,
  Clock,
  Star,
  Heart,
  CheckCircle,
  Trophy,
  Sparkles
} from "lucide-react";
import { toast } from "sonner";

interface TutorialStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  time?: string;
}

interface TutorialViewerProps {
  project: {
    id: number;
    title: string;
    category: string;
    difficulty: string;
    time: string;
    rating: number;
    likes: number;
    author: string;
    image: string;
    description: string;
    materials: string[];
  };
  isOpen: boolean;
  onClose: () => void;
}

export const TutorialViewer = ({ project, isOpen, onClose }: TutorialViewerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [steps, setSteps] = useState<TutorialStep[]>([
    {
      id: 1,
      title: "Gather Materials",
      description: `Collect all required materials: ${project.materials.slice(0, 3).join(", ")}`,
      completed: false,
      time: "5 min"
    },
    {
      id: 2,
      title: "Prepare Workspace",
      description: "Set up a clean, well-lit workspace with proper ventilation",
      completed: false,
      time: "3 min"
    },
    {
      id: 3,
      title: "Initial Setup",
      description: "Begin the project by preparing your main materials",
      completed: false,
      time: "10 min"
    },
    {
      id: 4,
      title: "Assembly Process",
      description: "Follow the step-by-step assembly instructions",
      completed: false,
      time: "20 min"
    },
    {
      id: 5,
      title: "Final Touches",
      description: "Add finishing touches and ensure everything is secure",
      completed: false,
      time: "7 min"
    }
  ]);

  const [showCelebration, setShowCelebration] = useState(false);

  const completedSteps = steps.filter(step => step.completed).length;
  const progressPercentage = (completedSteps / steps.length) * 100;

  const toggleStep = (stepId: number) => {
    setSteps(prev => {
      const updated = prev.map(step =>
        step.id === stepId ? { ...step, completed: !step.completed } : step
      );
      
      const newCompletedCount = updated.filter(s => s.completed).length;
      
      // Check if all steps are completed
      if (newCompletedCount === updated.length && newCompletedCount > completedSteps) {
        setShowCelebration(true);
        toast.success("🎉 Congratulations! You've completed the tutorial!", {
          description: "Amazing work! Your upcycling project is complete!",
          duration: 5000,
        });
      }
      
      return updated;
    });
  };

  const resetSteps = () => {
    setSteps(prev => prev.map(step => ({ ...step, completed: false })));
    setShowCelebration(false);
  };

  useEffect(() => {
    if (showCelebration) {
      const timer = setTimeout(() => setShowCelebration(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showCelebration]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl font-bold">{project.title}</DialogTitle>
              <Button variant="outline" onClick={onClose}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Hub
              </Button>
            </div>
          </DialogHeader>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Video Section */}
            <div className="space-y-4">
              <Card>
                <CardContent className="p-0">
                  <div className="relative w-full h-64 bg-muted rounded-lg overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <Button
                        variant="hero"
                        size="lg"
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="rounded-full w-16 h-16"
                      >
                        {isPlaying ? (
                          <Pause className="w-6 h-6" />
                        ) : (
                          <Play className="w-6 h-6" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Project Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Project Details</span>
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm">{project.rating}</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{project.difficulty}</Badge>
                    <Badge variant="outline" className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{project.time}</span>
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">by {project.author}</span>
                    <div className="flex items-center space-x-1 text-sm">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span>{project.likes}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Materials Needed:</h4>
                    <div className="flex flex-wrap gap-1">
                      {project.materials.map((material, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {material}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Steps Section */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Tutorial Steps</span>
                    <Button variant="outline" size="sm" onClick={resetSteps}>
                      Reset Progress
                    </Button>
                  </CardTitle>
                  <CardDescription>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress: {completedSteps}/{steps.length} steps</span>
                        <span>{Math.round(progressPercentage)}%</span>
                      </div>
                      <Progress value={progressPercentage} className="h-2" />
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {steps.map((step, index) => (
                    <div
                      key={step.id}
                      className={`flex items-start space-x-3 p-3 rounded-lg border transition-all ${
                        step.completed 
                          ? "bg-primary/5 border-primary/20" 
                          : "bg-muted/30 border-muted"
                      }`}
                    >
                      <Checkbox
                        checked={step.completed}
                        onCheckedChange={() => toggleStep(step.id)}
                        className="mt-1"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className={`font-medium ${step.completed ? "text-primary" : ""}`}>
                            Step {index + 1}: {step.title}
                          </h4>
                          {step.time && (
                            <Badge variant="outline" className="text-xs">
                              {step.time}
                            </Badge>
                          )}
                        </div>
                        <p className={`text-sm mt-1 ${
                          step.completed ? "text-primary/80" : "text-muted-foreground"
                        }`}>
                          {step.description}
                        </p>
                      </div>
                      {step.completed && (
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Completion Badge */}
              {completedSteps === steps.length && (
                <Card className="border-primary bg-primary/5">
                  <CardContent className="p-6 text-center">
                    <Trophy className="w-12 h-12 text-primary mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-primary mb-2">
                      Tutorial Completed! 🎉
                    </h3>
                    <p className="text-sm text-primary/80 mb-4">
                      Congratulations! You've successfully completed this upcycling project. 
                      Share your creation with the community!
                    </p>
                    <Button variant="hero" className="w-full">
                      Share Your Creation
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Celebration Overlay */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-in fade-in duration-300">
          <div className="bg-background rounded-lg p-8 text-center shadow-xl animate-in zoom-in duration-300">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Trophy className="w-16 h-16 text-primary animate-bounce" />
                <div className="absolute -top-2 -right-2">
                  <Sparkles className="w-8 h-8 text-yellow-500 animate-spin" />
                </div>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-primary mb-2">Amazing Work!</h2>
            <p className="text-muted-foreground">
              You've completed the entire tutorial! 🎉
            </p>
          </div>
        </div>
      )}
    </>
  );
};