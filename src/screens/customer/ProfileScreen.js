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
import { COLORS } from '../../config/theme';
import ResponsiveContainer from '../../components/common/ResponsiveContainer';

export default function ProfileScreen() {
  return (
    <ResponsiveContainer>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Account Profile</Text>
          <Text style={styles.subtitle}>KYC, Wallet, Saved Addresses & Settings</Text>
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {/* User Card */}
          <View style={styles.userCard}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>AS</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>Aashu Sharma</Text>
              <Text style={styles.userPhone}>+91 98765 43210 • aashu@example.com</Text>
              <View style={styles.kycBadge}>
                <Ionicons name="checkmark-seal" size={14} color={COLORS.success} />
                <Text style={styles.kycText}>KYC Verified (Driving License & Aadhaar)</Text>
              </View>
            </View>
          </View>

          {/* Wallet Card */}
          <View style={styles.walletCard}>
            <View>
              <Text style={styles.walletLabel}>CitySarthi Wallet Balance</Text>
              <Text style={styles.walletVal}>₹1,450.00</Text>
            </View>
            <TouchableOpacity style={styles.addMoneyBtn}>
              <Ionicons name="add-circle" size={16} color={COLORS.white} />
              <Text style={styles.addMoneyText}>Add Money</Text>
            </TouchableOpacity>
          </View>

          {/* Menu Sections */}
          <View style={styles.menuGroup}>
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="card-outline" size={20} color={COLORS.primaryLight} />
              <Text style={styles.menuText}>Saved Payment Methods</Text>
              <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="location-outline" size={20} color={COLORS.primaryLight} />
              <Text style={styles.menuText}>Saved Addresses & Locations</Text>
              <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="document-attach-outline" size={20} color={COLORS.primaryLight} />
              <Text style={styles.menuText}>Manage Driving License & KYC</Text>
              <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="gift-outline" size={20} color={COLORS.accent} />
              <Text style={styles.menuText}>Refer & Earn ₹250</Text>
              <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
            </TouchableOpacity>
          </View>

          <View style={styles.menuGroup}>
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="settings-outline" size={20} color={COLORS.textSecondary} />
              <Text style={styles.menuText}>App Settings & Notifications</Text>
              <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="shield-checkmark-outline" size={20} color={COLORS.textSecondary} />
              <Text style={styles.menuText}>Privacy Policy & Terms</Text>
              <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 0 }]}>
              <Ionicons name="log-out-outline" size={20} color={COLORS.danger} />
              <Text style={[styles.menuText, { color: COLORS.danger }]}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ResponsiveContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: 16, backgroundColor: COLORS.surface, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.06)' },
  title: { fontSize: 22, fontWeight: '800', color: COLORS.textPrimary },
  subtitle: { fontSize: 13, color: COLORS.textSecondary, marginTop: 2 },
  content: { padding: 16 },

  userCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, borderRadius: 16, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  avatarCircle: { width: 50, height: 50, borderRadius: 25, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  avatarText: { fontSize: 18, fontWeight: '800', color: COLORS.white },
  userInfo: { flex: 1 },
  userName: { fontSize: 16, fontWeight: '800', color: COLORS.textPrimary },
  userPhone: { fontSize: 11, color: COLORS.textMuted, marginTop: 2 },
  kycBadge: { flexDirection: 'row', alignItems: 'center', marginTop: 6, gap: 4 },
  kycText: { fontSize: 10, fontWeight: '700', color: COLORS.success },

  walletCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(37, 99, 235, 0.12)', borderRadius: 16, padding: 16, marginBottom: 20, borderWidth: 1, borderColor: COLORS.primary },
  walletLabel: { fontSize: 11, color: COLORS.textMuted, fontWeight: '700' },
  walletVal: { fontSize: 22, fontWeight: '900', color: COLORS.primaryLight, marginTop: 2 },
  addMoneyBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.primary, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, gap: 4 },
  addMoneyText: { color: COLORS.white, fontWeight: '700', fontSize: 12 },

  menuGroup: { backgroundColor: COLORS.surface, borderRadius: 16, paddingHorizontal: 14, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.04)' },
  menuText: { flex: 1, fontSize: 14, fontWeight: '600', color: COLORS.textPrimary, marginLeft: 12 },
});
