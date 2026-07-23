import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ResponsiveContainer from '../../components/common/ResponsiveContainer';
import { useTheme } from '../../context/ThemeContext';

export default function ProfileScreen() {
  const { colors, themeMode, setThemeMode, isDark } = useTheme();

  return (
    <ResponsiveContainer>
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.cardBorder }]}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>Account Profile</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            KYC, Wallet, Saved Addresses & Theme Settings
          </Text>
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {/* User Card */}
          <View style={[styles.userCard, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
            <View style={[styles.avatarCircle, { backgroundColor: colors.primary }]}>
              <Text style={styles.avatarText}>AS</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={[styles.userName, { color: colors.textPrimary }]}>Aashu Sharma</Text>
              <Text style={[styles.userPhone, { color: colors.textMuted }]}>
                +91 98765 43210 • aashu@example.com
              </Text>
              <View style={styles.kycBadge}>
                <Ionicons name="checkmark-seal" size={14} color={colors.success} />
                <Text style={[styles.kycText, { color: colors.success }]}>
                  KYC Verified (Driving License & Aadhaar)
                </Text>
              </View>
            </View>
          </View>

          {/* Theme Selector Section */}
          <View style={[styles.themeCard, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
            <View style={styles.themeHeader}>
              <Ionicons name={isDark ? "moon" : "sunny"} size={20} color={colors.primaryLight} />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={[styles.themeTitle, { color: colors.textPrimary }]}>App Appearance & Theme</Text>
                <Text style={[styles.themeSubtitle, { color: colors.textMuted }]}>
                  Choose Light, Dark, or System mode
                </Text>
              </View>
            </View>

            <View style={styles.themeOptionsRow}>
              <TouchableOpacity
                style={[
                  styles.themeOptionBtn,
                  { backgroundColor: colors.background, borderColor: colors.cardBorder },
                  themeMode === 'light' && { backgroundColor: 'rgba(37, 99, 235, 0.12)', borderColor: colors.primary },
                ]}
                onPress={() => setThemeMode('light')}
                activeOpacity={0.8}
              >
                <Ionicons
                  name="sunny-outline"
                  size={18}
                  color={themeMode === 'light' ? colors.primaryLight : colors.textMuted}
                />
                <Text
                  style={[
                    styles.themeOptionText,
                    { color: themeMode === 'light' ? colors.primaryLight : colors.textSecondary },
                    themeMode === 'light' && { fontWeight: '700' },
                  ]}
                >
                  Light Mode
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.themeOptionBtn,
                  { backgroundColor: colors.background, borderColor: colors.cardBorder },
                  themeMode === 'dark' && { backgroundColor: 'rgba(37, 99, 235, 0.12)', borderColor: colors.primary },
                ]}
                onPress={() => setThemeMode('dark')}
                activeOpacity={0.8}
              >
                <Ionicons
                  name="moon-outline"
                  size={18}
                  color={themeMode === 'dark' ? colors.primaryLight : colors.textMuted}
                />
                <Text
                  style={[
                    styles.themeOptionText,
                    { color: themeMode === 'dark' ? colors.primaryLight : colors.textSecondary },
                    themeMode === 'dark' && { fontWeight: '700' },
                  ]}
                >
                  Dark Mode
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.themeOptionBtn,
                  { backgroundColor: colors.background, borderColor: colors.cardBorder },
                  themeMode === 'system' && { backgroundColor: 'rgba(37, 99, 235, 0.12)', borderColor: colors.primary },
                ]}
                onPress={() => setThemeMode('system')}
                activeOpacity={0.8}
              >
                <Ionicons
                  name="phone-portrait-outline"
                  size={18}
                  color={themeMode === 'system' ? colors.primaryLight : colors.textMuted}
                />
                <Text
                  style={[
                    styles.themeOptionText,
                    { color: themeMode === 'system' ? colors.primaryLight : colors.textSecondary },
                    themeMode === 'system' && { fontWeight: '700' },
                  ]}
                >
                  System
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Wallet Card */}
          <View style={[styles.walletCard, { backgroundColor: 'rgba(37, 99, 235, 0.12)', borderColor: colors.primary }]}>
            <View>
              <Text style={[styles.walletLabel, { color: colors.textMuted }]}>CitySarthi Wallet Balance</Text>
              <Text style={[styles.walletVal, { color: colors.primaryLight }]}>₹1,450.00</Text>
            </View>
            <TouchableOpacity style={[styles.addMoneyBtn, { backgroundColor: colors.primary }]}>
              <Ionicons name="add-circle" size={16} color={colors.white} />
              <Text style={styles.addMoneyText}>Add Money</Text>
            </TouchableOpacity>
          </View>

          {/* Menu Sections */}
          <View style={[styles.menuGroup, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
            <TouchableOpacity style={[styles.menuItem, { borderBottomColor: colors.subtleBorder }]}>
              <Ionicons name="card-outline" size={20} color={colors.primaryLight} />
              <Text style={[styles.menuText, { color: colors.textPrimary }]}>Saved Payment Methods</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.menuItem, { borderBottomColor: colors.subtleBorder }]}>
              <Ionicons name="location-outline" size={20} color={colors.primaryLight} />
              <Text style={[styles.menuText, { color: colors.textPrimary }]}>Saved Addresses & Locations</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.menuItem, { borderBottomColor: colors.subtleBorder }]}>
              <Ionicons name="document-attach-outline" size={20} color={colors.primaryLight} />
              <Text style={[styles.menuText, { color: colors.textPrimary }]}>Manage Driving License & KYC</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 0 }]}>
              <Ionicons name="gift-outline" size={20} color={colors.accent} />
              <Text style={[styles.menuText, { color: colors.textPrimary }]}>Refer & Earn ₹250</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </TouchableOpacity>
          </View>

          <View style={[styles.menuGroup, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
            <TouchableOpacity style={[styles.menuItem, { borderBottomColor: colors.subtleBorder }]}>
              <Ionicons name="settings-outline" size={20} color={colors.textSecondary} />
              <Text style={[styles.menuText, { color: colors.textPrimary }]}>App Settings & Notifications</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.menuItem, { borderBottomColor: colors.subtleBorder }]}>
              <Ionicons name="shield-checkmark-outline" size={20} color={colors.textSecondary} />
              <Text style={[styles.menuText, { color: colors.textPrimary }]}>Privacy Policy & Terms</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 0 }]}>
              <Ionicons name="log-out-outline" size={20} color={colors.danger} />
              <Text style={[styles.menuText, { color: colors.danger }]}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ResponsiveContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 16, borderBottomWidth: 1 },
  title: { fontSize: 22, fontWeight: '800' },
  subtitle: { fontSize: 13, marginTop: 2 },
  content: { padding: 16 },

  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  avatarCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  avatarText: { fontSize: 18, fontWeight: '800', color: '#FFFFFF' },
  userInfo: { flex: 1 },
  userName: { fontSize: 16, fontWeight: '800' },
  userPhone: { fontSize: 11, marginTop: 2 },
  kycBadge: { flexDirection: 'row', alignItems: 'center', marginTop: 6, gap: 4 },
  kycText: { fontSize: 10, fontWeight: '700' },

  themeCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  themeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  themeTitle: { fontSize: 15, fontWeight: '700' },
  themeSubtitle: { fontSize: 11, marginTop: 1 },
  themeOptionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  themeOptionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 10,
    borderWidth: 1,
    gap: 6,
  },
  themeOptionText: {
    fontSize: 12,
    fontWeight: '600',
  },

  walletCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
  },
  walletLabel: { fontSize: 11, fontWeight: '700' },
  walletVal: { fontSize: 22, fontWeight: '900', marginTop: 2 },
  addMoneyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    gap: 4,
  },
  addMoneyText: { color: '#FFFFFF', fontWeight: '700', fontSize: 12 },

  menuGroup: {
    borderRadius: 16,
    paddingHorizontal: 14,
    marginBottom: 16,
    borderWidth: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  menuText: { flex: 1, fontSize: 14, fontWeight: '600', marginLeft: 12 },
});
