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

export default function ProfileScreen() {
  return (
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
              <Ionicons name="checkmark-circle" size={12} color={COLORS.success} />
              <Text style={styles.kycText}>Driving License Verified (KYC Done)</Text>
            </View>
          </View>
        </View>

        {/* Wallet Balance Card */}
        <View style={styles.walletCard}>
          <View style={styles.walletLeft}>
            <Text style={styles.walletLabel}>CitySarthi Balance</Text>
            <Text style={styles.walletAmount}>₹1,450.00</Text>
          </View>
          <TouchableOpacity style={styles.addMoneyBtn}>
            <Ionicons name="add-circle" size={16} color={COLORS.white} />
            <Text style={styles.addMoneyText}>Add Money</Text>
          </TouchableOpacity>
        </View>

        {/* Option Sections */}
        <Text style={styles.sectionHeader}>Account & Documents</Text>
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="id-card-outline" size={20} color={COLORS.primaryLight} />
            <Text style={styles.menuText}>Driving License & Verification</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="location-outline" size={20} color={COLORS.primaryLight} />
            <Text style={styles.menuText}>Saved Addresses (Home, Office)</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="card-outline" size={20} color={COLORS.primaryLight} />
            <Text style={styles.menuText}>Payment Methods & UPI IDs</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 0 }]}>
            <Ionicons name="gift-outline" size={20} color={COLORS.accent} />
            <Text style={styles.menuText}>Refer & Earn ₹250 Credits</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionHeader}>App Settings</Text>
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="globe-outline" size={20} color={COLORS.primaryLight} />
            <Text style={styles.menuText}>App Language (Hindi / English)</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 0 }]}>
            <Ionicons name="shield-checkmark-outline" size={20} color={COLORS.primaryLight} />
            <Text style={styles.menuText}>Privacy & Security</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutBtn}>
          <Ionicons name="log-out-outline" size={18} color={COLORS.danger} />
          <Text style={styles.logoutText}>Log Out Account</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: 16, backgroundColor: COLORS.surface, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.06)' },
  title: { fontSize: 22, fontWeight: '800', color: COLORS.textPrimary },
  subtitle: { fontSize: 13, color: COLORS.textSecondary, marginTop: 2 },
  content: { padding: 16 },

  userCard: { flexDirection: 'row', backgroundColor: COLORS.surface, borderRadius: 16, padding: 16, marginBottom: 14, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  avatarCircle: { width: 52, height: 52, borderRadius: 26, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 18, fontWeight: '800', color: COLORS.white },
  userInfo: { flex: 1, marginLeft: 12 },
  userName: { fontSize: 16, fontWeight: '800', color: COLORS.textPrimary },
  userPhone: { fontSize: 11, color: COLORS.textMuted, marginTop: 2 },
  kycBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 },
  kycText: { fontSize: 11, color: COLORS.success, fontWeight: '600' },

  walletCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.surface, borderRadius: 14, padding: 16, marginBottom: 20, borderWidth: 1, borderColor: 'rgba(245, 158, 11, 0.3)' },
  walletLeft: {},
  walletLabel: { fontSize: 11, color: COLORS.textMuted, fontWeight: '600' },
  walletAmount: { fontSize: 22, fontWeight: '900', color: COLORS.accent, marginTop: 2 },
  addMoneyBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.primary, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, gap: 4 },
  addMoneyText: { color: COLORS.white, fontWeight: '700', fontSize: 12 },

  sectionHeader: { fontSize: 14, fontWeight: '700', color: COLORS.textSecondary, marginBottom: 8, marginTop: 4 },
  menuContainer: { backgroundColor: COLORS.surface, borderRadius: 14, marginBottom: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)', overflow: 'hidden' },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 14, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.06)' },
  menuText: { flex: 1, fontSize: 14, fontWeight: '600', color: COLORS.textPrimary, marginLeft: 12 },

  logoutBtn: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(239, 68, 68, 0.1)', paddingVertical: 12, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(239, 68, 68, 0.3)', gap: 8, marginBottom: 20 },
  logoutText: { color: COLORS.danger, fontWeight: '700', fontSize: 14 },
});
