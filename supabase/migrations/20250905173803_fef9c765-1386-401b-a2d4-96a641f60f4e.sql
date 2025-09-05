-- Create tables for production-ready influencer marketing platform

-- Influencers table
CREATE TABLE public.influencers (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id),
  name text NOT NULL,
  handle text NOT NULL,
  email text,
  phone text,
  platform text NOT NULL DEFAULT 'instagram',
  followers_count integer DEFAULT 0,
  engagement_rate decimal(5,2) DEFAULT 0,
  category text,
  location text,
  rate_per_post decimal(10,2),
  status text NOT NULL DEFAULT 'available',
  bio text,
  avatar_url text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Templates table
CREATE TABLE public.templates (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id),
  name text NOT NULL,
  description text,
  category text NOT NULL,
  type text NOT NULL DEFAULT 'post',
  format text NOT NULL DEFAULT 'PSD',
  file_url text,
  thumbnail_url text,
  is_premium boolean DEFAULT false,
  downloads_count integer DEFAULT 0,
  rating decimal(3,2) DEFAULT 0,
  price decimal(10,2) DEFAULT 0,
  tags text[],
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Campaign influencers junction table
CREATE TABLE public.campaign_influencers (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id uuid NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  influencer_id uuid NOT NULL REFERENCES influencers(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'invited',
  rate_agreed decimal(10,2),
  content_delivered_at timestamp with time zone,
  performance_metrics jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(campaign_id, influencer_id)
);

-- Analytics table for tracking performance
CREATE TABLE public.analytics (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id),
  entity_type text NOT NULL, -- 'campaign', 'content', 'influencer'
  entity_id uuid NOT NULL,
  metric_name text NOT NULL,
  metric_value decimal(15,2) NOT NULL,
  recorded_at timestamp with time zone NOT NULL DEFAULT now(),
  metadata jsonb
);

-- Content versions for tracking content iterations
CREATE TABLE public.content_versions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  content_item_id uuid NOT NULL REFERENCES content_items(id) ON DELETE CASCADE,
  version_number integer NOT NULL DEFAULT 1,
  content_url text,
  preview_url text,
  changes_description text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on all new tables
ALTER TABLE public.influencers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_influencers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_versions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for influencers
CREATE POLICY "Users can view their own influencers" 
ON public.influencers FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own influencers" 
ON public.influencers FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own influencers" 
ON public.influencers FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own influencers" 
ON public.influencers FOR DELETE 
USING (auth.uid() = user_id);

-- RLS Policies for templates
CREATE POLICY "All users can view templates" 
ON public.templates FOR SELECT 
USING (true);

CREATE POLICY "Users can create their own templates" 
ON public.templates FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own templates" 
ON public.templates FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own templates" 
ON public.templates FOR DELETE 
USING (auth.uid() = user_id);

-- RLS Policies for campaign_influencers
CREATE POLICY "Users can view campaign influencers for their campaigns" 
ON public.campaign_influencers FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM campaigns 
  WHERE campaigns.id = campaign_influencers.campaign_id 
  AND campaigns.user_id = auth.uid()
));

CREATE POLICY "Users can create campaign influencers for their campaigns" 
ON public.campaign_influencers FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM campaigns 
  WHERE campaigns.id = campaign_influencers.campaign_id 
  AND campaigns.user_id = auth.uid()
));

CREATE POLICY "Users can update campaign influencers for their campaigns" 
ON public.campaign_influencers FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM campaigns 
  WHERE campaigns.id = campaign_influencers.campaign_id 
  AND campaigns.user_id = auth.uid()
));

CREATE POLICY "Users can delete campaign influencers for their campaigns" 
ON public.campaign_influencers FOR DELETE 
USING (EXISTS (
  SELECT 1 FROM campaigns 
  WHERE campaigns.id = campaign_influencers.campaign_id 
  AND campaigns.user_id = auth.uid()
));

-- RLS Policies for analytics
CREATE POLICY "Users can view their own analytics" 
ON public.analytics FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own analytics" 
ON public.analytics FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- RLS Policies for content_versions
CREATE POLICY "Users can view content versions for their content" 
ON public.content_versions FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM content_items 
  WHERE content_items.id = content_versions.content_item_id 
  AND content_items.user_id = auth.uid()
));

CREATE POLICY "Users can create content versions for their content" 
ON public.content_versions FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM content_items 
  WHERE content_items.id = content_versions.content_item_id 
  AND content_items.user_id = auth.uid()
));

-- Add triggers for updated_at columns
CREATE TRIGGER update_influencers_updated_at
  BEFORE UPDATE ON public.influencers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_templates_updated_at
  BEFORE UPDATE ON public.templates
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_influencers_user_id ON public.influencers(user_id);
CREATE INDEX idx_influencers_platform ON public.influencers(platform);
CREATE INDEX idx_influencers_status ON public.influencers(status);
CREATE INDEX idx_templates_category ON public.templates(category);
CREATE INDEX idx_templates_type ON public.templates(type);
CREATE INDEX idx_campaign_influencers_campaign_id ON public.campaign_influencers(campaign_id);
CREATE INDEX idx_campaign_influencers_influencer_id ON public.campaign_influencers(influencer_id);
CREATE INDEX idx_analytics_entity ON public.analytics(entity_type, entity_id);
CREATE INDEX idx_content_versions_content_id ON public.content_versions(content_item_id);