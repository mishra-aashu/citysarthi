import { Platform } from 'react-native';

export const DARK_COLORS = {
  primary: '#2563EB',      // Deep Royal Blue
  primaryDark: '#1D4ED8',  // Darker Blue
  primaryLight: '#60A5FA', // Light Blue Accent for dark background
  accent: '#F59E0B',       // Amber Accent
  background: '#0F172A',   // Slate Dark
  surface: '#1E293B',      // Card Surface Dark
  surfaceLight: '#334155', // Input/Border Surface Dark
  textPrimary: '#F8FAFC',  // Light Text
  textSecondary: '#94A3B8',
  textMuted: '#64748B',
  success: '#10B981',
  danger: '#EF4444',
  warning: '#F59E0B',
  white: '#FFFFFF',
  black: '#000000',
  glass: 'rgba(30, 41, 59, 0.75)',
  cardBorder: 'rgba(255, 255, 255, 0.08)',
  subtleBorder: 'rgba(255, 255, 255, 0.06)',
  inputBg: '#0F172A',
  tabBarBg: '#1E293B',
  promoBg: '#1E1B4B',
  promoBorder: '#4338CA',
  promoTitle: '#FFFFFF',
  promoDesc: '#C7D2FE',
};

export const LIGHT_COLORS = {
  primary: '#2563EB',      // Deep Royal Blue
  primaryDark: '#1D4ED8',  // Darker Blue
  primaryLight: '#2563EB', // Rich Royal Blue for light mode
  accent: '#D97706',       // Warm Amber Accent
  background: '#F1F5F9',   // Slate 100 - Crisp Clean Light Background
  surface: '#FFFFFF',      // Pure White Card Surface
  surfaceLight: '#E2E8F0', // Slate 200 - Input/Border Surface
  textPrimary: '#0F172A',  // Slate 900 - High-contrast Dark Text
  textSecondary: '#475569',// Slate 600 - Medium Dark Text
  textMuted: '#64748B',    // Slate 500 - Muted Text
  success: '#059669',      // Rich Green
  danger: '#DC2626',       // Rich Red
  warning: '#D97706',
  white: '#FFFFFF',
  black: '#000000',
  glass: 'rgba(255, 255, 255, 0.88)',
  cardBorder: 'rgba(0, 0, 0, 0.08)',
  subtleBorder: 'rgba(0, 0, 0, 0.06)',
  inputBg: '#F8FAFC',
  tabBarBg: '#FFFFFF',
  promoBg: '#EEF2FF',
  promoBorder: '#C7D2FE',
  promoTitle: '#1E1B4B',
  promoDesc: '#4338CA',
};

// Current active color palette reference
export let activeColors = { ...DARK_COLORS };

export function setActiveThemeColors(theme) {
  const target = theme === 'light' ? LIGHT_COLORS : DARK_COLORS;
  Object.assign(activeColors, target);
  Object.assign(COLORS, target);
}

// Proxy object so property access (e.g. COLORS.background) always gets active color
export const COLORS = new Proxy(activeColors, {
  get(target, prop) {
    if (prop in target) return target[prop];
    return DARK_COLORS[prop];
  },
  set(target, prop, value) {
    target[prop] = value;
    return true;
  }
});

export const FONTS = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
  size: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 22,
    xxl: 28,
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const SHADOWS = {
  card: Platform.select({
    web: {
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
    },
    default: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
    },
  }),
};
