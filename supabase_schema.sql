-- ====================================================================
-- CitySarthi Complete Supabase Database Schema & Seed Data
-- Run this script in the Supabase SQL Editor (https://supabase.com/dashboard)
-- ====================================================================

-- 1. PROFILES TABLE (Linked with Supabase Auth users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    phone TEXT,
    avatar_url TEXT,
    role TEXT DEFAULT 'customer',
    kyc_status TEXT DEFAULT 'PENDING',
    wallet_balance NUMERIC(10, 2) DEFAULT 1000.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles read access" ON public.profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can edit own profile" ON public.profiles
    FOR ALL USING (auth.uid() = id);

-- 2. VEHICLES CATALOG TABLE
CREATE TABLE IF NOT EXISTS public.vehicles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'self_drive',
    type TEXT DEFAULT 'SUV',
    transmission TEXT DEFAULT 'Automatic',
    fuel_type TEXT DEFAULT 'Petrol',
    seats INT DEFAULT 5,
    is_ac BOOLEAN DEFAULT TRUE,
    ac TEXT DEFAULT 'AC',
    rating NUMERIC(3, 2) DEFAULT 4.8,
    trips_count INT DEFAULT 45,
    price_per_hour NUMERIC(10, 2) NOT NULL DEFAULT 89.00,
    price_per_km NUMERIC(10, 2) DEFAULT 15.00,
    location_name TEXT DEFAULT 'Connaught Place, Delhi (1.2 km away)',
    image_url TEXT NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    driver_name TEXT DEFAULT 'Rajesh Sharma',
    driver_phone TEXT DEFAULT '+91 98765 43210',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for vehicles
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view available vehicles" ON public.vehicles
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert vehicles" ON public.vehicles
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- 3. VEHICLE BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS public.vehicle_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_number TEXT UNIQUE NOT NULL,
    vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE SET NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    trip_type TEXT DEFAULT 'self_drive',
    pickup_location TEXT DEFAULT 'Sector 62 Hub, Noida',
    drop_location TEXT,
    start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    end_date TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '1 day'),
    total_hours INT DEFAULT 24,
    total_price NUMERIC(10, 2) NOT NULL,
    security_deposit NUMERIC(10, 2) DEFAULT 0,
    payment_method TEXT DEFAULT 'online',
    payment_status TEXT DEFAULT 'PAID',
    status TEXT DEFAULT 'CONFIRMED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for vehicle_bookings
ALTER TABLE public.vehicle_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own bookings" ON public.vehicle_bookings
    FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can insert bookings" ON public.vehicle_bookings
    FOR INSERT WITH CHECK (true);

-- 4. SEED SAMPLE VEHICLES CATALOG DATA
INSERT INTO public.vehicles (name, category, type, transmission, fuel_type, seats, is_ac, ac, rating, trips_count, price_per_hour, price_per_km, location_name, image_url, is_available, driver_name, driver_phone)
VALUES
('Hyundai Creta 2023', 'suv', 'SUV', 'Automatic', 'Petrol', 5, true, 'AC', 4.90, 142, 89.00, 18.00, 'Connaught Place, Delhi (1.2 km away)', 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80', true, 'Rajesh Sharma', '+91 98765 43210'),
('Maruti Suzuki Swift', 'self_drive', 'Hatchback', 'Manual', 'CNG', 5, true, 'AC', 4.75, 210, 49.00, 10.00, 'Cyber City, Gurugram (0.8 km away)', 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=600&q=80', true, 'Amit Verma', '+91 98123 45678'),
('Mahindra Thar 4x4', 'suv', 'Adventure SUV', 'Automatic', 'Diesel', 4, true, 'AC', 4.95, 98, 129.00, 22.00, 'Indiranagar, Bengaluru (2.5 km away)', 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80', true, 'Vikram Singh', '+91 97654 32109'),
('Tata Nexon EV Max', 'sedan', 'Electric SUV', 'Automatic', 'Electric', 5, true, 'AC', 4.88, 115, 79.00, 12.00, 'Sector 62 Hub, Noida (0.5 km away)', 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80', true, 'Sunil Kumar', '+91 99887 76655');

-- 5. TRIGGER FOR AUTOMATIC PROFILE CREATION ON USER SIGNUP
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'customer')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
