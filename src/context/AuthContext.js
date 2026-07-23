import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../config/supabase';
import { loginWithEmail, signUpWithEmail, logoutUser } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [role, setRole] = useState('CUSTOMER');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Initial Session Check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // 2. Realtime Auth State Listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    const res = await loginWithEmail(email, password);
    if (res.success) {
      setUser(res.user);
      setSession(res.session);
    }
    return res;
  };

  const register = async (email, password, fullName, phone) => {
    const res = await signUpWithEmail(email, password, fullName, phone);
    if (res.success) {
      setUser(res.user);
      setSession(res.session);
    }
    return res;
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        session,
        role,
        setRole,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
