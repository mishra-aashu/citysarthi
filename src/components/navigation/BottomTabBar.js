import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

const TABS = [
  { id: 'Home', label: 'Home', icon: 'home', iconOutline: 'home-outline' },
  { id: 'Search', label: 'Vehicles', icon: 'car-sport', iconOutline: 'car-sport-outline' },
  { id: 'Bookings', label: 'Bookings', icon: 'receipt', iconOutline: 'receipt-outline' },
  { id: 'Support', label: 'Support', icon: 'headset', iconOutline: 'headset-outline' },
  { id: 'Profile', label: 'Profile', icon: 'person', iconOutline: 'person-outline' },
];

export default function BottomTabBar({ activeTab, onTabChange }) {
  const { width } = useWindowDimensions();
  const { colors } = useTheme();
  const isDesktop = width >= 768;

  return (
    <View style={[styles.container, { backgroundColor: colors.background, borderTopColor: colors.cardBorder }]}>
      <View
        style={[
          styles.tabBar,
          { backgroundColor: colors.surface },
          isDesktop && [styles.desktopTabBar, { borderColor: colors.cardBorder }],
        ]}
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const iconName = isActive ? tab.icon : tab.iconOutline;

          return (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tabItem,
                isActive && { backgroundColor: 'rgba(37, 99, 235, 0.1)' },
              ]}
              onPress={() => onTabChange(tab.id)}
              activeOpacity={0.7}
            >
              <View style={[styles.iconContainer, isActive && styles.activeIconContainer]}>
                <Ionicons
                  name={iconName}
                  size={22}
                  color={isActive ? colors.primaryLight : colors.textMuted}
                />
                {isActive && <View style={[styles.activeDot, { backgroundColor: colors.primaryLight }]} />}
              </View>
              <Text
                style={[
                  styles.tabLabel,
                  { color: isActive ? colors.primaryLight : colors.textMuted },
                  isActive && styles.activeTabLabel,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
  },
  tabBar: {
    flexDirection: 'row',
    height: Platform.OS === 'ios' ? 74 : 64,
    paddingBottom: Platform.OS === 'ios' ? 16 : 8,
    paddingTop: 8,
    paddingHorizontal: 8,
    justifyContent: 'space-around',
    alignItems: 'center',
    ...Platform.select({
      web: {
        boxShadow: '0px -4px 10px rgba(0, 0, 0, 0.1)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 8,
      },
    }),
  },
  desktopTabBar: {
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
    borderRadius: 16,
    marginBottom: 8,
    borderWidth: 1,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    borderRadius: 12,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: 28,
    width: 28,
  },
  activeIconContainer: {
    transform: [{ scale: 1.05 }],
  },
  activeDot: {
    position: 'absolute',
    bottom: -2,
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 3,
  },
  activeTabLabel: {
    fontWeight: '700',
  },
});
