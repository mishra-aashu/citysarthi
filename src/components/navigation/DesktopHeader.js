import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

const NAV_TABS = [
  { id: 'Home', label: 'Home', icon: 'home', iconOutline: 'home-outline' },
  { id: 'Search', label: 'Vehicles', icon: 'car-sport', iconOutline: 'car-sport-outline' },
  { id: 'Bookings', label: 'My Bookings', icon: 'receipt', iconOutline: 'receipt-outline' },
  { id: 'Support', label: 'Support', icon: 'headset', iconOutline: 'headset-outline' },
  { id: 'Profile', label: 'Profile', icon: 'person', iconOutline: 'person-outline' },
];

export default function DesktopHeader({
  activeTab,
  onTabChange,
  userRole = 'CUSTOMER',
  onRoleChange,
  walletBalance = 1450,
}) {
  const { width } = useWindowDimensions();
  const { colors, isDark, toggleTheme } = useTheme();

  if (width < 768) return null; // Only show on desktop

  return (
    <View style={[styles.headerOuter, { backgroundColor: colors.surface, borderBottomColor: colors.cardBorder }]}>
      <View style={styles.headerInner}>
        {/* Left: Brand Logo & Tag */}
        <TouchableOpacity
          style={styles.brandContainer}
          onPress={() => onTabChange && onTabChange('Home')}
          activeOpacity={0.8}
        >
          <View style={[styles.logoIconBg, { backgroundColor: 'rgba(243, 163, 20, 0.15)' }]}>
            <Ionicons name="car-sport" size={24} color={colors.primaryLight} />
          </View>
          <View style={styles.brandTextGroup}>
            <Text style={[styles.brandTitle, { color: colors.textPrimary }]}>
              City<Text style={{ color: colors.primaryLight }}>Sarthi</Text>
            </Text>
            <View style={[styles.mobilityBadge, { backgroundColor: colors.background, borderColor: colors.cardBorder }]}>
              <Text style={[styles.mobilityText, { color: colors.textMuted }]}>SMART MOBILITY</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Center: Navigation Links */}
        <View style={styles.navLinksRow}>
          {NAV_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const iconName = isActive ? tab.icon : tab.iconOutline;

            return (
              <TouchableOpacity
                key={tab.id}
                style={[
                  styles.navItem,
                  isActive && [styles.activeNavItem, { backgroundColor: 'rgba(243, 163, 20, 0.12)', borderColor: colors.primary }],
                ]}
                onPress={() => onTabChange && onTabChange(tab.id)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={iconName}
                  size={18}
                  color={isActive ? colors.primaryLight : colors.textMuted}
                />
                <Text
                  style={[
                    styles.navLabel,
                    { color: isActive ? colors.primaryLight : colors.textSecondary },
                    isActive && styles.activeNavLabel,
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Right: Actions (Role Switcher, Wallet, Theme Toggle, Notifications) */}
        <View style={styles.rightActionsRow}>
          {/* Role Switcher Pill */}
          {onRoleChange && (
            <View style={[styles.rolePillContainer, { backgroundColor: colors.background, borderColor: colors.cardBorder }]}>
              <TouchableOpacity
                style={[styles.roleSubBtn, userRole === 'CUSTOMER' && { backgroundColor: colors.primary }]}
                onPress={() => onRoleChange('CUSTOMER')}
              >
                <Text style={[styles.roleSubText, { color: userRole === 'CUSTOMER' ? '#000' : colors.textMuted }]}>Renter</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.roleSubBtn, userRole === 'HOST' && { backgroundColor: colors.primary }]}
                onPress={() => onRoleChange('HOST')}
              >
                <Text style={[styles.roleSubText, { color: userRole === 'HOST' ? '#000' : colors.textMuted }]}>Host</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.roleSubBtn, userRole === 'DRIVER' && { backgroundColor: colors.primary }]}
                onPress={() => onRoleChange('DRIVER')}
              >
                <Text style={[styles.roleSubText, { color: userRole === 'DRIVER' ? '#000' : colors.textMuted }]}>Driver</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Wallet Balance */}
          <TouchableOpacity
            style={[styles.walletBtn, { backgroundColor: 'rgba(245, 158, 11, 0.12)', borderColor: 'rgba(245, 158, 11, 0.3)' }]}
            onPress={() => onTabChange && onTabChange('Profile')}
          >
            <Ionicons name="wallet-outline" size={16} color={colors.accent} />
            <Text style={[styles.walletAmount, { color: colors.accent }]}>₹{walletBalance.toLocaleString('en-IN')}</Text>
          </TouchableOpacity>

          {/* Dark/Light Theme Toggle */}
          <TouchableOpacity
            style={[styles.actionIconBtn, { backgroundColor: colors.background, borderColor: colors.cardBorder }]}
            onPress={toggleTheme}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <Ionicons
              name={isDark ? "sunny" : "moon"}
              size={18}
              color={isDark ? colors.accent : colors.primaryLight}
            />
          </TouchableOpacity>

          {/* Notifications */}
          <TouchableOpacity
            style={[styles.actionIconBtn, { backgroundColor: colors.background, borderColor: colors.cardBorder }]}
            onPress={() => {}}
          >
            <Ionicons name="notifications-outline" size={18} color={colors.textPrimary} />
            <View style={[styles.notifBadge, { backgroundColor: colors.danger }]} />
          </TouchableOpacity>

          {/* Profile Avatar Button */}
          <TouchableOpacity
            style={[styles.profileAvatarBtn, { backgroundColor: colors.primary }]}
            onPress={() => onTabChange && onTabChange('Profile')}
          >
            <Text style={styles.avatarInitials}>AS</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerOuter: {
    width: '100%',
    borderBottomWidth: 1,
    zIndex: 100,
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.12)',
  },
  headerInner: {
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 70,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoIconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandTextGroup: {
    flexDirection: 'column',
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.3,
  },
  mobilityBadge: {
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
    borderWidth: 1,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
  mobilityText: {
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  navLinksRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'transparent',
    gap: 6,
  },
  activeNavItem: {
    borderWidth: 1,
  },
  navLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
  activeNavLabel: {
    fontWeight: '800',
  },
  rightActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  rolePillContainer: {
    flexDirection: 'row',
    borderRadius: 20,
    padding: 3,
    borderWidth: 1,
    gap: 2,
  },
  roleSubBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
  },
  roleSubText: {
    fontSize: 11,
    fontWeight: '700',
  },
  walletBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    gap: 5,
  },
  walletAmount: {
    fontSize: 13,
    fontWeight: '800',
  },
  actionIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    position: 'relative',
  },
  notifBadge: {
    position: 'absolute',
    top: 7,
    right: 7,
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  profileAvatarBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitials: {
    color: '#000000',
    fontSize: 13,
    fontWeight: '900',
  },
});
