import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search,
  Filter,
  Grid3X3,
  List,
  Star,
  Download,
  Eye,
  Copy,
  Plus,
  Image,
  Video,
  FileText,
  Palette
} from "lucide-react";

export default function Templates() {
  const templateCategories = [
    { name: "All", count: 89, active: true },
    { name: "Social Posts", count: 34, active: false },
    { name: "Stories", count: 22, active: false },
    { name: "Video", count: 15, active: false },
    { name: "Email", count: 12, active: false },
    { name: "Banners", count: 6, active: false }
  ];

  const templates = [
    {
      id: 1,
      name: "Instagram Story Template",
      type: "story",
      category: "Stories",
      description: "Modern gradient story template with text overlay",
      downloads: 1247,
      rating: 4.8,
      isPremium: false,
      thumbnail: "📱",
      format: "PSD"
    },
    {
      id: 2,
      name: "Product Showcase Post",
      type: "post",
      category: "Social Posts", 
      description: "Clean product showcase template for e-commerce brands",
      downloads: 892,
      rating: 4.9,
      isPremium: true,
      thumbnail: "🛍️",
      format: "AI"
    },
    {
      id: 3,
      name: "Video Intro Template",
      type: "video",
      category: "Video",
      description: "Dynamic intro template with brand logo animation",
      downloads: 634,
      rating: 4.7,
      isPremium: true,
      thumbnail: "🎬",
      format: "AE"
    },
    {
      id: 4,
      name: "Brand Guidelines Template",
      type: "document",
      category: "Branding",
      description: "Complete brand guidelines template with color palettes",
      downloads: 456,
      rating: 4.6,
      isPremium: false,
      thumbnail: "📋",
      format: "PDF"
    },
    {
      id: 5,
      name: "Email Newsletter Template",
      type: "email",
      category: "Email",
      description: "Responsive email template for influencer campaigns",
      downloads: 723,
      rating: 4.5,
      isPremium: false,
      thumbnail: "📧",
      format: "HTML"
    },
    {
      id: 6,
      name: "Banner Ad Template",
      type: "banner",
      category: "Banners",
      description: "Multi-size banner template for digital advertising",
      downloads: 301,
      rating: 4.4,
      isPremium: true,
      thumbnail: "🎨",
      format: "PSD"
    },
    {
      id: 7,
      name: "Quote Post Template",
      type: "post",
      category: "Social Posts",
      description: "Inspirational quote template with typography focus",
      downloads: 987,
      rating: 4.8,
      isPremium: false,
      thumbnail: "💭",
      format: "AI"
    },
    {
      id: 8,
      name: "TikTok Video Template",
      type: "video",
      category: "Video",
      description: "Vertical video template optimized for TikTok content",
      downloads: 1156,
      rating: 4.9,
      isPremium: true,
      thumbnail: "🎵",
      format: "AE"
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "story": return Image;
      case "post": return Image;
      case "video": return Video;
      case "document": return FileText;
      case "email": return FileText;
      case "banner": return Palette;
      default: return Image;
    }
  };

  const getFormatColor = (format: string) => {
    switch (format) {
      case "PSD": return "bg-blue-500/10 text-blue-600";
      case "AI": return "bg-orange-500/10 text-orange-600";
      case "AE": return "bg-purple-500/10 text-purple-600";
      case "PDF": return "bg-red-500/10 text-red-600";
      case "HTML": return "bg-green-500/10 text-green-600";
      default: return "bg-gray-500/10 text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Templates</h1>
          <p className="text-muted-foreground">
            Professional templates to accelerate your content creation
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="transition-smooth">
            <Download className="h-4 w-4 mr-2" />
            My Downloads
          </Button>
          <Button className="bg-gradient-primary hover:shadow-glow transition-smooth">
            <Plus className="h-4 w-4 mr-2" />
            Upload Template
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search templates..." 
              className="pl-10 w-80"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon">
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Categories Sidebar */}
        <div className="space-y-6">
          <Card className="transition-smooth hover:shadow-elegant border-border/50">
            <CardHeader>
              <CardTitle className="text-foreground">Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {templateCategories.map((category, index) => (
                <div 
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                    category.active 
                      ? 'bg-primary/10 text-primary border border-primary/20' 
                      : 'hover:bg-muted/50'
                  }`}
                >
                  <span className="font-medium">{category.name}</span>
                  <Badge variant="secondary" className="text-xs">{category.count}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Featured */}
          <Card className="transition-smooth hover:shadow-elegant border-border/50">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center">
                <Star className="h-4 w-4 mr-2 text-golden" />
                Featured
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 rounded-lg bg-gradient-primary/10 border border-primary/20">
                <h4 className="font-semibold text-foreground text-sm">Premium Pack</h4>
                <p className="text-xs text-muted-foreground">50+ premium templates</p>
                <Button size="sm" className="w-full mt-2 bg-gradient-primary">
                  Upgrade Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Templates Grid */}
        <div className="lg:col-span-3">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {templates.map((template) => {
              const TypeIcon = getTypeIcon(template.type);
              return (
                <Card key={template.id} className="transition-smooth hover:shadow-elegant border-border/50 cursor-pointer group">
                  <CardContent className="p-4">
                    {/* Thumbnail */}
                    <div className="aspect-square bg-muted/30 rounded-lg flex items-center justify-center mb-4 group-hover:bg-muted/50 transition-colors relative">
                      <span className="text-4xl">{template.thumbnail}</span>
                      {template.isPremium && (
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-golden text-black text-xs">
                            <Star className="h-3 w-3 mr-1" />
                            Pro
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Template Info */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-foreground text-sm leading-tight">{template.name}</h4>
                      <p className="text-xs text-muted-foreground line-clamp-2">{template.description}</p>

                      <div className="flex items-center space-x-2">
                        <TypeIcon className="h-3 w-3 text-muted-foreground" />
                        <Badge className={`text-xs ${getFormatColor(template.format)}`}>
                          {template.format}
                        </Badge>
                        <Badge variant="outline" className="text-xs">{template.category}</Badge>
                      </div>

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 text-golden fill-current" />
                            <span>{template.rating}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Download className="h-3 w-3" />
                            <span>{template.downloads}</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2 pt-2">
                        <Button size="sm" variant="outline" className="flex-1 text-xs">
                          <Eye className="h-3 w-3 mr-1" />
                          Preview
                        </Button>
                        <Button size="sm" className="flex-1 text-xs bg-gradient-primary">
                          <Download className="h-3 w-3 mr-1" />
                          {template.isPremium ? 'Pro' : 'Free'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Upload Your Template */}
          <Card className="mt-6 transition-smooth hover:shadow-elegant border-border/50 border-dashed">
            <CardContent className="p-8">
              <div className="text-center">
                <Plus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Share Your Templates</h3>
                <p className="text-muted-foreground mb-4">
                  Upload your own templates and earn from downloads
                </p>
                <Button className="bg-gradient-primary hover:shadow-glow transition-smooth">
                  <Plus className="h-4 w-4 mr-2" />
                  Upload Template
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Earn 70% commission on every download
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}