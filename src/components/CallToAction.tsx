import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Heart, Leaf, Users, Sparkles } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

const CallToAction = () => {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      toast.success(`Welcome to our eco-family! Check your email at ${email} 💚`)
      setEmail("")
    }
  }

  return (
    <section className="py-generous bg-gradient-hero relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 animate-pulse">
          <Leaf className="w-12 h-12 text-white/20" />
        </div>
        <div className="absolute top-32 right-20 animate-pulse delay-700">
          <Heart className="w-8 h-8 text-white/30" />
        </div>
        <div className="absolute bottom-20 left-1/4 animate-pulse delay-500">
          <Sparkles className="w-10 h-10 text-white/25" />
        </div>
        <div className="absolute bottom-32 right-10 animate-pulse delay-300">
          <Users className="w-14 h-14 text-white/15" />
        </div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main headline */}
          <h2 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-8 leading-tight">
            Be the Change 
            <span className="block text-white/90">Our Planet Needs</span>
          </h2>

          {/* Emotional connection */}
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Every piece of waste you transform, every creation you share, every connection you make 
            ripples out into a wave of positive change. Your love for our planet starts here, today.
          </p>

          {/* Value proposition */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 mb-10 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              🌱 Join 50,000+ Earth Guardians Who Are:
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-white/90 text-lg">
              <div className="flex items-center space-x-3">
                <Heart className="w-6 h-6 text-accent-foreground" />
                <span>Creating with purpose and love</span>
              </div>
              <div className="flex items-center space-x-3">
                <Leaf className="w-6 h-6 text-accent-foreground" />
                <span>Saving our planet one item at a time</span>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="w-6 h-6 text-accent-foreground" />
                <span>Building lasting eco-friendships</span>
              </div>
              <div className="flex items-center space-x-3">
                <Sparkles className="w-6 h-6 text-accent-foreground" />
                <span>Discovering endless creative possibilities</span>
              </div>
            </div>
          </div>

          {/* Email signup */}
          <div className="bg-white rounded-3xl p-8 mb-8 shadow-2xl max-w-2xl mx-auto">
            <h4 className="text-2xl font-bold text-primary mb-4">
              Start Your Journey Today
            </h4>
            <p className="text-muted-foreground mb-6">
              Join our loving community and get weekly inspiration, DIY guides, and heartwarming stories 
              delivered straight to your inbox.
            </p>
            
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-12 text-lg"
                required
              />
              <Button type="submit" variant="hero" size="lg" className="h-12 px-8">
                💚 Join Our Family
              </Button>
            </form>
            
            <p className="text-sm text-muted-foreground mt-3">
              Free forever • Unsubscribe anytime • Your privacy is sacred to us
            </p>
          </div>

          {/* Social proof */}
          <div className="flex flex-wrap justify-center gap-8 text-white/80 text-sm">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">⭐ 4.9</div>
              <div>App Store Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">💚 98%</div>
              <div>Would Recommend</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">🌍 Global</div>
              <div>Movement</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CallToAction