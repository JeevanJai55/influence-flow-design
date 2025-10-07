import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Target, 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  Star,
  ExternalLink,
  Plus
} from "lucide-react";
import { useCampaigns } from "@/hooks/useCampaigns";
import { useInfluencers } from "@/hooks/useInfluencers";
import { useContent } from "@/hooks/useContent";
import { NewCampaignDialog } from "@/components/NewCampaignDialog";
import { useNavigate } from "react-router-dom";
import { DashboardSkeleton } from "@/components/DashboardSkeleton";

export default function Dashboard() {
  const navigate = useNavigate();
  const { campaigns, loading: campaignsLoading } = useCampaigns();
  const { influencers, loading: influencersLoading } = useInfluencers();
  const { contentItems, loading: contentLoading } = useContent();

  const activeCampaigns = campaigns.filter(c => c.status === 'active' || c.status === 'planning').slice(0, 3);
  const topInfluencers = influencers.slice(0, 3);
  
  // Calculate metrics from real data
  const totalBudget = campaigns.reduce((sum, c) => sum + (c.budget || 0), 0);
  const avgEngagement = influencers.length > 0 
    ? influencers.reduce((sum, i) => sum + i.engagement_rate, 0) / influencers.length 
    : 0;

  const metrics = [
    {
      title: "Active Influencers",
      value: influencers.length.toString(),
      change: "+12% from last month",
      changeType: "positive" as const,
      icon: Users
    },
    {
      title: "Active Campaigns",
      value: campaigns.length.toString(),
      change: "+3 new this week",
      changeType: "positive" as const,
      icon: Target
    },
    {
      title: "Total Budget",
      value: `$${(totalBudget / 1000).toFixed(0)}K`,
      change: "+23% from last month",
      changeType: "positive" as const,
      icon: DollarSign
    },
    {
      title: "Avg Engagement",
      value: `${avgEngagement.toFixed(1)}%`,
      change: "+0.8% from last month",
      changeType: "positive" as const,
      icon: TrendingUp
    }
  ];

  const getStatusProgress = (status: string) => {
    switch (status) {
      case 'planning': return 25;
      case 'active': return 75;
      case 'completed': return 100;
      default: return 50;
    }
  };

  if (campaignsLoading || influencersLoading || contentLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Welcome back! Here's what's happening with your campaigns.
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="transition-smooth" onClick={() => navigate('/content-calendar')}>
            <Calendar className="h-4 w-4 mr-2" />
            View Calendar
          </Button>
          <NewCampaignDialog />
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Active Campaigns */}
        <Card className="transition-smooth hover:shadow-elegant border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground">Active Campaigns</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {campaignsLoading ? (
              <div className="text-center py-4">Loading campaigns...</div>
            ) : activeCampaigns.length > 0 ? (
              activeCampaigns.map((campaign) => {
                const progress = getStatusProgress(campaign.status);
                return (
                  <div key={campaign.id} className="space-y-3 p-4 rounded-lg bg-muted/30 border border-border/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-foreground">{campaign.name}</h4>
                        <p className="text-sm text-muted-foreground">{campaign.description}</p>
                      </div>
                      <Badge variant="secondary" className="text-xs capitalize">
                        {campaign.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium text-foreground">{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">
                        Budget: ${campaign.budget?.toLocaleString() || 'Not set'}
                      </span>
                      <Button variant="ghost" size="sm" onClick={() => navigate('/campaigns')}>
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8">
                <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No campaigns yet</h3>
                <p className="text-muted-foreground mb-4">Create your first campaign to get started.</p>
                <NewCampaignDialog />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Top Influencers */}
        <Card className="transition-smooth hover:shadow-elegant border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground">Top Performers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {influencersLoading ? (
              <div className="text-center py-4">Loading influencers...</div>
            ) : topInfluencers.length > 0 ? (
              topInfluencers.map((influencer) => (
                <div key={influencer.id} className="flex items-center space-x-4 p-4 rounded-lg bg-muted/30 border border-border/30">
                  <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground font-medium text-sm">
                      {influencer.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{influencer.name}</h4>
                    <p className="text-sm text-muted-foreground">{influencer.handle}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-golden fill-current" />
                      <span className="text-sm font-medium text-foreground">{influencer.engagement_rate.toFixed(1)}%</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {influencer.followers_count > 1000 
                        ? `${(influencer.followers_count / 1000).toFixed(0)}K` 
                        : influencer.followers_count} followers
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No influencers yet</h3>
                <p className="text-muted-foreground mb-4">Add influencers to your network to get started.</p>
                <Button onClick={() => navigate('/influencers')} className="bg-gradient-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Influencers
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}