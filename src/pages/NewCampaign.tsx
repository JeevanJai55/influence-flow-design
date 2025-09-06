import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft,
  Plus,
  Calendar,
  DollarSign,
  Users,
  Target,
  Instagram,
  Youtube,
  Twitter
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCampaigns } from "@/hooks/useCampaigns";
import { useToast } from "@/hooks/use-toast";

export default function NewCampaign() {
  const navigate = useNavigate();
  const { createCampaign } = useCampaigns();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    brand: "",
    budget: "",
    startDate: "",
    endDate: "",
    platforms: [] as string[],
    objectives: "",
    targetAudience: ""
  });

  const platforms = [
    { id: "instagram", name: "Instagram", icon: Instagram },
    { id: "youtube", name: "YouTube", icon: Youtube },
    { id: "twitter", name: "Twitter", icon: Twitter },
    { id: "tiktok", name: "TikTok", icon: Target }
  ];

  const togglePlatform = (platformId: string) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platformId) 
        ? prev.platforms.filter(p => p !== platformId)
        : [...prev.platforms, platformId]
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name) {
      toast({
        title: "Error",
        description: "Campaign name is required",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const campaignData = {
      ...formData,
      budget: formData.budget ? parseFloat(formData.budget) : undefined,
      goals: formData.platforms, // Using platforms as goals for now
      status: 'planning',
    };

    const result = await createCampaign(campaignData);
    if (result) {
      navigate('/campaigns');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <NavLink to="/campaigns">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </NavLink>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Create New Campaign</h1>
            <p className="text-muted-foreground">
              Set up a new influencer marketing campaign
            </p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={() => navigate('/campaigns')}>Save as Draft</Button>
          <Button className="bg-gradient-primary hover:shadow-glow transition-smooth" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Creating...' : 'Create Campaign'}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Campaign Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Campaign Name *</Label>
                  <Input 
                    id="name" 
                    placeholder="Summer Collection Launch" 
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brand">Brand</Label>
                  <Input 
                    id="brand" 
                    placeholder="Fashion Co" 
                    value={formData.brand}
                    onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe your campaign objectives and key messages..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Timeline & Budget */}
          <Card>
            <CardHeader>
              <CardTitle>Timeline & Budget</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget ($)</Label>
                  <Input 
                    id="budget" 
                    placeholder="25000" 
                    type="number"
                    value={formData.budget}
                    onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input 
                    id="startDate" 
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input 
                    id="endDate" 
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Platforms */}
          <Card>
            <CardHeader>
              <CardTitle>Target Platforms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {platforms.map((platform) => (
                  <div 
                    key={platform.id}
                    onClick={() => togglePlatform(platform.id)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      formData.platforms.includes(platform.id)
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <platform.icon className="h-6 w-6" />
                      <span className="text-sm font-medium">{platform.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Campaign Objectives */}
          <Card>
            <CardHeader>
              <CardTitle>Objectives</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={formData.objectives} onValueChange={(value) => setFormData(prev => ({ ...prev, objectives: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select primary objective" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="awareness">Brand Awareness</SelectItem>
                  <SelectItem value="engagement">Engagement</SelectItem>
                  <SelectItem value="conversions">Conversions</SelectItem>
                  <SelectItem value="reach">Reach & Impressions</SelectItem>
                  <SelectItem value="traffic">Website Traffic</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Target Audience */}
          <Card>
            <CardHeader>
              <CardTitle>Target Audience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea 
                placeholder="Describe your target audience demographics, interests, and behaviors..."
                value={formData.targetAudience}
                onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))}
              />
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Browse Influencers
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Content
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Target className="h-4 w-4 mr-2" />
                Set KPIs
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}