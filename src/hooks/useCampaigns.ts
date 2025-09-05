import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface Campaign {
  id: string;
  name: string;
  description?: string;
  brand?: string;
  status: string;
  budget?: number;
  start_date?: string;
  end_date?: string;
  goals?: string[];
  target_audience?: string;
  created_at: string;
  updated_at: string;
}

export const useCampaigns = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCampaigns = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCampaigns(data || []);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      toast({
        title: "Error",
        description: "Failed to fetch campaigns",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createCampaign = async (campaignData: Omit<Campaign, 'id' | 'created_at' | 'updated_at'>) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('campaigns')
        .insert([{
          ...campaignData,
          user_id: user.id,
        }])
        .select()
        .single();

      if (error) throw error;
      
      setCampaigns(prev => [data, ...prev]);
      toast({
        title: "Success",
        description: "Campaign created successfully",
      });
      
      return data;
    } catch (error) {
      console.error('Error creating campaign:', error);
      toast({
        title: "Error",
        description: "Failed to create campaign",
        variant: "destructive",
      });
      return null;
    }
  };

  const updateCampaign = async (id: string, updates: Partial<Campaign>) => {
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      setCampaigns(prev => prev.map(c => c.id === id ? data : c));
      toast({
        title: "Success",
        description: "Campaign updated successfully",
      });
      
      return data;
    } catch (error) {
      console.error('Error updating campaign:', error);
      toast({
        title: "Error",
        description: "Failed to update campaign",
        variant: "destructive",
      });
      return null;
    }
  };

  const deleteCampaign = async (id: string) => {
    try {
      const { error } = await supabase
        .from('campaigns')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setCampaigns(prev => prev.filter(c => c.id !== id));
      toast({
        title: "Success",
        description: "Campaign deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting campaign:', error);
      toast({
        title: "Error",
        description: "Failed to delete campaign",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, [user]);

  return {
    campaigns,
    loading,
    createCampaign,
    updateCampaign,
    deleteCampaign,
    refetch: fetchCampaigns,
  };
};