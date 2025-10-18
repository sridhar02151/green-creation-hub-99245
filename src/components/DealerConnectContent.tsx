import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  MapPin,
  Phone,
  Clock,
  Star,
  Truck,
  Filter,
  MessageCircle,
  Navigation,
  Award
} from "lucide-react";
import reviewGreenLogo from "@/assets/review-green-logo.png";
import { toast } from "sonner";

export const DealerConnectContent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleCallDealer = (dealer: any) => {
    toast.success(`Calling ${dealer.name} at ${dealer.phone}...`);
  };

  const handleSendMessage = (dealer: any) => {
    toast.success(`Message sent to ${dealer.name}!`);
  };

  const handleGetDirections = (dealer: any) => {
    toast.success(`Opening directions to ${dealer.name} at ${dealer.address}...`);
  };

  const handleRegisterBusiness = () => {
    toast.success("Business registration form opening soon!");
  };

  const categories = [
    { id: "all", name: "All Dealers", icon: "🏪" },
    { id: "electronics", name: "Electronics", icon: "📱" },
    { id: "metal", name: "Metal & Scrap", icon: "🔩" },
    { id: "paper", name: "Paper & Cardboard", icon: "📄" },
    { id: "plastic", name: "Plastic", icon: "🥤" },
    { id: "glass", name: "Glass", icon: "🍷" }
  ];

  const dealers = [
    {
      id: 1,
      name: "GreenTech Electronics",
      category: "electronics",
      rating: 4.8,
      reviews: 156,
      distance: "1.2 miles",
      address: "123 Eco Street, San Francisco, CA",
      phone: "(555) 123-4567",
      hours: "Mon-Fri 9AM-6PM",
      specialties: ["Phones", "Computers", "Batteries"],
      price: "$$",
      verified: true,
      image: "📱",
      description: "Specialized in electronic waste recycling with certified data destruction services.",
      perks: ["Free pickup over $50", "Data destruction", "Instant quotes"]
    },
    {
      id: 2,
      name: "Bay Area Metal Works",
      category: "metal",
      rating: 4.6,
      reviews: 89,
      distance: "2.8 miles",
      address: "456 Industrial Ave, Oakland, CA",
      phone: "(555) 987-6543",
      hours: "Mon-Sat 8AM-5PM",
      specialties: ["Aluminum", "Copper", "Steel"],
      price: "$$$",
      verified: true,
      image: "🔩",
      description: "Family-owned metal recycling business serving the Bay Area for over 20 years.",
      perks: ["Best prices", "Same-day pickup", "Volume discounts"]
    },
    {
      id: 3,
      name: "Pacific Paper Recovery",
      category: "paper",
      rating: 4.7,
      reviews: 234,
      distance: "3.5 miles",
      address: "789 Recycle Blvd, Berkeley, CA",
      phone: "(555) 456-7890",
      hours: "24/7 Drop-off",
      specialties: ["Cardboard", "Office Paper", "Newspapers"],
      price: "$",
      verified: true,
      image: "📄",
      description: "Large-scale paper recycling facility with convenient 24/7 drop-off bins.",
      perks: ["24/7 access", "No minimum", "Educational tours"]
    },
    {
      id: 4,
      name: "EcoPlastic Solutions",
      category: "plastic",
      rating: 4.5,
      reviews: 67,
      distance: "4.2 miles",
      address: "321 Green Way, Fremont, CA",
      phone: "(555) 234-5678",
      hours: "Tue-Sat 10AM-4PM",
      specialties: ["PET Bottles", "HDPE", "Film Plastic"],
      price: "$$",
      verified: false,
      image: "🥤",
      description: "Innovative plastic recycling with focus on turning waste into new products.",
      perks: ["Creative projects", "Bulk discounts", "Community workshops"]
    },
    {
      id: 5,
      name: "Crystal Clear Glass",
      category: "glass",
      rating: 4.9,
      reviews: 123,
      distance: "5.1 miles",
      address: "654 Clear View Dr, Palo Alto, CA",
      phone: "(555) 345-6789",
      hours: "Mon-Fri 9AM-5PM",
      specialties: ["Bottles", "Windows", "Containers"],
      price: "$$",
      verified: true,
      image: "🍷",
      description: "Premium glass recycling with artistic upcycling services available.",
      perks: ["Art services", "Custom processing", "High-quality materials"]
    }
  ];

  const filteredDealers = dealers.filter(dealer => {
    const matchesSearch = dealer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dealer.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || dealer.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Dealer Connect 📞</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Find trusted local waste dealers and recycling centers. Get the best prices for your materials and support circular economy.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search dealers by name or material type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12"
          />
        </div>
        <Button variant="outline" className="flex items-center space-x-2">
          <Filter className="w-4 h-4" />
          <span>More Filters</span>
        </Button>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-3 justify-center">
        {categories.map(category => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "hero" : "nature"}
            onClick={() => setSelectedCategory(category.id)}
            className="flex items-center space-x-2"
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
          </Button>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl mb-2">🏪</div>
            <div className="text-2xl font-bold text-primary">25+</div>
            <div className="text-sm text-muted-foreground">Verified Dealers</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl mb-2">⭐</div>
            <div className="text-2xl font-bold text-primary">4.7</div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl mb-2">🚚</div>
            <div className="text-2xl font-bold text-primary">15</div>
            <div className="text-sm text-muted-foreground">Pickup Services</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl mb-2">💰</div>
            <div className="text-2xl font-bold text-primary">$2.3k</div>
            <div className="text-sm text-muted-foreground">Avg Monthly Earnings</div>
          </CardContent>
        </Card>
      </div>

      {/* Dealers List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">
            {selectedCategory === "all" ? "All Dealers" : `${categories.find(c => c.id === selectedCategory)?.name} Dealers`}
          </h2>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>Sorted by distance</span>
          </div>
        </div>

        <div className="space-y-4">
          {filteredDealers.map(dealer => (
            <Card key={dealer.id} className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Dealer Info */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-nature rounded-lg flex items-center justify-center text-2xl">
                          {dealer.image}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="text-xl font-bold text-foreground">{dealer.name}</h3>
                            {dealer.verified && (
                              <Badge className="bg-green-100 text-green-700">
                                <Award className="w-3 h-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-4 mt-1">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span className="text-sm font-medium">{dealer.rating}</span>
                              <span className="text-sm text-muted-foreground">({dealer.reviews} reviews)</span>
                            </div>
                            <Badge variant="outline">{dealer.price}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-primary">{dealer.distance}</p>
                        <p className="text-xs text-muted-foreground">away</p>
                      </div>
                    </div>

                    <p className="text-muted-foreground">{dealer.description}</p>

                    {/* Specialties */}
                    <div className="space-y-2">
                      <p className="text-sm font-semibold">Specializes in:</p>
                      <div className="flex flex-wrap gap-2">
                        {dealer.specialties.map((specialty, index) => (
                          <Badge key={index} variant="secondary">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Perks */}
                    <div className="space-y-2">
                      <p className="text-sm font-semibold">Perks:</p>
                      <div className="flex flex-wrap gap-2">
                        {dealer.perks.map((perk, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {perk}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{dealer.address}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span>{dealer.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{dealer.hours}</span>
                      </div>
                    </div>
                  </div>

                 {/* Action Buttons */}
                 <div className="flex flex-col space-y-3 lg:w-48">
                   <Button variant="hero" className="w-full" onClick={() => handleCallDealer(dealer)}>
                     <Phone className="w-4 h-4 mr-2" />
                     Call Now
                   </Button>
                   <Button variant="nature" className="w-full" onClick={() => handleSendMessage(dealer)}>
                     <MessageCircle className="w-4 h-4 mr-2" />
                     Send Message
                   </Button>
                   <Button variant="ghost" className="w-full" onClick={() => handleGetDirections(dealer)}>
                     <Navigation className="w-4 h-4 mr-2" />
                     Get Directions
                   </Button>
                 </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Add Dealer CTA */}
      <Card className="border-dashed border-2 border-primary/30 bg-primary/5">
        <CardContent className="p-8 text-center">
          <img src={reviewGreenLogo} alt="Review Green" className="w-16 h-16 mx-auto mb-4 object-contain" />
          <h3 className="text-2xl font-bold text-primary mb-2">Are You a Waste Dealer?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join our network of trusted dealers and connect with eco-conscious customers in your area. Grow your business while supporting sustainability.
          </p>
         <Button variant="hero" size="lg" onClick={handleRegisterBusiness}>
           <Truck className="w-5 h-5 mr-2" />
           Register Your Business
         </Button>
        </CardContent>
      </Card>
    </div>
  );
};