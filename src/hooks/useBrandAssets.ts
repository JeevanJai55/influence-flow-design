import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface BrandAsset {
  id: string;
  name: string;
  type: 'image' | 'video' | 'logo' | 'template' | 'audio' | 'document';
  size: number;
  format: string;
  category: string;
  tags: string[];
  is_favorite: boolean;
  file_url?: string;
  thumbnail_url?: string;
  created_at: string;
  updated_at: string;
}

export const useBrandAssets = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [assets, setAssets] = useState<BrandAsset[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAssets = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('brand_assets')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAssets((data || []) as BrandAsset[]);
    } catch (error) {
      console.error('Error fetching assets:', error);
      toast({
        title: "Error",
        description: "Failed to fetch brand assets",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createAsset = async (assetData: Omit<BrandAsset, 'id' | 'created_at' | 'updated_at'>) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('brand_assets')
        .insert([{
          ...assetData,
          user_id: user.id,
        }])
        .select()
        .single();

      if (error) throw error;
      
      setAssets(prev => [data as BrandAsset, ...prev]);
      toast({
        title: "Success",
        description: "Asset uploaded successfully",
      });
      
      return data;
    } catch (error) {
      console.error('Error creating asset:', error);
      toast({
        title: "Error",
        description: "Failed to upload asset",
        variant: "destructive",
      });
      return null;
    }
  };

  const updateAsset = async (id: string, updates: Partial<BrandAsset>) => {
    try {
      const { data, error } = await supabase
        .from('brand_assets')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      setAssets(prev => prev.map(a => a.id === id ? data as BrandAsset : a));
      toast({
        title: "Success",
        description: "Asset updated successfully",
      });
      
      return data;
    } catch (error) {
      console.error('Error updating asset:', error);
      toast({
        title: "Error",
        description: "Failed to update asset",
        variant: "destructive",
      });
      return null;
    }
  };

  const deleteAsset = async (id: string) => {
    try {
      const { error } = await supabase
        .from('brand_assets')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setAssets(prev => prev.filter(a => a.id !== id));
      toast({
        title: "Success",
        description: "Asset deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting asset:', error);
      toast({
        title: "Error",
        description: "Failed to delete asset",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchAssets();
  }, [user]);

  return {
    assets,
    loading,
    createAsset,
    updateAsset,
    deleteAsset,
    refetch: fetchAssets,
  };
};