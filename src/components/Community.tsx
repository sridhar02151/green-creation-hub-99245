import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Quote, Heart, Star } from "lucide-react"
import communityImage from "@/assets/community-sharing.jpg"
import { toast } from "sonner"

const Community = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      avatar: "SC",
      role: "Eco-Creator Mom",
      quote: "Review Green feels like having the most caring, creative family right at my fingertips. My kids and I have transformed our home with love and zero waste!",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      avatar: "MR", 
      role: "Community Builder",
      quote: "This isn't just an app - it's a movement of hearts. The connections I've made here have enriched my life beyond what I could imagine.",
      rating: 5
    },
    {
      name: "Priya Patel",
      avatar: "PP",
      role: "Local Artisan",
      quote: "The marketplace here feels different. People buy with intention and love. Every sale feels like sharing a piece of my heart with someone who truly values it.",
      rating: 5
    }
  ]

  return (
    <section className="py-generous bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Stories from Our 
            <span className="bg-gradient-hero bg-clip-text text-transparent"> Loving Community</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real hearts, real stories, real transformation. Every day, our eco-family grows stronger 
            through shared creativity, care, and commitment to our beautiful planet.
          </p>
        </div>

        {/* Community image section */}
        <div className="relative mb-16 rounded-3xl overflow-hidden shadow-2xl max-w-4xl mx-auto">
          <img 
            src={communityImage} 
            alt="Our diverse eco-family creating and sharing together"
            className="w-full h-64 md:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center p-8">
            <p className="text-white text-xl md:text-2xl font-semibold text-center max-w-2xl">
              "Together, we're not just reducing waste – we're creating a tapestry of love, 
              one thread of kindness at a time"
            </p>
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-2 border-border/50 hover:border-accent/30 bg-card/90 backdrop-blur-sm">
              <CardContent className="p-6">
                <Quote className="w-8 h-8 text-accent mb-4" />
                <p className="text-card-foreground leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </p>
                
                <div className="flex items-center space-x-4">
                  <Avatar className="border-2 border-accent/20">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-gradient-nature text-primary font-semibold">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <h4 className="font-semibold text-card-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <div className="flex space-x-1 mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Community call to action */}
        <div className="text-center">
          <div className="bg-gradient-nature rounded-3xl p-8 md:p-12 max-w-4xl mx-auto border border-primary/20 shadow-lg">
            <Heart className="w-16 h-16 text-primary mx-auto mb-6" />
            <h3 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Your Story Belongs Here
            </h3>
            <p className="text-lg md:text-xl text-primary/80 mb-8 max-w-2xl mx-auto">
              Every creator, every dreamer, every caring soul has a place in our family. 
              Your unique perspective and creativity make our community stronger and more beautiful.
            </p>
            
           <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Button 
               variant="hero" 
               size="xl"
               onClick={() => toast.success("Join now and become part of our loving community! 💚")}
             >
               💚 Join Our Community
             </Button>
             <Button 
               variant="warm" 
               size="xl"
               onClick={() => toast.success("We'd love to hear your story! Share it with us 📖")}
             >
               📖 Share Your Story
             </Button>
           </div>
            
            <p className="text-sm text-primary/60 mt-6">
              Free to join • Free to share • Free to love our planet together
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Community