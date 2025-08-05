import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Plus, 
  Calendar, 
  Users, 
  DollarSign, 
  Target,
  Eye,
  Edit,
  MoreHorizontal
} from "lucide-react";

export default function Campaigns() {
  const campaigns = [
    {
      id: 1,
      name: "Summer Collection Launch",
      brand: "FashionCo",
      status: "Active",
      progress: 75,
      budget: "$25,000",
      spent: "$18,750",
      influencers: 12,
      startDate: "2024-01-15",
      endDate: "2024-02-15",
      description: "Promoting the latest summer fashion collection with top style influencers",
      platforms: ["Instagram", "TikTok"],
      teamMembers: ["SJ", "MC", "ED"]
    },
    {
      id: 2,
      name: "Beauty Product Review",
      brand: "GlowUp Cosmetics",
      status: "Planning",
      progress: 25,
      budget: "$15,000",
      spent: "$3,750",
      influencers: 8,
      startDate: "2024-02-01",
      endDate: "2024-03-01",
      description: "Authentic reviews of new skincare line by beauty influencers",
      platforms: ["Instagram", "YouTube"],
      teamMembers: ["LP", "AR"]
    },
    {
      id: 3,
      name: "Fitness Challenge",
      brand: "ActiveLife",
      status: "Completed",
      progress: 100,
      budget: "$30,000",
      spent: "$28,500",
      influencers: 15,
      startDate: "2023-12-01",
      endDate: "2024-01-01",
      description: "30-day fitness challenge featuring workout gear and supplements",
      platforms: ["Instagram", "YouTube", "TikTok"],
      teamMembers: ["MC", "DW", "SJ"]
    },
    {
      id: 4,
      name: "Tech Product Launch",
      brand: "TechFlow",
      status: "Draft",
      progress: 10,
      budget: "$40,000",
      spent: "$0",
      influencers: 6,
      startDate: "2024-03-01",
      endDate: "2024-04-01",
      description: "Launching innovative smart home devices with tech reviewers",
      platforms: ["YouTube", "Instagram"],
      teamMembers: ["AR"]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-mint/20 text-mint";
      case "Planning":
        return "bg-primary/20 text-primary";
      case "Completed":
        return "bg-accent/20 text-accent";
      case "Draft":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Campaigns</h1>
          <p className="text-muted-foreground">
            Manage your influencer marketing campaigns from concept to completion.
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

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="transition-smooth hover:shadow-elegant border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-primary" />
              <div>
                <div className="text-2xl font-bold text-foreground">18</div>
                <p className="text-xs text-muted-foreground">Total Campaigns</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="transition-smooth hover:shadow-elegant border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-mint" />
              <div>
                <div className="text-2xl font-bold text-foreground">41</div>
                <p className="text-xs text-muted-foreground">Active Influencers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="transition-smooth hover:shadow-elegant border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-golden" />
              <div>
                <div className="text-2xl font-bold text-foreground">$110K</div>
                <p className="text-xs text-muted-foreground">Total Budget</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="transition-smooth hover:shadow-elegant border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Eye className="h-5 w-5 text-coral" />
              <div>
                <div className="text-2xl font-bold text-foreground">2.1M</div>
                <p className="text-xs text-muted-foreground">Total Reach</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaigns List */}
      <div className="space-y-4">
        {campaigns.map((campaign) => (
          <Card key={campaign.id} className="transition-smooth hover:shadow-elegant border-border/50">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <CardTitle className="text-foreground">{campaign.name}</CardTitle>
                    <Badge className={getStatusColor(campaign.status)}>
                      {campaign.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{campaign.brand}</p>
                  <p className="text-sm text-muted-foreground max-w-2xl">
                    {campaign.description}
                  </p>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Campaign Progress</span>
                  <span className="font-medium text-foreground">{campaign.progress}%</span>
                </div>
                <Progress value={campaign.progress} className="h-2" />
              </div>

              {/* Campaign Details Grid */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Budget & Spend</p>
                  <p className="text-sm font-medium text-foreground">
                    {campaign.spent} / {campaign.budget}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Influencers</p>
                  <p className="text-sm font-medium text-foreground">
                    {campaign.influencers} creators
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Duration</p>
                  <p className="text-sm font-medium text-foreground">
                    {campaign.startDate} - {campaign.endDate}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Platforms</p>
                  <p className="text-sm font-medium text-foreground">
                    {campaign.platforms.join(", ")}
                  </p>
                </div>
              </div>

              {/* Team Members & Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Team:</span>
                  <div className="flex -space-x-2">
                    {campaign.teamMembers.map((member, index) => (
                      <Avatar key={index} className="h-6 w-6 border-2 border-background">
                        <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xs">
                          {member}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}