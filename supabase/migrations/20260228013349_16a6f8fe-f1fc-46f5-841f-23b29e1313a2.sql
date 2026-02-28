
-- 1. Fix adoption_interests: restrict SELECT to relevant parties only
DROP POLICY IF EXISTS "Anyone can view interests on public reports" ON public.adoption_interests;

CREATE POLICY "Restricted adoption interest access"
ON public.adoption_interests FOR SELECT
TO authenticated
USING (
  auth.uid() = user_id
  OR auth.uid() IN (SELECT reporter_id FROM public.rescue_reports WHERE id = report_id)
  OR auth.uid() IN (SELECT assigned_ngo_id FROM public.rescue_reports WHERE id = report_id AND assigned_ngo_id IS NOT NULL)
  OR public.has_role(auth.uid(), 'admin')
);

-- 2. Fix notifications: remove dangerous INSERT policy (triggers handle inserts via SECURITY DEFINER)
DROP POLICY IF EXISTS "Auth users can insert notifications" ON public.notifications;

-- 3. Configure storage bucket limits for report-images
UPDATE storage.buckets
SET file_size_limit = 5242880,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
WHERE id = 'report-images';
