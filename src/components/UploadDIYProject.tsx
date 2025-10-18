import React, { useState } from "react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Camera as CameraIcon, Upload, X, Video } from "lucide-react";
import { toast } from "sonner";

interface UploadDIYProjectProps {
  children: React.ReactNode;
  onProjectUploaded?: (project: DIYProject) => void;
}

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

export const UploadDIYProject = ({ children, onProjectUploaded }: UploadDIYProjectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [videos, setVideos] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [materials, setMaterials] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const takePicture = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });

      if (image.dataUrl) {
        setImages(prev => [...prev, image.dataUrl!]);
        toast.success("Photo captured successfully!");
      }
    } catch (error) {
      console.error("Error taking picture:", error);
      toast.error("Failed to capture photo. Please try again.");
    }
  };

  const selectFromGallery = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos,
      });

      if (image.dataUrl) {
        setImages(prev => [...prev, image.dataUrl!]);
        toast.success("Image selected successfully!");
      }
    } catch (error) {
      console.error("Error selecting image:", error);
      toast.error("Failed to select image. Please try again.");
    }
  };

  const recordVideo = async () => {
    try {
      const video = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
        presentationStyle: 'fullscreen',
      });

      if (video.dataUrl) {
        setVideos(prev => [...prev, video.dataUrl!]);
        toast.success("Video recorded successfully!");
      }
    } catch (error) {
      console.error("Error recording video:", error);
      toast.error("Failed to record video. Please try again.");
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const removeVideo = (index: number) => {
    setVideos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!title || !description || (images.length === 0 && videos.length === 0)) {
      toast.error("Please fill in all required fields and add at least one image or video.");
      return;
    }

    const project: DIYProject = {
      id: Date.now().toString(),
      title,
      description,
      materials,
      difficulty,
      images,
      videos,
      createdAt: new Date(),
    };

    onProjectUploaded?.(project);
    toast.success("DIY project uploaded successfully!");
    setIsOpen(false);
    
    // Reset form
    setTitle("");
    setDescription("");
    setMaterials("");
    setDifficulty("");
    setImages([]);
    setVideos([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload DIY Project</DialogTitle>
          <DialogDescription>
            Share your creative upcycling project with the community
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Media Upload Section */}
          <div>
            <Label>Project Media *</Label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              <Button 
                variant="outline" 
                onClick={takePicture}
                className="h-20 flex-col space-y-2"
              >
                <CameraIcon className="w-6 h-6" />
                <span className="text-sm">Take Photo</span>
              </Button>
              <Button 
                variant="outline" 
                onClick={selectFromGallery}
                className="h-20 flex-col space-y-2"
              >
                <Upload className="w-6 h-6" />
                <span className="text-sm">Gallery</span>
              </Button>
              <Button 
                variant="outline" 
                onClick={recordVideo}
                className="h-20 flex-col space-y-2"
              >
                <Video className="w-6 h-6" />
                <span className="text-sm">Record Video</span>
              </Button>
            </div>

            {/* Display selected media */}
            {(images.length > 0 || videos.length > 0) && (
              <div className="grid grid-cols-3 gap-2 mt-4">
                {images.map((image, index) => (
                  <Card key={`image-${index}`} className="relative">
                    <CardContent className="p-0">
                      <img 
                        src={image} 
                        alt={`Project ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 w-6 h-6 p-0"
                        onClick={() => removeImage(index)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
                {videos.map((video, index) => (
                  <Card key={`video-${index}`} className="relative">
                    <CardContent className="p-0">
                      <video 
                        src={video} 
                        className="w-full h-24 object-cover rounded-lg"
                        controls
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 w-6 h-6 p-0"
                        onClick={() => removeVideo(index)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Project Details */}
          <div>
            <Label htmlFor="title">Project Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your project a catchy name"
            />
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your project and the upcycling process..."
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="materials">Materials Used</Label>
            <Input
              id="materials"
              value={materials}
              onChange={(e) => setMaterials(e.target.value)}
              placeholder="List the materials you used (e.g., plastic bottles, cardboard, fabric)"
            />
          </div>

          <div>
            <Label htmlFor="difficulty">Difficulty Level</Label>
            <Input
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              placeholder="Easy, Medium, or Hard"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={handleSubmit} className="flex-1">
              Upload Project
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};