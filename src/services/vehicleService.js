import { supabase } from '../config/supabase';

// Fallback static vehicles list in case DB network is unreachable
export const STATIC_VEHICLES = [
  {
    id: 'v1',
    name: 'Hyundai Creta 2023',
    type: 'SUV',
    category: 'suv',
    transmission: 'Automatic',
    fuel: 'Petrol',
    fuel_type: 'Petrol',
    seats: 5,
    rating: 4.9,
    trips: 142,
    trips_count: 142,
    price: 89,
    price_per_hour: 89,
    price_per_km: 18,
    priceUnit: 'hr',
    location: 'Connaught Place, Delhi (1.2 km away)',
    location_name: 'Connaught Place, Delhi (1.2 km away)',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80',
    image_url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80',
    available: true,
  },
  {
    id: 'v2',
    name: 'Maruti Suzuki Swift',
    type: 'Hatchback',
    category: 'self_drive',
    transmission: 'Manual',
    fuel: 'CNG',
    fuel_type: 'CNG',
    seats: 5,
    rating: 4.7,
    trips: 210,
    trips_count: 210,
    price: 49,
    price_per_hour: 49,
    price_per_km: 10,
    priceUnit: 'hr',
    location: 'Cyber City, Gurugram (0.8 km away)',
    location_name: 'Cyber City, Gurugram (0.8 km away)',
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=600&q=80',
    image_url: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=600&q=80',
    available: true,
  },
  {
    id: 'v3',
    name: 'Mahindra Thar 4x4',
    type: 'Adventure SUV',
    category: 'suv',
    transmission: 'Automatic',
    fuel: 'Diesel',
    fuel_type: 'Diesel',
    seats: 4,
    rating: 4.95,
    trips: 98,
    trips_count: 98,
    price: 129,
    price_per_hour: 129,
    price_per_km: 22,
    priceUnit: 'hr',
    location: 'Indiranagar, Bengaluru (2.5 km away)',
    location_name: 'Indiranagar, Bengaluru (2.5 km away)',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80',
    image_url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80',
    available: true,
  },
];

export const getVehicles = async (options = {}) => {
  const { category, search, tripType } = options;
  try {
    let query = supabase.from('vehicles').select('*');

    if (category && category !== 'all') {
      query = query.eq('category', category);
    }
    if (search) {
      query = query.ilike('name', `%${search}%`);
    }

    const { data, error } = await query;
    if (error) throw error;

    if (data && data.length > 0) {
      return data.map((v) => ({
        id: v.id,
        name: v.name,
        type: v.type,
        category: v.category,
        transmission: v.transmission,
        fuel: v.fuel_type,
        fuel_type: v.fuel_type,
        seats: v.seats || 5,
        ac: v.is_ac === false ? 'Non-AC' : 'AC',
        is_ac: v.is_ac !== false,
        rating: v.rating || 4.8,
        trips: v.trips_count || 50,
        price: Number(v.price_per_hour),
        price_per_hour: Number(v.price_per_hour),
        price_per_km: Number(v.price_per_km),
        priceUnit: tripType === 'ride' ? 'km' : 'hr',
        location: v.location_name || 'City Center (1.0 km away)',
        image: v.image_url,
        available: v.is_available,
        features: v.features || [],
        driver_name: v.driver_name || 'Rajesh Sharma',
        driver_phone: v.driver_phone || '+91 98765 43210',
      }));
    }
  } catch (err) {
    console.warn('Supabase fetch vehicles warning, returning static fallback:', err.message);
  }

  // Filter static list if DB call returned empty or failed
  let filtered = [...STATIC_VEHICLES];
  if (category && category !== 'all') {
    filtered = filtered.filter((v) => v.category === category || v.type.toLowerCase().includes(category.toLowerCase()));
  }
  if (search) {
    filtered = filtered.filter((v) => v.name.toLowerCase().includes(search.toLowerCase()));
  }
  return filtered;
};

export const getVehicleById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    if (data) {
      return {
        id: data.id,
        name: data.name,
        type: data.type,
        category: data.category,
        transmission: data.transmission,
        fuel: data.fuel_type,
        seats: data.seats || 5,
        ac: data.is_ac === false ? 'Non-AC' : 'AC',
        is_ac: data.is_ac !== false,
        rating: data.rating || 4.8,
        trips: data.trips_count || 50,
        price: Number(data.price_per_hour),
        price_per_hour: Number(data.price_per_hour),
        price_per_km: Number(data.price_per_km),
        location: data.location_name || 'City Center',
        image: data.image_url,
        available: data.is_available,
        features: data.features || [],
        driver_name: data.driver_name || 'Rajesh Sharma',
        driver_phone: data.driver_phone || '+91 98765 43210',
      };
    }
  } catch (err) {
    console.warn('Failed to fetch vehicle by ID from Supabase:', err.message);
  }
  return STATIC_VEHICLES.find((v) => v.id === id) || STATIC_VEHICLES[0];
};

export const createVehicle = async (vehicleData) => {
  try {
    const { data, error } = await supabase
      .from('vehicles')
      .insert([vehicleData])
      .select()
      .single();
    if (error) throw error;
    return { success: true, vehicle: data };
  } catch (err) {
    console.error('Error creating vehicle in Supabase:', err.message);
    return { success: false, error: err.message };
  }
};
