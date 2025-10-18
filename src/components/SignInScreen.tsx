import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Chrome } from "lucide-react";
import reviewGreenLogo from "@/assets/review-green-logo.png";

interface SignInScreenProps {
  onSignIn: (user: { name: string; email: string; avatar?: string }) => void;
}

export const SignInScreen = ({ onSignIn }: SignInScreenProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    // Simulate Google sign-in
    setTimeout(() => {
      onSignIn({
        name: "Green Explorer",
        email: "explorer@example.com",
        avatar: undefined
      });
      setIsLoading(false);
    }, 1500);
  };

  const handleEmailSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setIsLoading(true);
      setTimeout(() => {
        onSignIn({
          name: email.split('@')[0],
          email,
          avatar: undefined
        });
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-20 h-20 bg-white rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-24 h-24 bg-white rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-1/3 w-16 h-16 bg-white rounded-full animate-pulse delay-3000"></div>
      </div>

      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md space-y-8">
          {/* Logo and Branding */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 p-3">
                <img src={reviewGreenLogo} alt="Review Green Logo" className="w-full h-full object-contain" />
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-white">Review Green</h1>
              <p className="text-white/80 text-lg">Transform waste into wonder with love</p>
            </div>
          </div>

          {/* Sign In Card */}
          <Card className="backdrop-blur-sm bg-white/95 border-white/20 shadow-2xl">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl font-semibold text-foreground">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Join our community of eco-warriors and creators
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Google Sign In */}
              <Button
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full h-12 bg-white text-foreground border-2 border-border hover:bg-muted/50 transition-all duration-300"
                variant="outline"
              >
                <Chrome className="w-5 h-5 mr-3" />
                {isLoading ? "Signing in..." : "Continue with Google"}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or continue with email</span>
                </div>
              </div>

              {/* Email Sign In Form */}
              <form onSubmit={handleEmailSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-12 pr-12"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-12 w-12"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || !email || !password}
                  className="w-full h-12"
                  variant="hero"
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Button variant="link" className="p-0 h-auto font-semibold text-primary">
                    Sign up for free
                  </Button>
                </p>
                <Button variant="link" className="p-0 h-auto text-sm text-muted-foreground">
                  Forgot your password?
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Features Preview */}
          <div className="text-center space-y-4">
            <h3 className="text-white font-semibold">Join thousands creating a greener future</h3>
            <div className="flex justify-center space-x-8 text-white/80">
              <div className="text-center">
                <div className="text-2xl font-bold">1.2K+</div>
                <div className="text-sm">DIY Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">850+</div>
                <div className="text-sm">Community Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">2.5T</div>
                <div className="text-sm">Waste Diverted</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};