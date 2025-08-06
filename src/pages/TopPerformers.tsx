import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Star,
  TrendingUp,
  Users,
  Heart,
  MessageCircle,
  Share2,
  ExternalLink,
  Filter,
  Search
} from "lucide-react";

export default function TopPerformers() {
  const topInfluencers = [
    {
      id: 1,
      name: "Sarah Johnson",
      handle: "@sarahjstyle",
      avatar: "SJ",
      followers: "125K",
      engagement: "9.2%",
      avgLikes: "11.5K",
      avgComments: "420",
      totalCampaigns: 8,
      revenue: "$45K",
      growth: "+15%",
      category: "Fashion",
      verified: true
    },
    {
      id: 2,
      name: "Mike Chen",
      handle: "@mikecfit",
      avatar: "MC",
      followers: "89K",
      engagement: "8.7%",
      avgLikes: "7.8K",
      avgComments: "310",
      totalCampaigns: 12,
      revenue: "$38K",
      growth: "+22%",
      category: "Fitness",
      verified: true
    },
    {
      id: 3,
      name: "Emma Davis",
      handle: "@emmaeats",
      avatar: "ED",
      followers: "156K",
      engagement: "7.9%",
      avgLikes: "12.3K",
      avgComments: "450",
      totalCampaigns: 6,
      revenue: "$52K",
      growth: "+8%",
      category: "Food",
      verified: false
    },
    {
      id: 4,
      name: "Alex Rivera",
      handle: "@alextech",
      avatar: "AR",
      followers: "94K",
      engagement: "10.1%",
      avgLikes: "9.5K",
      avgComments: "380",
      totalCampaigns: 10,
      revenue: "$41K",
      growth: "+18%",
      category: "Tech",
      verified: true
    }
  ];

  const metrics = [
    {
      title: "Avg Engagement Rate",
      value: "8.9%",
      change: "+2.1%",
      icon: Heart
    },
    {
      title: "Total Revenue",
      value: "$176K",
      change: "+15.8%", 
      icon: TrendingUp
    },
    {
      title: "Active Campaigns",
      value: "36",
      change: "+6",
      icon: Star
    },
    {
      title: "Combined Reach",
      value: "464K",
      change: "+12.3%",
      icon: Users
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Top Performers</h1>
          <p className="text-muted-foreground">
            Your highest-performing influencers and their metrics
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="transition-smooth">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" className="transition-smooth">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <Card key={index} className="transition-smooth hover:shadow-elegant border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                  <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                  <p className="text-sm text-green-500 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {metric.change}
                  </p>
                </div>
                <metric.icon className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Top Performers List */}
      <Card className="transition-smooth hover:shadow-elegant border-border/50">
        <CardHeader>
          <CardTitle className="text-foreground">Performance Leaderboard</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {topInfluencers.map((influencer, index) => (
            <div key={influencer.id} className="p-6 rounded-lg bg-muted/30 border border-border/30 hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between">
                {/* Influencer Info */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-primary">#{index + 1}</span>
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground font-medium">
                        {influencer.avatar}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-foreground">{influencer.name}</h4>
                      {influencer.verified && (
                        <Star className="h-4 w-4 text-golden fill-current" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{influencer.handle}</p>
                    <Badge variant="secondary" className="mt-1 text-xs">{influencer.category}</Badge>
                  </div>
                </div>

                {/* Metrics */}
                <div className="flex items-center space-x-8">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Followers</p>
                    <p className="font-semibold text-foreground">{influencer.followers}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Engagement</p>
                    <p className="font-semibold text-green-500">{influencer.engagement}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Campaigns</p>
                    <p className="font-semibold text-foreground">{influencer.totalCampaigns}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Revenue</p>
                    <p className="font-semibold text-foreground">{influencer.revenue}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Growth</p>
                    <p className="font-semibold text-green-500">{influencer.growth}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                  <Button variant="ghost" size="icon">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Additional Stats */}
              <div className="mt-4 pt-4 border-t border-border/30">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Heart className="h-3 w-3" />
                      <span>{influencer.avgLikes} avg likes</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-3 w-3" />
                      <span>{influencer.avgComments} avg comments</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="text-xs">
                      Send Message
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs">
                      Add to Campaign
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}