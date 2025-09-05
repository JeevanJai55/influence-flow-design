import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface ContentItem {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority: string;
  platform: string;
  content_type?: string;
  tags?: string[];
  due_date?: string;
  published_at?: string;
  assignee_id?: string;
  created_at: string;
  updated_at: string;
}

export const useContent = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchContent = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('content_items')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContentItems(data || []);
    } catch (error) {
      console.error('Error fetching content:', error);
      toast({
        title: "Error",
        description: "Failed to fetch content",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createContent = async (contentData: Omit<ContentItem, 'id' | 'created_at' | 'updated_at'>) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('content_items')
        .insert([{
          ...contentData,
          user_id: user.id,
        }])
        .select()
        .single();

      if (error) throw error;
      
      setContentItems(prev => [data, ...prev]);
      toast({
        title: "Success",
        description: "Content created successfully",
      });
      
      return data;
    } catch (error) {
      console.error('Error creating content:', error);
      toast({
        title: "Error",
        description: "Failed to create content",
        variant: "destructive",
      });
      return null;
    }
  };

  const updateContent = async (id: string, updates: Partial<ContentItem>) => {
    try {
      const { data, error } = await supabase
        .from('content_items')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      setContentItems(prev => prev.map(c => c.id === id ? data : c));
      toast({
        title: "Success",
        description: "Content updated successfully",
      });
      
      return data;
    } catch (error) {
      console.error('Error updating content:', error);
      toast({
        title: "Error",
        description: "Failed to update content",
        variant: "destructive",
      });
      return null;
    }
  };

  const deleteContent = async (id: string) => {
    try {
      const { error } = await supabase
        .from('content_items')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setContentItems(prev => prev.filter(c => c.id !== id));
      toast({
        title: "Success",
        description: "Content deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting content:', error);
      toast({
        title: "Error",
        description: "Failed to delete content",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchContent();
  }, [user]);

  return {
    contentItems,
    loading,
    createContent,
    updateContent,
    deleteContent,
    refetch: fetchContent,
  };
};