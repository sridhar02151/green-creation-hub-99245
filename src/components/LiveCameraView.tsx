import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Camera, RotateCcw, X, Check } from 'lucide-react';
import { toast } from 'sonner';

interface LiveCameraViewProps {
  isOpen: boolean;
  onClose: () => void;
  onPhotoTaken: (imageUrl: string) => void;
}

export const LiveCameraView = ({ isOpen, onClose, onPhotoTaken }: LiveCameraViewProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');

  const startCamera = async () => {
    try {
      setIsLoading(true);
      
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });

      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }
      
      toast.success('Camera ready! 📸');
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast.error('Unable to access camera. Please check permissions and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert to blob and create URL
    canvas.toBlob((blob) => {
      if (blob) {
        const imageUrl = URL.createObjectURL(blob);
        setCapturedPhoto(imageUrl);
        stopCamera();
        toast.success('Photo captured! 📸');
      }
    }, 'image/jpeg', 0.9);
  };

  const retakePhoto = () => {
    setCapturedPhoto(null);
    startCamera();
  };

  const confirmPhoto = () => {
    if (capturedPhoto) {
      onPhotoTaken(capturedPhoto);
      setCapturedPhoto(null);
      onClose();
    }
  };

  const switchCamera = () => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
  };

  const handleClose = () => {
    stopCamera();
    setCapturedPhoto(null);
    onClose();
  };

  useEffect(() => {
    if (isOpen && !capturedPhoto) {
      startCamera();
    }
    
    return () => {
      stopCamera();
    };
  }, [isOpen, facingMode]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg p-0">
        <DialogHeader className="p-4 pb-2">
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Camera className="w-5 h-5 text-primary" />
              <span>Camera</span>
            </div>
            <Button
              onClick={handleClose}
              size="sm"
              variant="ghost"
            >
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="relative">
          {!capturedPhoto ? (
            <>
              {/* Live Camera Feed */}
              <div className="relative bg-black">
                <video
                  ref={videoRef}
                  className="w-full h-80 object-cover"
                  playsInline
                  muted
                />
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <div className="text-white">Loading camera...</div>
                  </div>
                )}
              </div>

              {/* Camera Controls */}
              <div className="flex items-center justify-between p-4 bg-background">
                <Button
                  onClick={switchCamera}
                  variant="outline"
                  size="sm"
                  disabled={isLoading}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Flip
                </Button>

                <Button
                  onClick={takePhoto}
                  size="lg"
                  className="rounded-full w-16 h-16 bg-gradient-hero hover:bg-gradient-hero/90"
                  disabled={isLoading || !stream}
                >
                  <Camera className="w-6 h-6" />
                </Button>

                <div className="w-16" /> {/* Spacer for centering */}
              </div>
            </>
          ) : (
            <>
              {/* Captured Photo Preview */}
              <div className="relative">
                <img
                  src={capturedPhoto}
                  alt="Captured photo"
                  className="w-full h-80 object-cover"
                />
              </div>

              {/* Photo Actions */}
              <div className="flex items-center justify-between p-4 bg-background">
                <Button
                  onClick={retakePhoto}
                  variant="outline"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Retake
                </Button>

                <Button
                  onClick={confirmPhoto}
                  className="bg-gradient-nature hover:bg-gradient-nature/90"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Use Photo
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Hidden canvas for photo capture */}
        <canvas
          ref={canvasRef}
          className="hidden"
        />
      </DialogContent>
    </Dialog>
  );
};