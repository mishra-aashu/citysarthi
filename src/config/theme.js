import { Platform } from 'react-native';

/**
 * CitySarthi High-Contrast Theme System
 * Primary Brand: Golden Amber (#F59E0B / #F4AC1C)
 * Dark Canvas: Deep Midnight Slate (#0F141C / #1A202C)
 * Light Canvas: Warm Creamy Ivory (#FAF8F5 / #FFFFFF)
 */

export const DARK_COLORS = {
  primary: '#F59E0B',        // Vibrant Golden Amber
  primaryDark: '#D97706',    // Deep Amber
  primaryLight: '#FBBF24',   // Bright Gold Accent (High Contrast for Dark Mode)
  accent: '#F59E0B',         // Golden Accent
  background: '#0F141C',     // Ultra-Deep Midnight Slate Canvas
  surface: '#1A202C',        // Elevated Dark Card Surface
  surfaceLight: '#2D3748',   // Input / Border Surface Dark
  textPrimary: '#F8FAFC',    // Pure High-Contrast White Text
  textSecondary: '#CBD5E1',  // Clear Light Slate Secondary Text
  textMuted: '#94A3B8',      // Muted Label Text
  success: '#10B981',
  danger: '#EF4444',
  warning: '#F59E0B',
  white: '#FFFFFF',
  black: '#000000',
  glass: 'rgba(26, 32, 44, 0.88)',
  cardBorder: 'rgba(245, 158, 11, 0.22)',
  subtleBorder: 'rgba(255, 255, 255, 0.08)',
  inputBg: '#0F141C',
  tabBarBg: '#1A202C',
  promoBg: '#281E15',
  promoBorder: '#D97706',
  promoTitle: '#FBBF24',
  promoDesc: '#E2E8F0',
};

export const LIGHT_COLORS = {
  primary: '#F59E0B',        // Vibrant Golden Amber
  primaryDark: '#D97706',    // Deep Amber
  primaryLight: '#B45309',   // High-Contrast Deep Amber Bronze for light mode text & icons
  accent: '#D97706',         // Rich Amber Accent
  background: '#FAF8F5',     // Warm Creamy Ivory Light Canvas
  surface: '#FFFFFF',        // Pure Crisp White Surface
  surfaceLight: '#EDE7DF',   // Input / Border Surface Light
  textPrimary: '#0F172A',    // High-Contrast Dark Slate Text
  textSecondary: '#334155',  // Medium Dark Slate Text
  textMuted: '#64748B',      // Slate Muted Text
  success: '#059669',
  danger: '#DC2626',
  warning: '#D97706',
  white: '#FFFFFF',
  black: '#000000',
  glass: 'rgba(255, 255, 255, 0.92)',
  cardBorder: 'rgba(217, 119, 6, 0.18)',
  subtleBorder: 'rgba(0, 0, 0, 0.08)',
  inputBg: '#F5F1EA',
  tabBarBg: '#FFFFFF',
  promoBg: '#FFF8EE',
  promoBorder: '#F59E0B',
  promoTitle: '#1E160A',
  promoDesc: '#B45309',
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
      boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.12)',
    },
    default: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
      elevation: 6,
    },
  }),
};
