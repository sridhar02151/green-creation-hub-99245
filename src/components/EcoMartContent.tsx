import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Filter,
  MapPin,
  Heart,
  MessageCircle,
  Star,
  DollarSign,
  Gift,
  Truck,
  Shield
} from "lucide-react";
import { toast } from "sonner";
import { SellItemDialog } from "./SellItemDialog";
import marketplaceWinePlanters from "@/assets/marketplace-wine-planters.jpg";
import marketplaceTinOrganizer from "@/assets/marketplace-tin-organizer.jpg";
import marketplaceDenimTote from "@/assets/marketplace-denim-tote.jpg";
import marketplaceCardboardCastle from "@/assets/marketplace-cardboard-castle.jpg";
import marketplaceGlassSpiceJars from "@/assets/marketplace-glass-spice-jars.jpg";
import marketplaceFabricBookmarks from "@/assets/marketplace-fabric-bookmarks.jpg";

export const EcoMartContent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const handleBuyNow = (item: any) => {
    toast.success(`Contacted seller: ${item.seller} for ${item.title}!`);
  };

  const handleSendMessage = (item: any) => {
    toast.success(`Chat started with ${item.seller}!`);
  };

  const handleLike = (item: any) => {
    toast.success(`Liked ${item.title}!`);
  };

  const filters = [
    { id: "all", name: "All Items", icon: "🛍️" },
    { id: "selling", name: "For Sale", icon: "💰" },
    { id: "free", name: "Free Items", icon: "🎁" },
    { id: "local", name: "Near Me", icon: "📍" }
  ];

  const items = [
    {
      id: 1,
      title: "Handcrafted Wine Bottle Planters",
      price: 25,
      isFree: false,
      seller: "EcoMama Sarah",
      location: "San Francisco, CA",
      distance: "2.3 miles",
      likes: 45,
      rating: 4.8,
      image: marketplaceWinePlanters,
      description: "Beautiful upcycled wine bottle planters, perfect for small herbs and succulents. Each planter is hand-cut and sanded smooth.",
      tags: ["Handmade", "Garden", "Upcycled"],
      featured: true
    },
    {
      id: 2,
      title: "Vintage Tin Can Desk Organizer Set",
      price: 35,
      isFree: false,
      seller: "GreenCrafter Mike",
      location: "Portland, OR",
      distance: "45 miles",
      likes: 23,
      rating: 4.6,
      image: marketplaceTinOrganizer,
      description: "Set of 5 beautifully painted tin can organizers. Perfect for desk supplies, art materials, or kitchen utensils.",
      tags: ["Office", "Vintage", "Set"],
      featured: false
    },
    {
      id: 3,
      title: "Upcycled Denim Tote Bag",
      price: 0,
      isFree: true,
      seller: "SustainableStitch",
      location: "Austin, TX",
      distance: "12 miles",
      likes: 67,
      rating: 4.9,
      image: marketplaceDenimTote,
      description: "Sturdy tote bag made from recycled jeans. Great condition, just clearing out my craft room!",
      tags: ["Free", "Fashion", "Denim"],
      featured: false
    },
    {
      id: 4,
      title: "Cardboard Playhouse Castle",
      price: 85,
      isFree: false,
      seller: "CreativeKids Co",
      location: "Seattle, WA",
      distance: "8.7 miles",
      likes: 156,
      rating: 4.7,
      image: marketplaceCardboardCastle,
      description: "Amazing castle made from recycled cardboard boxes. 4 feet tall, multiple rooms, and hand-painted details.",
      tags: ["Kids", "Large", "Custom"],
      featured: true
    },
    {
      id: 5,
      title: "Glass Jar Spice Storage Set",
      price: 15,
      isFree: false,
      seller: "KitchenCrafter",
      location: "Denver, CO",
      distance: "15 miles",
      likes: 89,
      rating: 4.5,
      image: marketplaceGlassSpiceJars,
      description: "Set of 12 upcycled glass jars with custom labels. Perfect for organizing spices and herbs.",
      tags: ["Kitchen", "Organization", "Glass"],
      featured: false
    },
    {
      id: 6,
      title: "Fabric Scrap Bookmark Collection",
      price: 0,
      isFree: true,
      seller: "BookLover Emma",
      location: "Chicago, IL",
      distance: "3.1 miles",
      likes: 34,
      rating: 4.4,
      image: marketplaceFabricBookmarks,
      description: "Beautiful bookmarks made from fabric scraps. Various designs and colors available.",
      tags: ["Free", "Books", "Handmade"],
      featured: false
    }
  ];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesFilter = true;
    if (selectedFilter === "selling") matchesFilter = !item.isFree;
    if (selectedFilter === "free") matchesFilter = item.isFree;
    if (selectedFilter === "local") matchesFilter = parseFloat(item.distance) < 10;
    
    return matchesSearch && matchesFilter;
  });

  const featuredItems = items.filter(item => item.featured);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">EcoMart 🛍️</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Buy, sell, or gift eco-friendly creations. Every purchase supports sustainable living and creative makers.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search for eco-treasures..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12"
          />
        </div>
        <div className="flex gap-2">
          {filters.map(filter => (
            <Button
              key={filter.id}
              variant={selectedFilter === filter.id ? "hero" : "nature"}
              onClick={() => setSelectedFilter(filter.id)}
              className="flex items-center space-x-2"
            >
              <span>{filter.icon}</span>
              <span className="hidden sm:inline">{filter.name}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Trust Badges */}
      <div className="flex justify-center space-x-8 py-4 bg-muted/30 rounded-lg">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Shield className="w-4 h-4 text-green-600" />
          <span>Verified Sellers</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Truck className="w-4 h-4 text-blue-600" />
          <span>Local Pickup</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Heart className="w-4 h-4 text-red-500" />
          <span>Community Verified</span>
        </div>
      </div>

      {/* Featured Items */}
      {selectedFilter === "all" && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground flex items-center space-x-2">
            <Star className="w-6 h-6 text-yellow-500" />
            <span>Featured Items</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredItems.map(item => (
              <Card key={item.id} className="group hover:shadow-xl transition-all duration-300 border-2 border-primary/20">
                <CardHeader className="text-center relative">
                  <Badge className="absolute top-4 right-4 bg-gradient-hero text-white">Featured</Badge>
                  <div className="w-full h-48 mb-4 rounded-md overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                  <CardDescription className="space-y-2">
                    <div className="flex items-center justify-center space-x-4">
                      <span className="text-2xl font-bold text-primary">
                        {item.isFree ? "FREE" : `$${item.price}`}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm">{item.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span className="text-sm">{item.likes}</span>
                      </div>
                    </div>
                    <p className="text-sm">{item.description}</p>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-8 h-8 border border-accent/30">
                      <AvatarFallback className="bg-gradient-nature text-primary text-xs">
                        {item.seller.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-primary">{item.seller}</p>
                      <p className="text-xs text-muted-foreground flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {item.distance} away
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                   <Button className="flex-1" variant="hero" onClick={() => handleBuyNow(item)}>
                     {item.isFree ? (
                       <>
                         <Gift className="w-4 h-4 mr-2" />
                         Claim Free
                       </>
                     ) : (
                       <>
                         <DollarSign className="w-4 h-4 mr-2" />
                         Buy Now
                       </>
                     )}
                   </Button>
                   <Button variant="nature" size="icon" onClick={() => handleSendMessage(item)}>
                     <MessageCircle className="w-4 h-4" />
                   </Button>
                   <Button variant="ghost" size="icon" onClick={() => handleLike(item)}>
                     <Heart className="w-4 h-4" />
                   </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* All Items */}
      <div className="space-y-4">
         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
           <h2 className="text-2xl font-bold text-foreground">
             {selectedFilter === "all" ? "All Items" : 
              selectedFilter === "free" ? "Free Items" :
              selectedFilter === "selling" ? "Items for Sale" : "Items Near You"}
           </h2>
           <SellItemDialog>
             <Button variant="hero" className="flex items-center space-x-2">
               <DollarSign className="w-4 h-4" />
               <span className="hidden sm:inline">List Your Item</span>
               <span className="sm:hidden">List Item</span>
             </Button>
           </SellItemDialog>
         </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <Card key={item.id} className="group hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-full h-48 mb-4 rounded-md overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <CardDescription className="space-y-2">
                  <div className="flex items-center justify-center space-x-4">
                    <span className="text-xl font-bold text-primary">
                      {item.isFree ? "FREE" : `$${item.price}`}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm">{item.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span className="text-sm">{item.likes}</span>
                    </div>
                  </div>
                  <p className="text-sm">{item.description}</p>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-1">
                  {item.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center space-x-2">
                  <Avatar className="w-8 h-8 border border-accent/30">
                    <AvatarFallback className="bg-gradient-nature text-primary text-xs">
                      {item.seller.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-primary">{item.seller}</p>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {item.distance} away
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
               <Button className="flex-1" variant="hero" onClick={() => handleBuyNow(item)}>
                 {item.isFree ? (
                   <>
                     <Gift className="w-4 h-4 mr-2" />
                     Claim
                   </>
                 ) : (
                   <>
                     <DollarSign className="w-4 h-4 mr-2" />
                     Buy
                   </>
                 )}
               </Button>
               <Button variant="nature" size="icon" onClick={() => handleSendMessage(item)}>
                 <MessageCircle className="w-4 h-4" />
               </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Sell Your Item CTA */}
      <Card className="bg-gradient-nature border-primary/20">
        <CardContent className="p-8 text-center">
          <DollarSign className="w-16 h-16 text-primary mx-auto mb-4" />
         <h3 className="text-2xl font-bold text-primary mb-2">Start Selling Your Creations</h3>
         <p className="text-primary/80 mb-6 max-w-2xl mx-auto">
           Turn your upcycling passion into income! List your handmade items and connect with eco-conscious buyers in your community.
         </p>
         <SellItemDialog>
           <Button variant="hero" size="lg">
             <DollarSign className="w-5 h-5 mr-2" />
             List Your First Item
           </Button>
         </SellItemDialog>
        </CardContent>
      </Card>
    </div>
  );
};