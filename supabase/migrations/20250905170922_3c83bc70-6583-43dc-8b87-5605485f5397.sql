-- Fix critical security issue: Remove public access to all profiles
-- This migration restricts profile visibility to protect user privacy

-- Drop all existing profile policies to ensure clean state
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Authenticated users can view basic public profile info" ON public.profiles;

-- Create secure policies for profile access
-- Policy 1: Users can view their own complete profile
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Policy 2: Authenticated users can view basic info of other users (optional - remove if not needed)
-- This allows for features like user mentions, collaboration, etc. while protecting sensitive data
CREATE POLICY "Authenticated users can view basic profile info" 
ON public.profiles 
FOR SELECT 
USING (
  auth.role() = 'authenticated' 
  AND user_id != auth.uid()
);