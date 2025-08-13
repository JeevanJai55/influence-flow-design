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
  Sparkles,
  MessageSquare
} from "lucide-react";

export default function Trending() {
  const trendingHashtags = [
    { tag: "#SummerVibes", posts: "127K", growth: "+45%" },
    { tag: "#TechReview", posts: "89K", growth: "+32%" },
    { tag: "#FitnessJourney", posts: "156K", growth: "+28%" },
    { tag: "#FoodieLife", posts: "234K", growth: "+25%" },
    { tag: "#SustainableFashion", posts: "67K", growth: "+52%" }
  ];

  const trendingNews = [
    {
      id: 1,
      title: "Instagram Introduces New Creator Tools",
      source: "Social Media Today",
      time: "2 hours ago",
      category: "Platform Update",
      engagement: "12.3K"
    },
    {
      id: 2,
      title: "Micro-Influencers Show 3x Higher Engagement",
      source: "Marketing Dive",
      time: "4 hours ago",
      category: "Industry Research",
      engagement: "8.7K"
    },
    {
      id: 3,
      title: "TikTok Partners with Major Beauty Brands",
      source: "Adweek",
      time: "6 hours ago",
      category: "Partnership",
      engagement: "15.2K"
    },
    {
      id: 4,
      title: "New FTC Guidelines for Influencer Marketing",
      source: "Regulatory News",
      time: "1 day ago",
      category: "Regulation",
      engagement: "22.1K"
    }
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
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center">
            <Flame className="h-6 w-6 md:h-8 md:w-8 text-orange-500 mr-2 md:mr-3" />
            Trending Now
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Discover what's hot in influencer marketing right now
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Button variant="outline" className="transition-smooth text-sm md:text-base">
            <Clock className="h-4 w-4 mr-2" />
            Last 24h
          </Button>
          <Button className="bg-gradient-primary hover:shadow-glow transition-smooth text-sm md:text-base">
            <Sparkles className="h-4 w-4 mr-2" />
            Get Insights
          </Button>
        </div>
      </div>

      {/* Trending Overview */}
      <div className="grid gap-4 md:gap-6 lg:grid-cols-4">
        {/* Trending Hashtags */}
        <Card className="transition-smooth hover:shadow-elegant border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-foreground flex items-center text-sm md:text-base">
              <TrendingUp className="h-4 w-4 md:h-5 md:w-5 mr-2" />
              Trending Hashtags
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 md:space-y-3">
            {trendingHashtags.map((hashtag, index) => (
              <div key={index} className="flex items-center justify-between p-2 md:p-3 rounded-lg bg-muted/30 border border-border/30">
                <div>
                  <h4 className="font-semibold text-foreground text-sm">{hashtag.tag}</h4>
                  <p className="text-xs text-muted-foreground">{hashtag.posts} posts</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-green-500 text-xs">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    {hashtag.growth}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Trending News */}
        <Card className="transition-smooth hover:shadow-elegant border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-foreground flex items-center text-sm md:text-base">
              <MessageSquare className="h-4 w-4 md:h-5 md:w-5 mr-2" />
              Industry News
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 md:space-y-3">
            {trendingNews.map((news) => (
              <div key={news.id} className="p-2 md:p-3 rounded-lg bg-muted/30 border border-border/30 hover:bg-muted/50 cursor-pointer transition-colors">
                <h4 className="font-medium text-foreground text-xs md:text-sm mb-1">{news.title}</h4>
                <div className="flex flex-wrap items-center gap-1 md:gap-2 text-xs text-muted-foreground">
                  <span>{news.source}</span>
                  <span>•</span>
                  <span>{news.time}</span>
                  <Badge variant="outline" className="text-xs">{news.category}</Badge>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-green-500">{news.engagement} reactions</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Trending Influencers */}
        <Card className="transition-smooth hover:shadow-elegant border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-foreground flex items-center text-sm md:text-base">
              <Users className="h-4 w-4 md:h-5 md:w-5 mr-2" />
              Rising Stars
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 md:space-y-3">
            {trendingInfluencers.map((influencer, index) => (
              <div key={index} className="flex items-center space-x-2 md:space-x-3 p-2 md:p-3 rounded-lg bg-muted/30 border border-border/30">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-medium text-xs md:text-sm">
                    {influencer.avatar}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground text-xs md:text-sm truncate">{influencer.name}</h4>
                  <p className="text-xs text-muted-foreground truncate">{influencer.handle}</p>
                  <Badge variant="secondary" className="text-xs mt-1">{influencer.category}</Badge>
                </div>
                <div className="text-right">
                  <div className="text-green-500 text-xs font-medium">{influencer.growth}</div>
                  <div className="text-xs text-muted-foreground">{influencer.followers}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="transition-smooth hover:shadow-elegant border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-foreground text-sm md:text-base">Trending Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 md:space-y-4">
            <div className="p-3 md:p-4 rounded-lg bg-gradient-primary/10 border border-primary/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground">Avg Engagement</p>
                  <p className="text-lg md:text-2xl font-bold text-foreground">16.8%</p>
                </div>
                <Heart className="h-6 w-6 md:h-8 md:w-8 text-primary" />
              </div>
            </div>
            <div className="p-3 md:p-4 rounded-lg bg-muted/30 border border-border/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground">Total Views</p>
                  <p className="text-lg md:text-2xl font-bold text-foreground">8.4M</p>
                </div>
                <Eye className="h-6 w-6 md:h-8 md:w-8 text-primary" />
              </div>
            </div>
            <div className="p-3 md:p-4 rounded-lg bg-muted/30 border border-border/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground">Shares</p>
                  <p className="text-lg md:text-2xl font-bold text-foreground">127K</p>
                </div>
                <Share2 className="h-6 w-6 md:h-8 md:w-8 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trending Content */}
      <Card className="transition-smooth hover:shadow-elegant border-border/50">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center text-lg md:text-xl">
            <Flame className="h-5 w-5 mr-2 text-orange-500" />
            Viral Content
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 md:space-y-4">
          {trendingContent.map((content) => (
            <div key={content.id} className="p-4 md:p-6 rounded-lg bg-muted/30 border border-border/30 hover:bg-muted/50 transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2">
                    <h4 className="font-semibold text-foreground text-sm md:text-base">{content.title}</h4>
                    <div className={`flex items-center space-x-1 ${getTrendingScoreColor(content.trending_score)}`}>
                      <Flame className="h-3 w-3 md:h-4 md:w-4" />
                      <span className="text-xs md:text-sm font-medium">{content.trending_score}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-muted-foreground">
                    <span>@{content.creator}</span>
                    <Badge variant="secondary" className="text-xs">{content.platform}</Badge>
                    <Badge variant="outline" className="text-xs">{content.category}</Badge>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4 md:gap-8 text-xs md:text-sm">
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
                  <Button variant="outline" size="sm" className="text-xs md:text-sm">
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