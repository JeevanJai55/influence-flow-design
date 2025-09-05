import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { useInfluencers } from '@/hooks/useInfluencers';

interface NewInfluencerDialogProps {
  trigger?: React.ReactNode;
}

export const NewInfluencerDialog = ({ trigger }: NewInfluencerDialogProps) => {
  const { createInfluencer } = useInfluencers();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    handle: '',
    email: '',
    phone: '',
    platform: 'instagram',
    followers_count: '',
    engagement_rate: '',
    category: '',
    location: '',
    rate_per_post: '',
    status: 'available',
    bio: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const influencerData = {
      ...formData,
      followers_count: parseInt(formData.followers_count) || 0,
      engagement_rate: parseFloat(formData.engagement_rate) || 0,
      rate_per_post: formData.rate_per_post ? parseFloat(formData.rate_per_post) : undefined,
    };

    const result = await createInfluencer(influencerData);
    if (result) {
      setOpen(false);
      setFormData({
        name: '',
        handle: '',
        email: '',
        phone: '',
        platform: 'instagram',
        followers_count: '',
        engagement_rate: '',
        category: '',
        location: '',
        rate_per_post: '',
        status: 'available',
        bio: '',
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
            Add Influencer
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Influencer</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                placeholder="Sarah Johnson"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="handle">Handle *</Label>
              <Input
                id="handle"
                placeholder="@sarahjstyle"
                value={formData.handle}
                onChange={(e) => setFormData(prev => ({ ...prev, handle: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="sarah@example.com"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="platform">Platform</Label>
              <Select value={formData.platform} onValueChange={(value) => setFormData(prev => ({ ...prev, platform: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="tiktok">TikTok</SelectItem>
                  <SelectItem value="twitter">Twitter</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                placeholder="Fashion, Beauty, Tech, etc."
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="followers_count">Followers</Label>
              <Input
                id="followers_count"
                type="number"
                placeholder="125000"
                value={formData.followers_count}
                onChange={(e) => setFormData(prev => ({ ...prev, followers_count: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="engagement_rate">Engagement Rate (%)</Label>
              <Input
                id="engagement_rate"
                type="number"
                step="0.1"
                placeholder="9.2"
                value={formData.engagement_rate}
                onChange={(e) => setFormData(prev => ({ ...prev, engagement_rate: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rate_per_post">Rate per Post ($)</Label>
              <Input
                id="rate_per_post"
                type="number"
                placeholder="1200"
                value={formData.rate_per_post}
                onChange={(e) => setFormData(prev => ({ ...prev, rate_per_post: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="New York, NY"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="busy">Busy</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Brief description about the influencer..."
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
            />
          </div>

          <div className="flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading || !formData.name || !formData.handle}>
              {loading ? 'Adding...' : 'Add Influencer'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};