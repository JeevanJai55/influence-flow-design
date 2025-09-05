import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface Influencer {
  id: string;
  name: string;
  handle: string;
  email?: string;
  phone?: string;
  platform: string;
  followers_count: number;
  engagement_rate: number;
  category?: string;
  location?: string;
  rate_per_post?: number;
  status: string;
  bio?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export const useInfluencers = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInfluencers = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('influencers')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInfluencers(data || []);
    } catch (error) {
      console.error('Error fetching influencers:', error);
      toast({
        title: "Error",
        description: "Failed to fetch influencers",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createInfluencer = async (influencerData: Omit<Influencer, 'id' | 'created_at' | 'updated_at'>) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('influencers')
        .insert([{
          ...influencerData,
          user_id: user.id,
        }])
        .select()
        .single();

      if (error) throw error;
      
      setInfluencers(prev => [data, ...prev]);
      toast({
        title: "Success",
        description: "Influencer added successfully",
      });
      
      return data;
    } catch (error) {
      console.error('Error creating influencer:', error);
      toast({
        title: "Error",
        description: "Failed to add influencer",
        variant: "destructive",
      });
      return null;
    }
  };

  const updateInfluencer = async (id: string, updates: Partial<Influencer>) => {
    try {
      const { data, error } = await supabase
        .from('influencers')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      setInfluencers(prev => prev.map(i => i.id === id ? data : i));
      toast({
        title: "Success",
        description: "Influencer updated successfully",
      });
      
      return data;
    } catch (error) {
      console.error('Error updating influencer:', error);
      toast({
        title: "Error",
        description: "Failed to update influencer",
        variant: "destructive",
      });
      return null;
    }
  };

  const deleteInfluencer = async (id: string) => {
    try {
      const { error } = await supabase
        .from('influencers')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setInfluencers(prev => prev.filter(i => i.id !== id));
      toast({
        title: "Success",
        description: "Influencer removed successfully",
      });
    } catch (error) {
      console.error('Error deleting influencer:', error);
      toast({
        title: "Error",
        description: "Failed to remove influencer",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchInfluencers();
  }, [user]);

  return {
    influencers,
    loading,
    createInfluencer,
    updateInfluencer,
    deleteInfluencer,
    refetch: fetchInfluencers,
  };
};