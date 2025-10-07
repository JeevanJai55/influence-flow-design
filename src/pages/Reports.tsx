import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Download,
  Filter,
  Calendar,
  Users,
  Target,
  Eye,
  Heart,
  Share2,
  DollarSign
} from "lucide-react";

export default function Reports() {
  const reportMetrics = [
    {
      title: "Total Reach",
      value: "2.4M",
      change: "+15.3%",
      changeType: "positive",
      icon: Eye
    },
    {
      title: "Engagement Rate",
      value: "8.7%",
      change: "+2.1%",
      changeType: "positive",
      icon: Heart
    },
    {
      title: "Campaign ROI",
      value: "325%",
      change: "+45.2%",
      changeType: "positive",
      icon: TrendingUp
    },
    {
      title: "Cost per Click",
      value: "$1.24",
      change: "-12.8%",
      changeType: "negative",
      icon: DollarSign
    }
  ];

  const campaignReports = [
    {
      id: 1,
      name: "Summer Collection Launch",
      period: "Jul 15 - Aug 15, 2024",
      status: "Completed",
      influencers: 12,
      reach: "1.2M",
      engagement: "9.4%",
      conversions: 1420,
      roi: "380%",
      budget: "$25,000"
    },
    {
      id: 2,
      name: "Beauty Product Review",
      period: "Aug 1 - Aug 30, 2024",
      status: "Active",
      influencers: 8,
      reach: "890K",
      engagement: "7.8%",
      conversions: 892,
      roi: "265%",
      budget: "$15,000"
    },
    {
      id: 3,
      name: "Fitness Challenge",
      period: "Jun 20 - Jul 20, 2024",
      status: "Completed",
      influencers: 15,
      reach: "1.8M",
      engagement: "11.2%",
      conversions: 2134,
      roi: "425%",
      budget: "$30,000"
    }
  ];

  const topPerformers = [
    {
      name: "Sarah Johnson",
      handle: "@sarahjstyle",
      campaigns: 3,
      avgEngagement: "9.2%",
      totalReach: "485K",
      conversions: 1420
    },
    {
      name: "Mike Chen",
      handle: "@mikecfit",
      campaigns: 2,
      avgEngagement: "8.7%",
      totalReach: "312K",
      conversions: 892
    },
    {
      name: "Emma Davis",
      handle: "@emmaeats",
      campaigns: 4,
      avgEngagement: "7.9%",
      totalReach: "623K",
      conversions: 1654
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-500/10 text-green-600 border-green-200";
      case "Active": return "bg-blue-500/10 text-blue-600 border-blue-200";
      case "Scheduled": return "bg-purple-500/10 text-purple-600 border-purple-200";
      default: return "bg-gray-500/10 text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Reports & Analytics</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Comprehensive insights into your influencer marketing performance
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="transition-smooth">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
          <Button variant="outline" className="transition-smooth">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button className="bg-gradient-primary hover:shadow-glow transition-smooth">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {reportMetrics.map((metric, index) => (
          <Card key={index} className="transition-smooth hover:shadow-elegant border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                  <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                  <div className={`flex items-center text-sm ${
                    metric.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {metric.changeType === 'positive' ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    <span>{metric.change}</span>
                  </div>
                </div>
                <metric.icon className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Campaign Performance */}
        <Card className="lg:col-span-2 transition-smooth hover:shadow-elegant border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Campaign Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {campaignReports.map((campaign) => (
              <div key={campaign.id} className="p-4 rounded-lg bg-muted/30 border border-border/30">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-foreground">{campaign.name}</h4>
                    <p className="text-sm text-muted-foreground">{campaign.period}</p>
                  </div>
                  <Badge className={getStatusColor(campaign.status)}>
                    {campaign.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Influencers</p>
                    <p className="font-semibold text-foreground">{campaign.influencers}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Reach</p>
                    <p className="font-semibold text-foreground">{campaign.reach}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Engagement</p>
                    <p className="font-semibold text-green-500">{campaign.engagement}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">ROI</p>
                    <p className="font-semibold text-green-500">{campaign.roi}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/30">
                  <div className="text-sm text-muted-foreground">
                    Budget: {campaign.budget} • Conversions: {campaign.conversions}
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Performers */}
        <Card className="transition-smooth hover:shadow-elegant border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Top Performers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topPerformers.map((performer, index) => (
              <div key={index} className="p-4 rounded-lg bg-muted/30 border border-border/30">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground font-medium text-sm">
                      {performer.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h5 className="font-semibold text-foreground">{performer.name}</h5>
                    <p className="text-xs text-muted-foreground">{performer.handle}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-muted-foreground">Campaigns</p>
                    <p className="font-semibold text-foreground">{performer.campaigns}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Engagement</p>
                    <p className="font-semibold text-green-500">{performer.avgEngagement}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Reach</p>
                    <p className="font-semibold text-foreground">{performer.totalReach}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Conversions</p>
                    <p className="font-semibold text-foreground">{performer.conversions}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Additional Reports */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="transition-smooth hover:shadow-elegant border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground">Platform Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/30">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-pink-500/10 rounded-lg flex items-center justify-center">
                  <span className="text-pink-600 font-semibold">IG</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Instagram</p>
                  <p className="text-sm text-muted-foreground">1.2M reach</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-green-500">8.9%</p>
                <p className="text-xs text-muted-foreground">engagement</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/30">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center">
                  <span className="text-red-600 font-semibold">YT</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">YouTube</p>
                  <p className="text-sm text-muted-foreground">890K reach</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-green-500">12.3%</p>
                <p className="text-xs text-muted-foreground">engagement</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/30">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-black/10 rounded-lg flex items-center justify-center">
                  <span className="text-black font-semibold">TT</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">TikTok</p>
                  <p className="text-sm text-muted-foreground">567K reach</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-green-500">15.7%</p>
                <p className="text-xs text-muted-foreground">engagement</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-smooth hover:shadow-elegant border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground">Content Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 rounded-lg bg-muted/30 border border-border/30">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-foreground">Video Content</p>
                <Badge variant="secondary">67%</Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Avg Engagement: 14.2% • Views: 2.1M</p>
              </div>
            </div>
            
            <div className="p-3 rounded-lg bg-muted/30 border border-border/30">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-foreground">Image Posts</p>
                <Badge variant="secondary">45%</Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Avg Engagement: 8.7% • Views: 1.4M</p>
              </div>
            </div>
            
            <div className="p-3 rounded-lg bg-muted/30 border border-border/30">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-foreground">Stories</p>
                <Badge variant="secondary">23%</Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Avg Engagement: 12.1% • Views: 890K</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}