import { Button } from "@/components/ui/button"
import { Heart, Users } from "lucide-react"
import heroImage from "@/assets/hero-upcycling.jpg"
import reviewGreenLogo from "@/assets/review-green-logo.png"
import { toast } from "sonner"

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Background with gentle gradient */}
      <div className="absolute inset-0 bg-gradient-soft"></div>
      
      {/* Background image with overlay */}
      <div className="absolute inset-0 opacity-20">
        <img 
          src={heroImage} 
          alt="Hands creating beautiful upcycled treasures"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
          {/* Floating icons */}
          <div className="flex justify-center space-x-6 md:space-x-8 mb-6 md:mb-8">
            <div className="animate-bounce delay-0">
              <Heart className="w-6 h-6 md:w-8 md:h-8 text-accent" />
            </div>
            <div className="animate-bounce delay-150">
              <img src={reviewGreenLogo} alt="Review Green" className="w-6 h-6 md:w-8 md:h-8 object-contain" />
            </div>
            <div className="animate-bounce delay-300">
              <Users className="w-6 h-6 md:w-8 md:h-8 text-accent" />
            </div>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-foreground leading-tight">
            Turn Waste Into 
            <span className="bg-gradient-hero bg-clip-text text-transparent block mt-2">
              Wonders
            </span>
          </h1>

          {/* Heartfelt description */}
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light px-2">
            Welcome to Review Green, where every discarded item holds a story waiting to be rewritten. 
            Join our loving community of earth-guardians who see treasure where others see trash. 
            Together, we're not just reducing waste – we're creating a movement of hope, one beautiful 
            creation at a time.
          </p>

          {/* Emotional connection text */}
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 max-w-2xl mx-auto border border-border shadow-lg mx-4">
            <p className="text-base md:text-lg text-card-foreground italic">
              "Every bottle, every fabric scrap, every forgotten object is a chance to show our planet some love. 
              Here, creativity meets compassion, and waste becomes wonder."
            </p>
          </div>

         {/* Call to action buttons */}
         <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center pt-6 md:pt-8 px-4">
           <Button 
             variant="hero" 
             size="xl" 
             className="text-base md:text-lg w-full sm:w-auto"
             onClick={() => toast.success("Welcome to Review Green! Sign up to start your eco-journey 🌱")}
           >
             🌱 Join Our Eco-Family
           </Button>
           <Button 
             variant="nature" 
             size="xl" 
             className="text-base md:text-lg w-full sm:w-auto"
             onClick={() => {
               const featuresSection = document.querySelector('[data-section="features"]');
               featuresSection?.scrollIntoView({ behavior: 'smooth' });
             }}
           >
             💚 Discover the Magic
           </Button>
         </div>

          {/* Community stats */}
          <div className="grid grid-cols-3 gap-4 md:flex md:flex-wrap md:justify-center md:gap-8 pt-8 md:pt-12 text-sm text-muted-foreground max-w-md md:max-w-none mx-auto">
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-primary">50K+</div>
              <div className="text-xs md:text-sm">Loving Creators</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-accent">1M+</div>
              <div className="text-xs md:text-sm">Items Rescued</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-earth-deep">200K+</div>
              <div className="text-xs md:text-sm">Stories Shared</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero