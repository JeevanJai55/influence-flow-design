import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Plus,
  Link,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  ExternalLink,
  Eye,
  Palette,
  Settings,
  Share2,
  BarChart3,
  Edit3,
  Trash2
} from "lucide-react";

interface BioLink {
  id: string;
  title: string;
  url: string;
  description?: string;
  icon: string;
  enabled: boolean;
  clicks: number;
}

interface BioPage {
  id: string;
  title: string;
  description: string;
  profileImage: string;
  theme: string;
  links: BioLink[];
  views: number;
  totalClicks: number;
}

export default function BioLinkBuilder() {
  const [showNewLinkDialog, setShowNewLinkDialog] = useState(false);
  const [showNewPageDialog, setShowNewPageDialog] = useState(false);
  const [selectedPage, setSelectedPage] = useState<string>("1");
  const [newLinkForm, setNewLinkForm] = useState({
    title: "",
    url: "",
    description: "",
    icon: "Link"
  });
  const [newPageForm, setNewPageForm] = useState({
    title: "",
    description: "",
    theme: "default"
  });

  const [bioPages, setBioPages] = useState<BioPage[]>([
    {
      id: "1",
      title: "Sarah's Links",
      description: "Fashion & Lifestyle Content Creator",
      profileImage: "SJ",
      theme: "default",
      views: 2847,
      totalClicks: 892,
      links: [
        {
          id: "1",
          title: "Latest YouTube Video",
          url: "https://youtube.com",
          description: "Summer Fashion Haul",
          icon: "Youtube",
          enabled: true,
          clicks: 245
        },
        {
          id: "2", 
          title: "Instagram Profile",
          url: "https://instagram.com",
          icon: "Instagram",
          enabled: true,
          clicks: 189
        },
        {
          id: "3",
          title: "Shop My Favorites",
          url: "https://shop.com",
          description: "Curated fashion picks",
          icon: "Link",
          enabled: true,
          clicks: 167
        },
        {
          id: "4",
          title: "Newsletter Signup",
          url: "https://newsletter.com",
          description: "Weekly style tips",
          icon: "Link",
          enabled: false,
          clicks: 78
        }
      ]
    }
  ]);

  const currentPage = bioPages.find(page => page.id === selectedPage);

  const addNewLink = () => {
    if (!newLinkForm.title || !newLinkForm.url) return;

    const newLink: BioLink = {
      id: Date.now().toString(),
      title: newLinkForm.title,
      url: newLinkForm.url,
      description: newLinkForm.description,
      icon: newLinkForm.icon,
      enabled: true,
      clicks: 0
    };

    setBioPages(prev => 
      prev.map(page => 
        page.id === selectedPage 
          ? { ...page, links: [...page.links, newLink] }
          : page
      )
    );

    setNewLinkForm({
      title: "",
      url: "",
      description: "",
      icon: "Link"
    });
    setShowNewLinkDialog(false);
  };

  const toggleLinkEnabled = (linkId: string) => {
    setBioPages(prev => 
      prev.map(page => 
        page.id === selectedPage 
          ? {
              ...page,
              links: page.links.map(link => 
                link.id === linkId 
                  ? { ...link, enabled: !link.enabled }
                  : link
              )
            }
          : page
      )
    );
  };

  const deleteLink = (linkId: string) => {
    setBioPages(prev => 
      prev.map(page => 
        page.id === selectedPage 
          ? {
              ...page,
              links: page.links.filter(link => link.id !== linkId)
            }
          : page
      )
    );
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "Instagram": return <Instagram className="h-4 w-4" />;
      case "Facebook": return <Facebook className="h-4 w-4" />;
      case "Twitter": return <Twitter className="h-4 w-4" />;
      case "Youtube": return <Youtube className="h-4 w-4" />;
      default: return <Link className="h-4 w-4" />;
    }
  };

  if (!currentPage) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Bio Link Builder</h1>
          <p className="text-muted-foreground">
            Create beautiful bio link pages for Instagram, Facebook & more
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="transition-smooth">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button 
            onClick={() => setShowNewPageDialog(true)}
            className="bg-gradient-primary hover:shadow-glow transition-smooth"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Bio Page
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Eye className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Views</p>
                <p className="text-xl font-bold text-foreground">{currentPage.views.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-mint/10 rounded-lg">
                <BarChart3 className="h-5 w-5 text-mint" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Clicks</p>
                <p className="text-xl font-bold text-foreground">{currentPage.totalClicks}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-coral/10 rounded-lg">
                <Link className="h-5 w-5 text-coral" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Links</p>
                <p className="text-xl font-bold text-foreground">{currentPage.links.filter(l => l.enabled).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-golden/10 rounded-lg">
                <Share2 className="h-5 w-5 text-golden" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">CTR</p>
                <p className="text-xl font-bold text-foreground">
                  {((currentPage.totalClicks / currentPage.views) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor */}
        <Card className="h-fit">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-foreground">Bio Page Editor</CardTitle>
              <Button 
                onClick={() => setShowNewLinkDialog(true)}
                size="sm"
                className="bg-gradient-primary hover:shadow-glow transition-smooth"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Link
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Page Info */}
            <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
              <div>
                <Label className="text-sm font-medium text-foreground">Page Title</Label>
                <Input 
                  value={currentPage.title} 
                  className="mt-1"
                  placeholder="Your page title"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-foreground">Description</Label>
                <Textarea 
                  value={currentPage.description} 
                  className="mt-1"
                  placeholder="Brief description"
                  rows={2}
                />
              </div>
            </div>

            {/* Links List */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Links</h4>
              {currentPage.links.map((link) => (
                <div key={link.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border/30">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      {getIconComponent(link.icon)}
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium text-foreground">{link.title}</h5>
                      {link.description && (
                        <p className="text-xs text-muted-foreground">{link.description}</p>
                      )}
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {link.clicks} clicks
                        </Badge>
                        <Badge 
                          variant={link.enabled ? "default" : "secondary"} 
                          className="text-xs"
                        >
                          {link.enabled ? "Active" : "Disabled"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={link.enabled}
                      onCheckedChange={() => toggleLinkEnabled(link.id)}
                    />
                    <Button variant="ghost" size="icon" onClick={() => deleteLink(link.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-foreground">Live Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-w-sm mx-auto bg-background border border-border/50 rounded-2xl p-6 shadow-lg">
              {/* Profile Section */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-foreground font-bold text-xl">
                    {currentPage.profileImage}
                  </span>
                </div>
                <h3 className="font-bold text-foreground text-lg">{currentPage.title}</h3>
                <p className="text-muted-foreground text-sm">{currentPage.description}</p>
              </div>

              {/* Links */}
              <div className="space-y-3">
                {currentPage.links.filter(link => link.enabled).map((link) => (
                  <div 
                    key={link.id}
                    className="flex items-center justify-center space-x-3 p-3 bg-muted/30 rounded-lg border border-border/30 hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    {getIconComponent(link.icon)}
                    <span className="font-medium text-foreground">{link.title}</span>
                    <ExternalLink className="h-3 w-3 text-muted-foreground ml-auto" />
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="text-center mt-6 pt-4 border-t border-border/30">
                <p className="text-xs text-muted-foreground">
                  Created with OneInfluence
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Link Dialog */}
      <Dialog open={showNewLinkDialog} onOpenChange={setShowNewLinkDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Link</DialogTitle>
            <DialogDescription>
              Create a new link for your bio page.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={newLinkForm.title}
                onChange={(e) => setNewLinkForm(prev => ({ ...prev, title: e.target.value }))}
                className="col-span-3"
                placeholder="Link title..."
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="url" className="text-right">
                URL
              </Label>
              <Input
                id="url"
                value={newLinkForm.url}
                onChange={(e) => setNewLinkForm(prev => ({ ...prev, url: e.target.value }))}
                className="col-span-3"
                placeholder="https://..."
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                value={newLinkForm.description}
                onChange={(e) => setNewLinkForm(prev => ({ ...prev, description: e.target.value }))}
                className="col-span-3"
                placeholder="Optional description..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={addNewLink}>
              Add Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}