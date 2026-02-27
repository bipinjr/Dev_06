
-- Fix the overly permissive notifications INSERT policy
DROP POLICY "System can insert notifications" ON public.notifications;

-- Notifications are inserted by triggers (SECURITY DEFINER), so we restrict direct inserts
CREATE POLICY "Auth users can insert notifications" ON public.notifications 
FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
