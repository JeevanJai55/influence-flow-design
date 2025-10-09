import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Upload, 
  Image, 
  Video, 
  FileText, 
  Download, 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  Star,
  Eye,
  Trash2,
  Edit3,
  FolderPlus,
  Palette,
  Type,
  Music,
  Camera
} from "lucide-react";

interface Asset {
  id: string;
  name: string;
  type: 'image' | 'video' | 'logo' | 'template' | 'audio' | 'document';
  size: string;
  format: string;
  category: string;
  uploadDate: Date;
  tags: string[];
  isFavorite: boolean;
  thumbnail: string;
}

export default function BrandAssets() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock assets data
  const assets: Asset[] = [
    {
      id: '1',
      name: 'Brand Logo Primary',
      type: 'logo',
      size: '2.3 MB',
      format: 'PNG',
      category: 'branding',
      uploadDate: new Date(2024, 2, 10),
      tags: ['logo', 'primary', 'brand'],
      isFavorite: true,
      thumbnail: '/api/placeholder/200/200'
    },
    {
      id: '2',
      name: 'Product Hero Video',
      type: 'video',
      size: '45.8 MB',
      format: 'MP4',
      category: 'content',
      uploadDate: new Date(2024, 2, 12),
      tags: ['hero', 'product', 'video'],
      isFavorite: false,
      thumbnail: '/api/placeholder/200/200'
    },
    {
      id: '3',
      name: 'Social Media Template',
      type: 'template',
      size: '1.2 MB',
      format: 'PSD',
      category: 'templates',
      uploadDate: new Date(2024, 2, 14),
      tags: ['template', 'social', 'instagram'],
      isFavorite: true,
      thumbnail: '/api/placeholder/200/200'
    },
    {
      id: '4',
      name: 'Brand Colors Palette',
      type: 'document',
      size: '856 KB',
      format: 'PDF',
      category: 'guidelines',
      uploadDate: new Date(2024, 2, 8),
      tags: ['colors', 'palette', 'brand'],
      isFavorite: false,
      thumbnail: '/api/placeholder/200/200'
    },
    {
      id: '5',
      name: 'Campaign Background Music',
      type: 'audio',
      size: '8.4 MB',
      format: 'MP3',
      category: 'audio',
      uploadDate: new Date(2024, 2, 16),
      tags: ['music', 'background', 'campaign'],
      isFavorite: false,
      thumbnail: '/api/placeholder/200/200'
    },
    {
      id: '6',
      name: 'Product Photography Set',
      type: 'image',
      size: '12.7 MB',
      format: 'JPG',
      category: 'photography',
      uploadDate: new Date(2024, 2, 18),
      tags: ['product', 'photography', 'high-res'],
      isFavorite: true,
      thumbnail: '/api/placeholder/200/200'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Assets', count: assets.length },
    { id: 'branding', name: 'Branding', count: assets.filter(a => a.category === 'branding').length },
    { id: 'content', name: 'Content', count: assets.filter(a => a.category === 'content').length },
    { id: 'templates', name: 'Templates', count: assets.filter(a => a.category === 'templates').length },
    { id: 'guidelines', name: 'Guidelines', count: assets.filter(a => a.category === 'guidelines').length },
    { id: 'photography', name: 'Photography', count: assets.filter(a => a.category === 'photography').length },
    { id: 'audio', name: 'Audio', count: assets.filter(a => a.category === 'audio').length }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'image': return Image;
      case 'video': return Video;
      case 'logo': return Palette;
      case 'template': return FileText;
      case 'audio': return Music;
      case 'document': return FileText;
      default: return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'image': return 'bg-info/10 text-info border-info/20';
      case 'video': return 'bg-primary/10 text-primary border-primary/20';
      case 'logo': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'template': return 'bg-success/10 text-success border-success/20';
      case 'audio': return 'bg-warning/10 text-warning border-warning/20';
      case 'document': return 'bg-muted text-muted-foreground border-border';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         asset.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || asset.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Brand Assets</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Centralized storage for all your brand assets and media files
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="outline">
            <FolderPlus className="h-4 w-4 mr-2" />
            New Folder
          </Button>
          <Button>
            <Upload className="h-4 w-4 mr-2" />
            Upload Assets
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Search and Filters */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Search & Filter
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search assets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Categories</label>
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "ghost"}
                    size="sm"
                    className="w-full justify-between"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <span>{category.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Storage Info */}
          <Card className="animate-fade-in" style={{animationDelay: '0.1s'}}>
            <CardHeader>
              <CardTitle>Storage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Used</span>
                  <span>2.8 GB of 10 GB</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '28%' }}></div>
                </div>
              </div>
              
              <Button variant="outline" size="sm" className="w-full">
                Upgrade Storage
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="animate-fade-in" style={{animationDelay: '0.2s'}}>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>Logo uploaded</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Template shared</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Video processed</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Toolbar */}
          <Card className="animate-fade-in">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {filteredAssets.length} assets
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex items-center border rounded-lg p-1">
                    <Button
                      variant={view === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setView('grid')}
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={view === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setView('list')}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Assets Grid/List */}
          {view === 'grid' ? (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredAssets.map((asset, index) => {
                const TypeIcon = getTypeIcon(asset.type);
                return (
                  <Card key={asset.id} className="group hover:shadow-lg transition-all duration-300 hover-scale animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                    <CardContent className="p-4">
                      <div className="relative mb-4">
                        <div className="aspect-square bg-muted/50 rounded-lg flex items-center justify-center">
                          {asset.type === 'image' || asset.type === 'video' ? (
                            <div className="w-full h-full bg-gradient-primary rounded-lg flex items-center justify-center">
                              <TypeIcon className="h-12 w-12 text-primary-foreground" />
                            </div>
                          ) : (
                            <TypeIcon className="h-12 w-12 text-muted-foreground" />
                          )}
                        </div>
                        
                        <div className="absolute top-2 right-2 flex items-center gap-1">
                          {asset.isFavorite && (
                            <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                              <Star className="h-3 w-3 text-white fill-current" />
                            </div>
                          )}
                        </div>
                        
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                          <Button size="sm" variant="secondary">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="secondary">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="secondary">
                            <Edit3 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-semibold truncate">{asset.name}</h3>
                        
                        <div className="flex items-center gap-2">
                          <Badge className={getTypeColor(asset.type)}>
                            {asset.type}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {asset.format}
                          </Badge>
                        </div>
                        
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>{asset.size}</span>
                          <span>{asset.uploadDate.toLocaleDateString()}</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {asset.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                          {asset.tags.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{asset.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredAssets.map((asset, index) => {
                const TypeIcon = getTypeIcon(asset.type);
                return (
                  <Card key={asset.id} className="hover:shadow-lg transition-all duration-300 hover-scale animate-fade-in" style={{animationDelay: `${index * 0.05}s`}}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                            <TypeIcon className="h-6 w-6 text-primary-foreground" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold truncate">{asset.name}</h3>
                              {asset.isFavorite && (
                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              )}
                            </div>
                            
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <Badge className={getTypeColor(asset.type)}>
                                {asset.type}
                              </Badge>
                              <span>{asset.format}</span>
                              <span>{asset.size}</span>
                              <span>{asset.uploadDate.toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit3 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}