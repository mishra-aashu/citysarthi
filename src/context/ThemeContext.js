import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { LIGHT_COLORS, DARK_COLORS, setActiveThemeColors } from '../config/theme';

const ThemeContext = createContext({
  themeMode: 'system', // 'system' | 'light' | 'dark'
  theme: 'dark', // 'light' | 'dark'
  isDark: true,
  colors: DARK_COLORS,
  setThemeMode: () => {},
  toggleTheme: () => {},
});

const THEME_STORAGE_KEY = 'citysarthi_theme_mode';

export function ThemeProvider({ children }) {
  const systemColorScheme = useColorScheme() || 'dark';
  const [themeMode, setThemeModeState] = useState('system');

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
        if (saved && ['system', 'light', 'dark'].includes(saved)) {
          setThemeModeState(saved);
        }
      }
    } catch (e) {
      console.log('Error loading saved theme:', e);
    }
  }, []);

  const setThemeMode = (mode) => {
    setThemeModeState(mode);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(THEME_STORAGE_KEY, mode);
      }
    } catch (e) {
      console.log('Error saving theme mode:', e);
    }
  };

  const resolvedTheme = themeMode === 'system' ? systemColorScheme : themeMode;
  const isDark = resolvedTheme === 'dark';
  const colors = isDark ? DARK_COLORS : LIGHT_COLORS;

  useEffect(() => {
    setActiveThemeColors(resolvedTheme);
  }, [resolvedTheme]);

  const toggleTheme = () => {
    if (resolvedTheme === 'dark') {
      setThemeMode('light');
    } else {
      setThemeMode('dark');
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        theme: resolvedTheme,
        isDark,
        colors,
        setThemeMode,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
