import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Search, 
  Filter, 
  Plus, 
  Star, 
  Users, 
  Instagram, 
  Youtube,
  ExternalLink,
  Mail,
  Phone
} from "lucide-react";

export default function Influencers() {
  const [searchTerm, setSearchTerm] = useState("");

  const influencers = [
    {
      id: 1,
      name: "Sarah Johnson",
      handle: "@sarahjstyle",
      avatar: "SJ",
      platform: "Instagram",
      followers: "125K",
      engagement: "9.2%",
      category: "Fashion",
      location: "New York, NY",
      rate: "$1,200",
      status: "Active",
      lastCampaign: "Summer Collection"
    },
    {
      id: 2,
      name: "Mike Chen",
      handle: "@mikecfit",
      avatar: "MC",
      platform: "YouTube",
      followers: "89K",
      engagement: "8.7%",
      category: "Fitness",
      location: "Los Angeles, CA",
      rate: "$950",
      status: "Available",
      lastCampaign: "Protein Launch"
    },
    {
      id: 3,
      name: "Emma Davis",
      handle: "@emmaeats",
      avatar: "ED",
      platform: "Instagram",
      followers: "156K",
      engagement: "7.9%",
      category: "Food",
      location: "Chicago, IL",
      rate: "$1,500",
      status: "Busy",
      lastCampaign: "Restaurant Review"
    },
    {
      id: 4,
      name: "Alex Rivera",
      handle: "@alextech",
      avatar: "AR",
      platform: "YouTube",
      followers: "234K",
      engagement: "6.8%",
      category: "Technology",
      location: "San Francisco, CA",
      rate: "$2,100",
      status: "Active",
      lastCampaign: "Gadget Reviews"
    },
    {
      id: 5,
      name: "Lisa Park",
      handle: "@lisalooks",
      avatar: "LP",
      platform: "Instagram",
      followers: "98K",
      engagement: "10.1%",
      category: "Beauty",
      location: "Miami, FL",
      rate: "$1,100",
      status: "Available",
      lastCampaign: "Skincare Line"
    },
    {
      id: 6,
      name: "David Wilson",
      handle: "@davidtravels",
      avatar: "DW",
      platform: "Instagram",
      followers: "187K",
      engagement: "8.3%",
      category: "Travel",
      location: "Austin, TX",
      rate: "$1,800",
      status: "Active",
      lastCampaign: "Hotel Chain"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-mint/20 text-mint";
      case "Available":
        return "bg-primary/20 text-primary";
      case "Busy":
        return "bg-coral/20 text-coral";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "Instagram":
        return <Instagram className="h-4 w-4" />;
      case "YouTube":
        return <Youtube className="h-4 w-4" />;
      default:
        return <Users className="h-4 w-4" />;
    }
  };

  const filteredInfluencers = influencers.filter(influencer =>
    influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    influencer.handle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    influencer.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Influencers</h1>
          <p className="text-muted-foreground">
            Manage your influencer network and discover new talent.
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="transition-smooth">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button className="bg-gradient-primary hover:shadow-glow transition-smooth">
            <Plus className="h-4 w-4 mr-2" />
            Add Influencer
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search influencers by name, handle, or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Influencers Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredInfluencers.map((influencer) => (
          <Card key={influencer.id} className="transition-smooth hover:shadow-elegant border-border/50">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground font-semibold">
                      {influencer.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-foreground">{influencer.name}</h3>
                    <p className="text-sm text-muted-foreground">{influencer.handle}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(influencer.status)}>
                  {influencer.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-center mb-1">
                    {getPlatformIcon(influencer.platform)}
                  </div>
                  <div className="text-sm font-medium text-foreground">{influencer.followers}</div>
                  <div className="text-xs text-muted-foreground">Followers</div>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-center mb-1">
                    <Star className="h-4 w-4 text-golden" />
                  </div>
                  <div className="text-sm font-medium text-foreground">{influencer.engagement}</div>
                  <div className="text-xs text-muted-foreground">Engagement</div>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span className="text-foreground font-medium">{influencer.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location:</span>
                  <span className="text-foreground">{influencer.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rate:</span>
                  <span className="text-foreground font-medium">{influencer.rate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Campaign:</span>
                  <span className="text-foreground">{influencer.lastCampaign}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Mail className="h-3 w-3 mr-1" />
                  Contact
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredInfluencers.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No influencers found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search terms or add new influencers to your network.
          </p>
          <Button className="bg-gradient-primary hover:shadow-glow transition-smooth">
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Influencer
          </Button>
        </div>
      )}
    </div>
  );
}