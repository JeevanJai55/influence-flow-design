import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Instagram, Youtube, Twitter, Target } from 'lucide-react';
import { useCampaigns } from '@/hooks/useCampaigns';

interface NewCampaignDialogProps {
  trigger?: React.ReactNode;
}

export const NewCampaignDialog = ({ trigger }: NewCampaignDialogProps) => {
  const { createCampaign } = useCampaigns();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    budget: '',
    start_date: '',
    end_date: '',
    status: 'planning',
    target_audience: '',
    goals: [] as string[],
  });

  const platforms = [
    { id: "instagram", name: "Instagram", icon: Instagram },
    { id: "youtube", name: "YouTube", icon: Youtube },
    { id: "twitter", name: "Twitter", icon: Twitter },
    { id: "tiktok", name: "TikTok", icon: Target }
  ];

  const toggleGoal = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal) 
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const campaignData = {
      ...formData,
      budget: formData.budget ? parseFloat(formData.budget) : undefined,
    };

    const result = await createCampaign(campaignData);
    if (result) {
      setOpen(false);
      setFormData({
        name: '',
        description: '',
        budget: '',
        start_date: '',
        end_date: '',
        status: 'planning',
        target_audience: '',
        goals: [],
      });
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-gradient-primary hover:shadow-glow transition-smooth">
            <Plus className="h-4 w-4 mr-2" />
            New Campaign
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Campaign</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Campaign Name *</Label>
              <Input
                id="name"
                placeholder="Summer Collection Launch"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget">Budget ($)</Label>
              <Input
                id="budget"
                type="number"
                placeholder="25000"
                value={formData.budget}
                onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your campaign objectives and key messages..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="start_date">Start Date</Label>
              <Input
                id="start_date"
                type="date"
                value={formData.start_date}
                onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end_date">End Date</Label>
              <Input
                id="end_date"
                type="date"
                value={formData.end_date}
                onChange={(e) => setFormData(prev => ({ ...prev, end_date: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Campaign Goals</Label>
            <div className="flex flex-wrap gap-2">
              {['Brand Awareness', 'Engagement', 'Conversions', 'Reach', 'Traffic'].map((goal) => (
                <Badge
                  key={goal}
                  variant={formData.goals.includes(goal) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleGoal(goal)}
                >
                  {goal}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="target_audience">Target Audience</Label>
            <Textarea
              id="target_audience"
              placeholder="Describe your target audience demographics, interests, and behaviors..."
              value={formData.target_audience}
              onChange={(e) => setFormData(prev => ({ ...prev, target_audience: e.target.value }))}
            />
          </div>

          <div className="flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading || !formData.name}>
              {loading ? 'Creating...' : 'Create Campaign'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};