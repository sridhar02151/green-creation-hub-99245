import { useState } from 'react';
import { Camera } from '@capacitor/camera';
import { CameraResultType, CameraSource } from '@capacitor/camera';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Camera as CameraIcon, Video, Upload, X } from 'lucide-react';
import { toast } from 'sonner';
import { LiveCameraView } from './LiveCameraView';

interface CameraUploadProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CameraUpload = ({ isOpen, onClose }: CameraUploadProps) => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showLiveCamera, setShowLiveCamera] = useState(false);

  const openLiveCamera = () => {
    setShowLiveCamera(true);
  };

  const handlePhotoTaken = (imageUrl: string) => {
    setCapturedImage(imageUrl);
    setShowLiveCamera(false);
  };

  const takePicture = async () => {
    try {
      setIsLoading(true);
      
      // Check if we're in a web environment and use getUserMedia API
      if (typeof navigator !== 'undefined' && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: 'environment' }, 
            audio: false 
          });
          
          // Create video element to capture frame
          const video = document.createElement('video');
          video.srcObject = stream;
          video.play();
          
          video.onloadedmetadata = () => {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(video, 0, 0);
            
            // Stop the stream
            stream.getTracks().forEach(track => track.stop());
            
            // Convert to blob and create URL
            canvas.toBlob((blob) => {
              if (blob) {
                const imageUrl = URL.createObjectURL(blob);
                setCapturedImage(imageUrl);
                toast.success('Photo captured successfully! 📸');
              }
            }, 'image/jpeg', 0.9);
          };
          
          return;
        } catch (webError) {
          console.log('Web camera access failed, trying Capacitor...', webError);
        }
      }
      
      // Fallback to Capacitor Camera API
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
      });

      setCapturedImage(image.webPath || '');
      toast.success('Photo captured successfully! 📸');
    } catch (error) {
      console.error('Error taking picture:', error);
      toast.error('Unable to access camera. Please check permissions.');
    } finally {
      setIsLoading(false);
    }
  };

  const selectFromGallery = async () => {
    try {
      setIsLoading(true);
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos,
      });

      setCapturedImage(image.webPath || '');
      toast.success('Image selected successfully! 🖼️');
    } catch (error) {
      console.error('Error selecting image:', error);
      toast.error('Unable to access photo gallery.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVideoUpload = () => {
    // Simulate video upload functionality
    toast.success('Video upload feature coming soon! 🎥');
  };

  const handleShare = () => {
    if (capturedImage) {
      toast.success('Your creation has been shared with the community! 🌱');
      setCapturedImage(null);
      onClose();
    }
  };

  const clearImage = () => {
    setCapturedImage(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <CameraIcon className="w-5 h-5 text-primary" />
            <span>Share Your Creation</span>
          </DialogTitle>
          <DialogDescription>
            Capture or upload your DIY upcycling project to share with the community
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {!capturedImage ? (
            <>
              <div className="grid grid-cols-1 gap-3">
                <Button
                  onClick={openLiveCamera}
                  disabled={isLoading}
                  className="h-14 bg-gradient-hero hover:bg-gradient-hero/90"
                >
                  <CameraIcon className="w-5 h-5 mr-2" />
                  Take Photo
                </Button>

                <Button
                  onClick={selectFromGallery}
                  disabled={isLoading}
                  variant="outline"
                  className="h-14"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Select from Gallery
                </Button>

                <Button
                  onClick={handleVideoUpload}
                  variant="outline"
                  className="h-14"
                >
                  <Video className="w-5 h-5 mr-2" />
                  Upload Video (Coming Soon)
                </Button>
              </div>

              <p className="text-sm text-muted-foreground text-center">
                Share your creative upcycling projects and inspire others! 🌱
              </p>
            </>
          ) : (
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <div className="relative">
                    <img
                      src={capturedImage}
                      alt="Captured creation"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <Button
                      onClick={clearImage}
                      size="sm"
                      variant="destructive"
                      className="absolute top-2 right-2"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="flex space-x-2">
                <Button onClick={handleShare} className="flex-1 bg-gradient-nature">
                  Share with Community
                </Button>
                <Button onClick={clearImage} variant="outline">
                  Retake
                </Button>
              </div>
            </div>
          )}
        </div>

        <LiveCameraView
          isOpen={showLiveCamera}
          onClose={() => setShowLiveCamera(false)}
          onPhotoTaken={handlePhotoTaken}
        />
      </DialogContent>
    </Dialog>
  );
};