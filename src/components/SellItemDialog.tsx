import React, { useState } from "react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera as CameraIcon, Upload, X, DollarSign } from "lucide-react";
import { toast } from "sonner";

interface SellItemDialogProps {
  children: React.ReactNode;
}

export const SellItemDialog = ({ children }: SellItemDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");

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

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!title || !description || !price || images.length === 0) {
      toast.error("Please fill in all required fields and add at least one image.");
      return;
    }

    // Here you would typically upload to a backend
    toast.success("Item listed for sale successfully!");
    setIsOpen(false);
    // Reset form
    setTitle("");
    setDescription("");
    setPrice("");
    setCategory("");
    setCondition("");
    setImages([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Sell Your Upcycled Item</DialogTitle>
          <DialogDescription>
            List your upcycled creation in the EcoMart marketplace
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Image Upload Section */}
          <div>
            <Label>Item Images *</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
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
                <span className="text-sm">Choose from Gallery</span>
              </Button>
            </div>

            {/* Display selected images */}
            {images.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-4">
                {images.map((image, index) => (
                  <Card key={index} className="relative">
                    <CardContent className="p-0">
                      <img 
                        src={image} 
                        alt={`Item ${index + 1}`}
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
              </div>
            )}
          </div>

          {/* Item Details */}
          <div>
            <Label htmlFor="item-title">Item Title *</Label>
            <Input
              id="item-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Name your upcycled item"
            />
          </div>

          <div>
            <Label htmlFor="item-description">Description *</Label>
            <Textarea
              id="item-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your item, how it was made, and its features..."
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price *</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  className="pl-8"
                  type="number"
                  step="0.01"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="home-decor">Home Decor</SelectItem>
                  <SelectItem value="furniture">Furniture</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                  <SelectItem value="garden">Garden</SelectItem>
                  <SelectItem value="storage">Storage</SelectItem>
                  <SelectItem value="lighting">Lighting</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="condition">Condition</Label>
            <Select value={condition} onValueChange={setCondition}>
              <SelectTrigger>
                <SelectValue placeholder="Select condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">Like New</SelectItem>
                <SelectItem value="excellent">Excellent</SelectItem>
                <SelectItem value="good">Good</SelectItem>
                <SelectItem value="fair">Fair</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={handleSubmit} className="flex-1">
              List Item for Sale
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