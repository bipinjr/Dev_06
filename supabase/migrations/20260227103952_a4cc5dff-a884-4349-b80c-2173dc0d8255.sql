
-- Create role enum
CREATE TYPE public.app_role AS ENUM ('user', 'ngo', 'admin');

-- Create report status enum
CREATE TYPE public.report_status AS ENUM ('open', 'in_progress', 'rescued', 'closed');

-- Create support type enum
CREATE TYPE public.support_type AS ENUM ('adopt', 'foster', 'donate_food', 'medical_support');

-- Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT NOT NULL DEFAULT '',
  phone TEXT,
  avatar_url TEXT,
  organization_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- User roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  UNIQUE(user_id, role)
);

-- Rescue reports table
CREATE TABLE public.rescue_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  assigned_ngo_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  animal_type TEXT NOT NULL DEFAULT 'unknown',
  description TEXT NOT NULL,
  condition TEXT NOT NULL DEFAULT '',
  image_urls TEXT[] DEFAULT '{}',
  address TEXT NOT NULL,
  city TEXT NOT NULL DEFAULT 'Bangalore',
  state TEXT NOT NULL DEFAULT 'Karnataka',
  landmark TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  contact_phone TEXT,
  status report_status NOT NULL DEFAULT 'open',
  ngo_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Adoption/support interests
CREATE TABLE public.adoption_interests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID REFERENCES public.rescue_reports(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  support_type support_type NOT NULL,
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(report_id, user_id, support_type)
);

-- Notifications
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'info',
  read BOOLEAN NOT NULL DEFAULT false,
  report_id UUID REFERENCES public.rescue_reports(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rescue_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.adoption_interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Profiles policies
CREATE POLICY "Anyone can view profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

-- User roles policies
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "System can insert roles" ON public.user_roles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Rescue reports policies
CREATE POLICY "Anyone can view reports" ON public.rescue_reports FOR SELECT USING (true);
CREATE POLICY "Auth users can create reports" ON public.rescue_reports FOR INSERT WITH CHECK (auth.uid() = reporter_id);
CREATE POLICY "Reporter or assigned NGO can update" ON public.rescue_reports FOR UPDATE USING (
  auth.uid() = reporter_id 
  OR auth.uid() = assigned_ngo_id 
  OR public.has_role(auth.uid(), 'admin')
);
CREATE POLICY "NGOs can claim open reports" ON public.rescue_reports FOR UPDATE USING (
  public.has_role(auth.uid(), 'ngo')
);

-- Adoption interests policies
CREATE POLICY "Anyone can view interests on public reports" ON public.adoption_interests FOR SELECT USING (true);
CREATE POLICY "Auth users can create interests" ON public.adoption_interests FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own interests" ON public.adoption_interests FOR DELETE USING (auth.uid() = user_id);

-- Notifications policies
CREATE POLICY "Users can view own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "System can insert notifications" ON public.notifications FOR INSERT WITH CHECK (true);

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_rescue_reports_updated_at BEFORE UPDATE ON public.rescue_reports FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Notification trigger on report status change
CREATE OR REPLACE FUNCTION public.notify_on_report_status_change()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    INSERT INTO public.notifications (user_id, title, message, type, report_id)
    VALUES (
      NEW.reporter_id,
      'Report Status Updated',
      'Your report status changed to ' || NEW.status::text,
      'status_change',
      NEW.id
    );
  END IF;
  IF OLD.assigned_ngo_id IS DISTINCT FROM NEW.assigned_ngo_id AND NEW.assigned_ngo_id IS NOT NULL THEN
    INSERT INTO public.notifications (user_id, title, message, type, report_id)
    VALUES (
      NEW.assigned_ngo_id,
      'New Report Assigned',
      'A rescue report has been assigned to you',
      'assignment',
      NEW.id
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_report_status_change
  AFTER UPDATE ON public.rescue_reports
  FOR EACH ROW EXECUTE FUNCTION public.notify_on_report_status_change();

-- Notification trigger on new adoption interest
CREATE OR REPLACE FUNCTION public.notify_on_adoption_interest()
RETURNS TRIGGER AS $$
DECLARE
  _reporter_id UUID;
BEGIN
  SELECT reporter_id INTO _reporter_id FROM public.rescue_reports WHERE id = NEW.report_id;
  IF _reporter_id IS NOT NULL THEN
    INSERT INTO public.notifications (user_id, title, message, type, report_id)
    VALUES (
      _reporter_id,
      'New Support Interest',
      'Someone wants to help with your reported animal (' || NEW.support_type::text || ')',
      'interest',
      NEW.report_id
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_adoption_interest_created
  AFTER INSERT ON public.adoption_interests
  FOR EACH ROW EXECUTE FUNCTION public.notify_on_adoption_interest();

-- Storage bucket for report images
INSERT INTO storage.buckets (id, name, public) VALUES ('report-images', 'report-images', true);

-- Storage policies
CREATE POLICY "Anyone can view report images" ON storage.objects FOR SELECT USING (bucket_id = 'report-images');
CREATE POLICY "Auth users can upload report images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'report-images' AND auth.uid() IS NOT NULL);
CREATE POLICY "Users can delete own images" ON storage.objects FOR DELETE USING (bucket_id = 'report-images' AND auth.uid()::text = (storage.foldername(name))[1]);
