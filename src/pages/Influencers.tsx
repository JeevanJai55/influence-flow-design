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
import { useInfluencers } from "@/hooks/useInfluencers";
import { NewInfluencerDialog } from "@/components/NewInfluencerDialog";

export default function Influencers() {
  const { influencers, loading } = useInfluencers();
  const [searchTerm, setSearchTerm] = useState("");

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
    (influencer.category && influencer.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatFollowerCount = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(0)}K`;
    return count.toString();
  };

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
          <NewInfluencerDialog />
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
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground mt-4">Loading influencers...</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredInfluencers.map((influencer) => (
            <Card key={influencer.id} className="transition-smooth hover:shadow-elegant border-border/50">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-gradient-primary text-primary-foreground font-semibold">
                        {influencer.name.split(' ').map(n => n[0]).join('')}
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
                    <div className="text-sm font-medium text-foreground">
                      {formatFollowerCount(influencer.followers_count)}
                    </div>
                    <div className="text-xs text-muted-foreground">Followers</div>
                  </div>
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-center mb-1">
                      <Star className="h-4 w-4 text-golden" />
                    </div>
                    <div className="text-sm font-medium text-foreground">
                      {influencer.engagement_rate.toFixed(1)}%
                    </div>
                    <div className="text-xs text-muted-foreground">Engagement</div>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category:</span>
                    <span className="text-foreground font-medium">{influencer.category || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location:</span>
                    <span className="text-foreground">{influencer.location || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rate:</span>
                    <span className="text-foreground font-medium">
                      {influencer.rate_per_post ? `$${influencer.rate_per_post.toLocaleString()}` : 'Not set'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Platform:</span>
                    <span className="text-foreground capitalize">{influencer.platform}</span>
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
      )}

      {/* Empty State */}
      {!loading && filteredInfluencers.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {searchTerm ? "No influencers found" : "No influencers yet"}
          </h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm 
              ? "Try adjusting your search terms or add new influencers to your network."
              : "Add influencers to your network to get started with your campaigns."
            }
          </p>
          <NewInfluencerDialog />
        </div>
      )}
    </div>
  );
}