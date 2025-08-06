import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Upload,
  Download,
  Search,
  Filter,
  Grid3X3,
  List,
  Image,
  Video,
  FileText,
  Palette,
  Plus,
  Star,
  Eye,
  MoreHorizontal
} from "lucide-react";

export default function BrandAssets() {
  const assetCategories = [
    { name: "All", count: 127, active: true },
    { name: "Logos", count: 23, active: false },
    { name: "Images", count: 45, active: false },
    { name: "Videos", count: 18, active: false },
    { name: "Templates", count: 31, active: false },
    { name: "Guidelines", count: 10, active: false }
  ];

  const brandAssets = [
    {
      id: 1,
      name: "Primary Logo - Dark",
      type: "logo",
      format: "SVG",
      size: "2.4 MB",
      category: "Logos",
      downloads: 145,
      lastModified: "2 days ago",
      thumbnail: "🎨"
    },
    {
      id: 2,
      name: "Hero Banner Template",
      type: "template",
      format: "PSD",
      size: "15.7 MB",
      category: "Templates",
      downloads: 89,
      lastModified: "1 week ago",
      thumbnail: "📐"
    },
    {
      id: 3,
      name: "Product Photography Set",
      type: "image",
      format: "JPG",
      size: "25.3 MB",
      category: "Images",
      downloads: 234,
      lastModified: "3 days ago",
      thumbnail: "📸"
    },
    {
      id: 4,
      name: "Brand Guidelines 2024",
      type: "document",
      format: "PDF",
      size: "8.9 MB",
      category: "Guidelines",
      downloads: 567,
      lastModified: "1 month ago",
      thumbnail: "📋"
    },
    {
      id: 5,
      name: "Social Media Video Template",
      type: "video",
      format: "MP4",
      size: "45.2 MB",
      category: "Videos",
      downloads: 76,
      lastModified: "5 days ago",
      thumbnail: "🎬"
    },
    {
      id: 6,
      name: "Color Palette Swatches",
      type: "design",
      format: "ASE",
      size: "1.2 MB",
      category: "Guidelines",
      downloads: 298,
      lastModified: "1 week ago",
      thumbnail: "🎨"
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "logo": return Palette;
      case "image": return Image;
      case "video": return Video;
      case "template": return Grid3X3;
      case "document": return FileText;
      case "design": return Palette;
      default: return FileText;
    }
  };

  const getFormatColor = (format: string) => {
    switch (format) {
      case "SVG": return "bg-green-500/10 text-green-600";
      case "JPG": return "bg-blue-500/10 text-blue-600";
      case "PNG": return "bg-purple-500/10 text-purple-600";
      case "PDF": return "bg-red-500/10 text-red-600";
      case "PSD": return "bg-indigo-500/10 text-indigo-600";
      case "MP4": return "bg-orange-500/10 text-orange-600";
      case "ASE": return "bg-pink-500/10 text-pink-600";
      default: return "bg-gray-500/10 text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Brand Assets</h1>
          <p className="text-muted-foreground">
            Manage and organize your brand resources for influencer campaigns
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="transition-smooth">
            <Download className="h-4 w-4 mr-2" />
            Bulk Download
          </Button>
          <Button className="bg-gradient-primary hover:shadow-glow transition-smooth">
            <Upload className="h-4 w-4 mr-2" />
            Upload Assets
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search assets..." 
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
              {assetCategories.map((category, index) => (
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

          {/* Quick Stats */}
          <Card className="transition-smooth hover:shadow-elegant border-border/50">
            <CardHeader>
              <CardTitle className="text-foreground">Usage Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-muted/30 border border-border/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Downloads</p>
                    <p className="text-2xl font-bold text-foreground">1,409</p>
                  </div>
                  <Download className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Storage Used</p>
                    <p className="text-2xl font-bold text-foreground">2.4 GB</p>
                  </div>
                  <Upload className="h-8 w-8 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Assets Grid */}
        <div className="lg:col-span-3">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {brandAssets.map((asset) => {
              const TypeIcon = getTypeIcon(asset.type);
              return (
                <Card key={asset.id} className="transition-smooth hover:shadow-elegant border-border/50 cursor-pointer group">
                  <CardContent className="p-4">
                    {/* Thumbnail */}
                    <div className="aspect-square bg-muted/30 rounded-lg flex items-center justify-center mb-4 group-hover:bg-muted/50 transition-colors">
                      <span className="text-4xl">{asset.thumbnail}</span>
                    </div>

                    {/* Asset Info */}
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h4 className="font-semibold text-foreground text-sm leading-tight">{asset.name}</h4>
                        <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </div>

                      <div className="flex items-center space-x-2">
                        <TypeIcon className="h-3 w-3 text-muted-foreground" />
                        <Badge className={`text-xs ${getFormatColor(asset.format)}`}>
                          {asset.format}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{asset.size}</span>
                      </div>

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>{asset.downloads} downloads</span>
                        </div>
                        <span>{asset.lastModified}</span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2 pt-2">
                        <Button size="sm" variant="outline" className="flex-1 text-xs">
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                        <Button size="sm" variant="ghost" className="px-2">
                          <Star className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Upload Zone */}
          <Card className="mt-6 transition-smooth hover:shadow-elegant border-border/50 border-dashed">
            <CardContent className="p-8">
              <div className="text-center">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Upload New Assets</h3>
                <p className="text-muted-foreground mb-4">
                  Drag and drop files here, or click to browse
                </p>
                <Button className="bg-gradient-primary hover:shadow-glow transition-smooth">
                  <Plus className="h-4 w-4 mr-2" />
                  Choose Files
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Supports: JPG, PNG, SVG, PDF, PSD, MP4 (Max 100MB)
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}