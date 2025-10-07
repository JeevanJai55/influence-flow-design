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
  const topPosts = [
    {
      id: 1,
      title: "Summer Fashion Trends 2024",
      platform: "Instagram",
      thumbnail: "👗",
      likes: "125K",
      comments: "2.3K",
      shares: "890",
      engagement: "9.2%",
      reach: "1.2M",
      date: "Aug 10",
      creator: "@sarahjstyle",
      category: "Fashion",
      trending: true
    },
    {
      id: 2,
      title: "10-Min Morning Workout",
      platform: "TikTok", 
      thumbnail: "💪",
      likes: "89K",
      comments: "1.8K",  
      shares: "2.1K",
      engagement: "12.7%",
      reach: "850K",
      date: "Aug 8",
      creator: "@mikecfit",
      category: "Fitness",
      trending: true
    },
    {
      id: 3,
      title: "Healthy Breakfast Ideas",
      platform: "YouTube",
      thumbnail: "🥗",
      likes: "156K",
      comments: "3.2K",
      shares: "1.2K", 
      engagement: "8.9%",
      reach: "2.1M",
      date: "Aug 6",
      creator: "@emmaeats",
      category: "Food",
      trending: false
    },
    {
      id: 4,
      title: "Tech Review: AI Gadgets",
      platform: "YouTube",
      thumbnail: "📱",
      likes: "94K",
      comments: "2.8K",
      shares: "1.5K",
      engagement: "11.1%",
      reach: "980K", 
      date: "Aug 5",
      creator: "@alextech",
      category: "Tech",
      trending: true
    }
  ];

  const metrics = [
    {
      title: "Avg Engagement Rate", 
      value: "10.5%",
      change: "+2.8%",
      icon: Heart
    },
    {
      title: "Total Reach",
      value: "5.2M",
      change: "+18.5%", 
      icon: TrendingUp
    },
    {
      title: "Trending Posts",
      value: "3",
      change: "+1",
      icon: Star
    },
    {
      title: "Total Interactions",
      value: "464K",
      change: "+15.3%",
      icon: MessageCircle
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Top Posts</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Your highest-performing content across all platforms
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

      {/* Top Posts List */}
      <Card className="transition-smooth hover:shadow-elegant border-border/50">
        <CardHeader>
          <CardTitle className="text-foreground">Top Performing Posts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {topPosts.map((post, index) => (
            <div key={post.id} className="p-6 rounded-lg bg-muted/30 border border-border/30 hover:bg-muted/50 transition-colors">
              <div className="flex items-start justify-between">
                {/* Post Info */}
                <div className="flex items-start space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-primary">#{index + 1}</span>
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <span className="text-2xl">
                        {post.thumbnail}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-foreground">{post.title}</h4>
                      {post.trending && (
                        <Badge variant="default" className="text-xs bg-red-500">
                          🔥 Trending
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-muted-foreground mb-2">
                      <span>{post.creator}</span>
                      <span>•</span>
                      <span>{post.platform}</span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">{post.category}</Badge>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    View Post
                  </Button>
                  <Button variant="ghost" size="icon">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Metrics */}
              <div className="mt-4 pt-4 border-t border-border/30">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Likes</p>
                    <p className="font-semibold text-foreground">{post.likes}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Comments</p>
                    <p className="font-semibold text-foreground">{post.comments}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Shares</p>
                    <p className="font-semibold text-foreground">{post.shares}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Engagement</p>
                    <p className="font-semibold text-green-500">{post.engagement}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Reach</p>
                    <p className="font-semibold text-foreground">{post.reach}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <Heart className="h-3 w-3 text-red-500" />
                      <MessageCircle className="h-3 w-3 text-blue-500" />
                      <Share2 className="h-3 w-3 text-green-500" />
                    </div>
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