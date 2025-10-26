-- Create enum for user types
CREATE TYPE public.user_type AS ENUM ('individual', 'fleet');

-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'fleet_manager', 'user');

-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  user_type public.user_type NOT NULL DEFAULT 'individual',
  company_name TEXT,
  fleet_size INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- User roles policies
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

-- Create function to check user role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Create vehicles table for fleet management
CREATE TABLE public.vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fleet_manager_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  vehicle_name TEXT NOT NULL,
  model TEXT NOT NULL,
  license_plate TEXT NOT NULL,
  battery_capacity NUMERIC NOT NULL,
  current_charge NUMERIC DEFAULT 0,
  location TEXT,
  status TEXT DEFAULT 'active',
  last_service_date TIMESTAMP WITH TIME ZONE,
  next_service_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Enable RLS on vehicles
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;

-- Vehicles policies
CREATE POLICY "Fleet managers can view their vehicles"
  ON public.vehicles FOR SELECT
  USING (auth.uid() = fleet_manager_id);

CREATE POLICY "Fleet managers can insert their vehicles"
  ON public.vehicles FOR INSERT
  WITH CHECK (auth.uid() = fleet_manager_id);

CREATE POLICY "Fleet managers can update their vehicles"
  ON public.vehicles FOR UPDATE
  USING (auth.uid() = fleet_manager_id);

CREATE POLICY "Fleet managers can delete their vehicles"
  ON public.vehicles FOR DELETE
  USING (auth.uid() = fleet_manager_id);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, user_type, company_name, fleet_size)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    COALESCE((NEW.raw_user_meta_data->>'user_type')::public.user_type, 'individual'),
    NEW.raw_user_meta_data->>'company_name',
    (NEW.raw_user_meta_data->>'fleet_size')::INTEGER
  );

  -- Assign default role based on user type
  IF (NEW.raw_user_meta_data->>'user_type') = 'fleet' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'fleet_manager');
  ELSE
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'user');
  END IF;

  RETURN NEW;
END;
$$;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_vehicles_updated_at
  BEFORE UPDATE ON public.vehicles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();