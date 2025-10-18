import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { TutorialViewer } from "./TutorialViewer";
import {
  Search,
  Filter,
  BookOpen,
  Clock,
  Star,
  Heart,
  Users,
  Plus,
  Play,
  Bookmark
} from "lucide-react";
import wineBottleLights from "@/assets/wine-bottle-lights.jpg";
import denimOrganizer from "@/assets/denim-organizer.jpg";
import tinCanGarden from "@/assets/tin-can-garden.jpg";
import cardboardCastle from "@/assets/cardboard-castle.jpg";
import plasticPlanters from "@/assets/plastic-planters.jpg";
import glassJarStorage from "@/assets/glass-jar-storage.jpg";

export const DIYHubContent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showTutorial, setShowTutorial] = useState(false);

  const categories = [
    { id: "all", name: "All Projects", icon: "🌟" },
    { id: "glass", name: "Glass", icon: "🍷" },
    { id: "fabric", name: "Fabric", icon: "👕" },
    { id: "metal", name: "Metal", icon: "🥫" },
    { id: "cardboard", name: "Cardboard", icon: "📦" },
    { id: "plastic", name: "Plastic", icon: "🥤" }
  ];

  const projects = [
    {
      id: 1,
      title: "Wine Bottle Garden Lights",
      category: "glass",
      difficulty: "Easy",
      time: "45 min",
      rating: 4.8,
      likes: 234,
      author: "Sarah Green",
      image: wineBottleLights,
      description: "Transform wine bottles into magical garden lighting",
      materials: ["Wine bottles", "LED string lights", "Drill", "Glass cutter"],
      featured: true
    },
    {
      id: 2,
      title: "Denim Pocket Organizer",
      category: "fabric",
      difficulty: "Medium",
      time: "1.5 hours",
      rating: 4.6,
      likes: 189,
      author: "Alex Craft",
      image: denimOrganizer,
      description: "Repurpose old jeans into a practical wall organizer",
      materials: ["Old jeans", "Wooden frame", "Staples", "Scissors"],
      featured: false
    },
    {
      id: 3,
      title: "Tin Can Herb Garden",
      category: "metal",
      difficulty: "Easy",
      time: "30 min",
      rating: 4.9,
      likes: 456,
      author: "Green Thumb",
      image: tinCanGarden,
      description: "Create a vertical herb garden using tin cans",
      materials: ["Tin cans", "Paint", "Drill", "Herbs", "Soil"],
      featured: true
    },
    {
      id: 4,
      title: "Cardboard Kids Castle",
      category: "cardboard",
      difficulty: "Hard",
      time: "3 hours",
      rating: 4.7,
      likes: 312,
      author: "Creative Kids",
      image: cardboardCastle,
      description: "Build an amazing playhouse from cardboard boxes",
      materials: ["Large boxes", "Paint", "Scissors", "Tape", "Decorations"],
      featured: false
    },
    {
      id: 5,
      title: "Plastic Bottle Planters",
      category: "plastic",
      difficulty: "Easy",
      time: "20 min",
      rating: 4.5,
      likes: 178,
      author: "Eco Warrior",
      image: plasticPlanters,
      description: "Self-watering planters from plastic bottles",
      materials: ["Plastic bottles", "String", "Soil", "Seeds"],
      featured: false
    },
    {
      id: 6,
      title: "Glass Jar Storage Set",
      category: "glass",
      difficulty: "Easy",
      time: "25 min",
      rating: 4.8,
      likes: 203,
      author: "Organize Pro",
      image: glassJarStorage,
      description: "Stylish storage solution using glass jars",
      materials: ["Glass jars", "Labels", "Paint", "Brushes"],
      featured: false
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredProjects = projects.filter(p => p.featured);

  const openTutorial = (project: any) => {
    setSelectedProject(project);
    setShowTutorial(true);
  };

  const closeTutorial = () => {
    setShowTutorial(false);
    setSelectedProject(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">DIY Hub 🔨</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover amazing upcycling projects, share your creations, and learn from our passionate community
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search DIY projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12"
          />
        </div>
        <Button variant="outline" className="flex items-center space-x-2">
          <Filter className="w-4 h-4" />
          <span>Advanced Filters</span>
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

      {/* Featured Projects */}
      {selectedCategory === "all" && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground flex items-center space-x-2">
            <Star className="w-6 h-6 text-yellow-500" />
            <span>Featured Projects</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map(project => (
              <Card key={project.id} className="group hover:shadow-xl transition-all duration-300 border-2 border-primary/20">
                <CardHeader className="text-center">
                  <div className="w-full h-48 mb-4 rounded-md overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <Badge className="absolute top-4 right-4 bg-gradient-hero text-white">Featured</Badge>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription className="space-y-2">
                    <div className="flex items-center justify-center space-x-4 text-sm">
                      <Badge variant="secondary">{project.difficulty}</Badge>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{project.time}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>{project.rating}</span>
                      </span>
                    </div>
                    <p className="text-sm">{project.description}</p>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">by {project.author}</span>
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span>{project.likes}</span>
                    </div>
                  </div>
                   <div className="flex space-x-2">
                     <Button className="flex-1" variant="hero" onClick={() => openTutorial(project)}>
                       <Play className="w-4 h-4 mr-2" />
                       Start Tutorial
                     </Button>
                     <Button variant="nature" size="icon">
                       <Bookmark className="w-4 h-4" />
                     </Button>
                   </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* All Projects */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">
            {selectedCategory === "all" ? "All Projects" : `${categories.find(c => c.id === selectedCategory)?.name} Projects`}
          </h2>
          <Button variant="hero" className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Share Your Project</span>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <Card key={project.id} className="group hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-full h-48 mb-4 rounded-md overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardTitle className="text-lg">{project.title}</CardTitle>
                <CardDescription className="space-y-2">
                  <div className="flex items-center justify-center space-x-4 text-sm">
                    <Badge variant="secondary">{project.difficulty}</Badge>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{project.time}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>{project.rating}</span>
                    </span>
                  </div>
                  <p className="text-sm">{project.description}</p>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">Materials:</h4>
                  <div className="flex flex-wrap gap-1">
                    {project.materials.slice(0, 3).map((material, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {material}
                      </Badge>
                    ))}
                    {project.materials.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.materials.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">by {project.author}</span>
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span>{project.likes}</span>
                  </div>
                </div>

                 <div className="flex space-x-2">
                   <Button className="flex-1" variant="hero" onClick={() => openTutorial(project)}>
                     <BookOpen className="w-4 h-4 mr-2" />
                     View Tutorial
                   </Button>
                   <Button variant="nature" size="icon">
                     <Bookmark className="w-4 h-4" />
                   </Button>
                 </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Create Your Own */}
      <Card className="border-dashed border-2 border-primary/30 bg-primary/5">
        <CardContent className="p-8 text-center">
          <Plus className="w-16 h-16 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-primary mb-2">Share Your Creativity</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Have an amazing upcycling project? Share it with our community and inspire others to create sustainable magic!
          </p>
          <Button variant="hero" size="lg">
            <Plus className="w-5 h-5 mr-2" />
            Create New Tutorial
          </Button>
         </CardContent>
       </Card>

       {/* Tutorial Viewer Modal */}
       {selectedProject && (
         <TutorialViewer
           project={selectedProject}
           isOpen={showTutorial}
           onClose={closeTutorial}
         />
       )}
     </div>
   );
 };