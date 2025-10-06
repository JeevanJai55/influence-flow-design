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
import { useCampaigns } from "@/hooks/useCampaigns";
import { useInfluencers } from "@/hooks/useInfluencers";
import { NewCampaignDialog } from "@/components/NewCampaignDialog";
import { useNavigate } from "react-router-dom";
import { CampaignsSkeleton } from "@/components/CampaignsSkeleton";

export default function Campaigns() {
  const navigate = useNavigate();
  const { campaigns, loading } = useCampaigns();
  const { influencers } = useInfluencers();

  // Calculate metrics from real data
  const totalBudget = campaigns.reduce((sum, c) => sum + (c.budget || 0), 0);
  const activeCampaigns = campaigns.filter(c => c.status === 'active').length;
  const activeInfluencers = influencers.filter(i => i.status === 'active').length;

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

  if (loading) {
    return <CampaignsSkeleton />;
  }

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
          <Button variant="outline" className="transition-smooth" onClick={() => navigate('/content-calendar')}>
            <Calendar className="h-4 w-4 mr-2" />
            View Calendar
          </Button>
          <NewCampaignDialog />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="transition-smooth hover:shadow-elegant border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-primary" />
              <div>
                <div className="text-2xl font-bold text-foreground">{campaigns.length}</div>
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
                <div className="text-2xl font-bold text-foreground">{activeInfluencers}</div>
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
                <div className="text-2xl font-bold text-foreground">${(totalBudget / 1000).toFixed(0)}K</div>
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
                <div className="text-2xl font-bold text-foreground">
                  {influencers.reduce((sum, i) => sum + i.followers_count, 0) > 1000000 
                    ? `${(influencers.reduce((sum, i) => sum + i.followers_count, 0) / 1000000).toFixed(1)}M` 
                    : `${(influencers.reduce((sum, i) => sum + i.followers_count, 0) / 1000).toFixed(0)}K`}
                </div>
                <p className="text-xs text-muted-foreground">Total Reach</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaigns List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground mt-4">Loading campaigns...</p>
          </div>
        ) : campaigns.length > 0 ? (
          campaigns.map((campaign) => {
            const progress = campaign.status === 'completed' ? 100 : 
                           campaign.status === 'active' ? 75 : 
                           campaign.status === 'planning' ? 25 : 10;
            
            return (
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
                      <p className="text-sm text-muted-foreground">{campaign.description}</p>
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
                      <span className="font-medium text-foreground">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>

                  {/* Campaign Details Grid */}
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Budget</p>
                      <p className="text-sm font-medium text-foreground">
                        ${campaign.budget?.toLocaleString() || 'Not set'}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Goals</p>
                      <p className="text-sm font-medium text-foreground">
                        {campaign.goals?.join(', ') || 'Not set'}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Duration</p>
                      <p className="text-sm font-medium text-foreground">
                        {campaign.start_date && campaign.end_date 
                          ? `${new Date(campaign.start_date).toLocaleDateString()} - ${new Date(campaign.end_date).toLocaleDateString()}`
                          : 'Not set'}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Target Audience</p>
                      <p className="text-sm font-medium text-foreground">
                        {campaign.target_audience || 'Not specified'}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">
                        Created: {new Date(campaign.created_at).toLocaleDateString()}
                      </span>
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
            );
          })
        ) : (
          <div className="text-center py-12">
            <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No campaigns yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first campaign to start your influencer marketing journey.
            </p>
            <NewCampaignDialog />
          </div>
        )}
      </div>
    </div>
  );
}