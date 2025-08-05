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

export default function Dashboard() {
  const metrics = [
    {
      title: "Active Influencers",
      value: "247",
      change: "+12% from last month",
      changeType: "positive" as const,
      icon: Users
    },
    {
      title: "Active Campaigns",
      value: "18",
      change: "+3 new this week",
      changeType: "positive" as const,
      icon: Target
    },
    {
      title: "Total ROI",
      value: "$127K",
      change: "+23% from last month",
      changeType: "positive" as const,
      icon: DollarSign
    },
    {
      title: "Engagement Rate",
      value: "8.2%",
      change: "+0.8% from last month",
      changeType: "positive" as const,
      icon: TrendingUp
    }
  ];

  const activeCampaigns = [
    {
      name: "Summer Collection Launch",
      brand: "FashionCo",
      influencers: 12,
      progress: 75,
      status: "In Progress",
      budget: "$25K"
    },
    {
      name: "Beauty Product Review",
      brand: "GlowUp Cosmetics",
      influencers: 8,
      progress: 45,
      status: "Content Creation",
      budget: "$15K"
    },
    {
      name: "Fitness Challenge",
      brand: "ActiveLife",
      influencers: 15,
      progress: 90,
      status: "Publishing",
      budget: "$30K"
    }
  ];

  const topInfluencers = [
    {
      name: "Sarah Johnson",
      handle: "@sarahjstyle",
      followers: "125K",
      engagement: "9.2%",
      avatar: "SJ"
    },
    {
      name: "Mike Chen",
      handle: "@mikecfit",
      followers: "89K",
      engagement: "8.7%",
      avatar: "MC"
    },
    {
      name: "Emma Davis",
      handle: "@emmaeats",
      followers: "156K",
      engagement: "7.9%",
      avatar: "ED"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your campaigns.
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="transition-smooth">
            <Calendar className="h-4 w-4 mr-2" />
            View Calendar
          </Button>
          <Button className="bg-gradient-primary hover:shadow-glow transition-smooth">
            <Plus className="h-4 w-4 mr-2" />
            New Campaign
          </Button>
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
            {activeCampaigns.map((campaign, index) => (
              <div key={index} className="space-y-3 p-4 rounded-lg bg-muted/30 border border-border/30">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-foreground">{campaign.name}</h4>
                    <p className="text-sm text-muted-foreground">{campaign.brand}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {campaign.status}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium text-foreground">{campaign.progress}%</span>
                  </div>
                  <Progress value={campaign.progress} className="h-2" />
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">
                    {campaign.influencers} influencers • {campaign.budget}
                  </span>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Influencers */}
        <Card className="transition-smooth hover:shadow-elegant border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground">Top Performers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topInfluencers.map((influencer, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 rounded-lg bg-muted/30 border border-border/30">
                <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-medium text-sm">
                    {influencer.avatar}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{influencer.name}</h4>
                  <p className="text-sm text-muted-foreground">{influencer.handle}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 text-golden fill-current" />
                    <span className="text-sm font-medium text-foreground">{influencer.engagement}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{influencer.followers} followers</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}