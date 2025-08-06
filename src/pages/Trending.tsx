import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp,
  Flame,
  Eye,
  Heart,
  Share2,
  Users,
  Clock,
  ArrowUp,
  Sparkles
} from "lucide-react";

export default function Trending() {
  const trendingHashtags = [
    { tag: "#SummerVibes", posts: "127K", growth: "+45%" },
    { tag: "#TechReview", posts: "89K", growth: "+32%" },
    { tag: "#FitnessJourney", posts: "156K", growth: "+28%" },
    { tag: "#FoodieLife", posts: "234K", growth: "+25%" },
    { tag: "#SustainableFashion", posts: "67K", growth: "+52%" }
  ];

  const trendingContent = [
    {
      id: 1,
      title: "Ultimate Summer Skincare Routine",
      creator: "BeautyGuru_Sarah",
      platform: "Instagram",
      views: "2.4M",
      engagement: "12.8%",
      growth: "+156%",
      category: "Beauty",
      trending_score: 95
    },
    {
      id: 2,
      title: "Tech Unboxing: Latest Smartphone",
      creator: "TechReviewer_Mike",
      platform: "YouTube",
      views: "1.8M",
      engagement: "15.2%",
      growth: "+134%",
      category: "Technology",
      trending_score: 92
    },
    {
      id: 3,
      title: "30-Day Fitness Challenge",
      creator: "FitLife_Emma",
      platform: "TikTok",
      views: "3.2M",
      engagement: "18.5%",
      growth: "+198%",
      category: "Fitness",
      trending_score: 98
    },
    {
      id: 4,
      title: "Sustainable Fashion Haul",
      creator: "EcoStyle_Alex",
      platform: "Instagram",
      views: "987K",
      engagement: "14.1%",
      growth: "+87%",
      category: "Fashion",
      trending_score: 89
    }
  ];

  const trendingInfluencers = [
    {
      name: "Luna Martinez",
      handle: "@lunastyle",
      avatar: "LM",
      followers: "67K",
      growth: "+342%",
      engagement: "24.5%",
      category: "Lifestyle"
    },
    {
      name: "David Kim",
      handle: "@davidtech",
      avatar: "DK", 
      followers: "89K",
      growth: "+256%",
      engagement: "19.8%",
      category: "Tech"
    },
    {
      name: "Sophia Chen",
      handle: "@sophiacooks",
      avatar: "SC",
      followers: "134K", 
      growth: "+189%",
      engagement: "21.2%",
      category: "Food"
    }
  ];

  const getTrendingScoreColor = (score: number) => {
    if (score >= 95) return "text-red-500";
    if (score >= 90) return "text-orange-500";
    if (score >= 85) return "text-yellow-500";
    return "text-green-500";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center">
            <Flame className="h-8 w-8 text-orange-500 mr-3" />
            Trending Now
          </h1>
          <p className="text-muted-foreground">
            Discover what's hot in influencer marketing right now
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="transition-smooth">
            <Clock className="h-4 w-4 mr-2" />
            Last 24h
          </Button>
          <Button className="bg-gradient-primary hover:shadow-glow transition-smooth">
            <Sparkles className="h-4 w-4 mr-2" />
            Get Insights
          </Button>
        </div>
      </div>

      {/* Trending Overview */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Trending Hashtags */}
        <Card className="transition-smooth hover:shadow-elegant border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Trending Hashtags
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {trendingHashtags.map((hashtag, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/30">
                <div>
                  <h4 className="font-semibold text-foreground">{hashtag.tag}</h4>
                  <p className="text-sm text-muted-foreground">{hashtag.posts} posts</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-green-500 text-sm">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    {hashtag.growth}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Trending Influencers */}
        <Card className="transition-smooth hover:shadow-elegant border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Rising Stars
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {trendingInfluencers.map((influencer, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30 border border-border/30">
                <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-medium text-sm">
                    {influencer.avatar}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{influencer.name}</h4>
                  <p className="text-sm text-muted-foreground">{influencer.handle}</p>
                  <Badge variant="secondary" className="text-xs mt-1">{influencer.category}</Badge>
                </div>
                <div className="text-right">
                  <div className="text-green-500 text-sm font-medium">{influencer.growth}</div>
                  <div className="text-xs text-muted-foreground">{influencer.followers}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="transition-smooth hover:shadow-elegant border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground">Trending Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-gradient-primary/10 border border-primary/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Engagement</p>
                  <p className="text-2xl font-bold text-foreground">16.8%</p>
                </div>
                <Heart className="h-8 w-8 text-primary" />
              </div>
            </div>
            <div className="p-4 rounded-lg bg-muted/30 border border-border/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Views</p>
                  <p className="text-2xl font-bold text-foreground">8.4M</p>
                </div>
                <Eye className="h-8 w-8 text-primary" />
              </div>
            </div>
            <div className="p-4 rounded-lg bg-muted/30 border border-border/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Shares</p>
                  <p className="text-2xl font-bold text-foreground">127K</p>
                </div>
                <Share2 className="h-8 w-8 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trending Content */}
      <Card className="transition-smooth hover:shadow-elegant border-border/50">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center">
            <Flame className="h-5 w-5 mr-2 text-orange-500" />
            Viral Content
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {trendingContent.map((content) => (
            <div key={content.id} className="p-6 rounded-lg bg-muted/30 border border-border/30 hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-semibold text-foreground">{content.title}</h4>
                    <div className={`flex items-center space-x-1 ${getTrendingScoreColor(content.trending_score)}`}>
                      <Flame className="h-4 w-4" />
                      <span className="text-sm font-medium">{content.trending_score}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>@{content.creator}</span>
                    <Badge variant="secondary" className="text-xs">{content.platform}</Badge>
                    <Badge variant="outline" className="text-xs">{content.category}</Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-8 text-sm">
                  <div className="text-center">
                    <p className="text-muted-foreground">Views</p>
                    <p className="font-semibold text-foreground">{content.views}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-muted-foreground">Engagement</p>
                    <p className="font-semibold text-green-500">{content.engagement}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-muted-foreground">Growth</p>
                    <p className="font-semibold text-green-500">{content.growth}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Analyze
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}