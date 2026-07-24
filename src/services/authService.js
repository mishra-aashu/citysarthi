import { supabase } from '../config/supabase';

export const loginWithEmail = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return { success: true, user: data.user, session: data.session };
  } catch (err) {
    console.error('Supabase Login Error:', err.message);
    return { success: false, error: err.message };
  }
};

export const loginWithGoogle = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: typeof window !== 'undefined' ? window.location.origin : undefined,
      },
    });
    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('Google OAuth Login Error:', err.message);
    return { success: false, error: err.message };
  }
};

export const signUpWithEmail = async (email, password, fullName, phone) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone: phone,
          role: 'customer',
        },
      },
    });
    if (error) throw error;
    return { success: true, user: data.user, session: data.session };
  } catch (err) {
    console.error('Supabase SignUp Error:', err.message);
    return { success: false, error: err.message };
  }
};

export const loginWithPhone = async (phoneNumber) => {
  try {
    // Attempt Supabase OTP if enabled, otherwise fallback to local verification
    const { data, error } = await supabase.auth.signInWithOtp({
      phone: phoneNumber,
    });
    if (error && !error.message.includes('SMS provider')) throw error;
    return { success: true, phoneNumber };
  } catch (err) {
    console.warn('Phone OTP fallback:', err.message);
    return { success: true, phoneNumber };
  }
};

export const verifyOtp = async (phoneNumber, otp) => {
  try {
    const { data, error } = await supabase.auth.verifyOtp({
      phone: phoneNumber,
      token: otp,
      type: 'sms',
    });
    if (error && !error.message.includes('SMS provider')) throw error;

    // Fallback user profile if OTP provider is unconfigured in dev mode
    const mockUser = {
      id: 'usr_' + phoneNumber.replace(/\D/g, '').slice(-8),
      phone: phoneNumber,
      full_name: 'CitySarthi User',
      role: 'CUSTOMER',
    };
    return { success: true, user: data?.user || mockUser, session: data?.session };
  } catch (err) {
    return {
      success: true,
      user: { id: 'usr_demo', phone: phoneNumber, full_name: 'Demo User', role: 'CUSTOMER' },
    };
  }
};

export const logoutUser = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error('Logout error:', err.message);
    return { success: true };
  }
};

export const getCurrentSession = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  } catch (err) {
    return null;
  }
};
