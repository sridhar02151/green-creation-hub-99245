import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lightbulb, Heart, Users, Sparkles, BookOpen, ShoppingBag } from "lucide-react"
import { toast } from "sonner"

const Features = () => {
  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Learn & Create with Love",
      description: "Discover gentle DIY tutorials that transform forgotten items into cherished treasures. Our step-by-step guides feel like having a caring friend by your side.",
      color: "text-primary"
    },
    {
      icon: <ShoppingBag className="w-8 h-8" />,
      title: "Share in Our Caring Marketplace",
      description: "Showcase your beautiful creations in a community that celebrates every effort. Buy, sell, or gift with hearts full of appreciation for sustainable creativity.",
      color: "text-accent"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Connect with Your Eco-Family",
      description: "Find local waste dealers and fellow creators who share your passion. Build friendships that flourish around our shared love for the planet.",
      color: "text-earth-deep"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "AI-Powered Inspiration",
      description: "Let our gentle AI companion spark your imagination. Simply show us what you have, and discover endless possibilities with warmth and encouragement.",
      color: "text-primary"
    }
  ]

  return (
    <section className="py-generous bg-gradient-soft" data-section="features">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            How We Create 
            <span className="bg-gradient-hero bg-clip-text text-transparent"> Magic Together</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Every feature is designed with love, care, and the belief that small acts of creativity 
            can heal our world. This isn't just an app – it's a movement of hearts united for our planet.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-2 border-border/50 hover:border-primary/30 bg-card/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className={`mx-auto w-16 h-16 rounded-2xl bg-gradient-nature flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ${feature.color}`}>
                  {feature.icon}
                </div>
                <CardTitle className="text-2xl text-card-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg text-center leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Heart-centered call to action */}
        <div className="text-center mt-16">
          <div className="bg-card/90 backdrop-blur-sm rounded-3xl p-8 max-w-3xl mx-auto border border-border shadow-lg">
            <Heart className="w-12 h-12 text-accent mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-card-foreground mb-4">
              Ready to Make a Difference?
            </h3>
            <p className="text-lg text-muted-foreground mb-6">
              Every small action ripples out into something beautiful. Join thousands of caring souls 
              who are already turning waste into wonder, one creation at a time.
            </p>
           <Button 
             variant="hero" 
             size="xl"
             onClick={() => toast.success("Sign up now to begin making a difference! 🌿")}
           >
             🌿 Start Your Journey of Love
           </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features