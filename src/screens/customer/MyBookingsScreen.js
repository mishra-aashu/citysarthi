import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../../config/theme';

const BOOKINGS = [
  {
    id: 'CS-88392',
    status: 'ONGOING',
    vehicleName: 'Hyundai Creta 2023',
    type: 'Self-Drive Rental',
    startDate: '24 Jul, 10:00 AM',
    endDate: '25 Jul, 10:00 AM',
    pickup: 'Sector 62, Noida Hub',
    amount: '₹2,136',
    otp: '4921',
  },
  {
    id: 'CS-77210',
    status: 'COMPLETED',
    vehicleName: 'Maruti Suzuki Swift',
    type: 'Self-Drive Rental',
    startDate: '20 Jul, 02:00 PM',
    endDate: '21 Jul, 02:00 PM',
    pickup: 'Cyber City, Gurugram',
    amount: '₹1,299',
  },
  {
    id: 'CS-66104',
    status: 'COMPLETED',
    vehicleName: 'Bajaj RE Auto Taxi',
    type: 'Instant Ride',
    startDate: '18 Jul, 08:30 PM',
    endDate: '18 Jul, 09:00 PM',
    pickup: 'Sector 18 Market -> Sector 62',
    amount: '₹145',
  },
];

export default function MyBookingsScreen({ onTrackBooking }) {
  const [activeTab, setActiveTab] = useState('Active'); // 'Active' or 'Past'

  const activeBookings = BOOKINGS.filter((b) => b.status === 'ONGOING' || b.status === 'UPCOMING');
  const pastBookings = BOOKINGS.filter((b) => b.status === 'COMPLETED' || b.status === 'CANCELLED');

  const displayedBookings = activeTab === 'Active' ? activeBookings : pastBookings;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Bookings</Text>
        <Text style={styles.subtitle}>Track active trips, history & download invoices</Text>

        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'Active' && styles.activeTabBtn]}
            onPress={() => setActiveTab('Active')}
          >
            <Text style={[styles.tabText, activeTab === 'Active' && styles.activeTabText]}>
              Active & Upcoming ({activeBookings.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'Past' && styles.activeTabBtn]}
            onPress={() => setActiveTab('Past')}
          >
            <Text style={[styles.tabText, activeTab === 'Past' && styles.activeTabText]}>
              Completed ({pastBookings.length})
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
        {displayedBookings.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="receipt-outline" size={48} color={COLORS.textMuted} />
            <Text style={styles.emptyTitle}>No {activeTab.toLowerCase()} bookings found</Text>
            <Text style={styles.emptyDesc}>Your active and past vehicle rentals will show up here.</Text>
          </View>
        ) : (
          displayedBookings.map((b) => (
            <View key={b.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.bookingId}>ID: {b.id}</Text>
                  <Text style={styles.bookingType}>{b.type}</Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    b.status === 'ONGOING'
                      ? styles.statusOngoing
                      : styles.statusCompleted,
                  ]}
                >
                  <Text style={styles.statusText}>{b.status}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <Text style={styles.vehicleName}>{b.vehicleName}</Text>
              
              <View style={styles.infoRow}>
                <Ionicons name="calendar-outline" size={14} color={COLORS.textMuted} />
                <Text style={styles.infoText}>{b.startDate} → {b.endDate}</Text>
              </View>

              <View style={styles.infoRow}>
                <Ionicons name="location-outline" size={14} color={COLORS.textMuted} />
                <Text style={styles.infoText}>{b.pickup}</Text>
              </View>

              {b.otp && (
                <View style={styles.otpBox}>
                  <Text style={styles.otpLabel}>Start Trip OTP / PIN:</Text>
                  <Text style={styles.otpValue}>{b.otp}</Text>
                </View>
              )}

              <View style={styles.cardFooter}>
                <Text style={styles.amountText}>{b.amount}</Text>

                {b.status === 'ONGOING' ? (
                  <TouchableOpacity
                    style={styles.trackBtn}
                    onPress={() => onTrackBooking && onTrackBooking({ name: b.vehicleName })}
                  >
                    <Ionicons name="navigate" size={14} color={COLORS.white} />
                    <Text style={styles.trackBtnText}>Live Track</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.invoiceBtn}>
                    <Ionicons name="document-text-outline" size={14} color={COLORS.primaryLight} />
                    <Text style={styles.invoiceBtnText}>Invoice</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: 16, backgroundColor: COLORS.surface, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.06)' },
  title: { fontSize: 22, fontWeight: '800', color: COLORS.textPrimary },
  subtitle: { fontSize: 13, color: COLORS.textSecondary, marginTop: 2 },

  tabsContainer: { flexDirection: 'row', backgroundColor: COLORS.background, borderRadius: 10, padding: 3, marginTop: 14 },
  tabBtn: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 8 },
  activeTabBtn: { backgroundColor: COLORS.surface },
  tabText: { fontSize: 12, fontWeight: '600', color: COLORS.textMuted },
  activeTabText: { color: COLORS.primaryLight },

  listContent: { padding: 16 },
  card: { backgroundColor: COLORS.surface, borderRadius: 14, padding: 16, marginBottom: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  bookingId: { fontSize: 13, fontWeight: '700', color: COLORS.textPrimary },
  bookingType: { fontSize: 11, color: COLORS.textMuted },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  statusOngoing: { backgroundColor: 'rgba(16, 185, 129, 0.15)' },
  statusCompleted: { backgroundColor: 'rgba(100, 116, 139, 0.15)' },
  statusText: { fontSize: 10, fontWeight: '800', color: COLORS.success },

  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.06)', marginVertical: 12 },
  vehicleName: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 8 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  infoText: { fontSize: 12, color: COLORS.textSecondary },

  otpBox: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: COLORS.background, padding: 10, borderRadius: 8, marginTop: 8 },
  otpLabel: { fontSize: 12, color: COLORS.textMuted },
  otpValue: { fontSize: 16, fontWeight: '900', color: COLORS.accent, letterSpacing: 2 },

  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, paddingTop: 10, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)' },
  amountText: { fontSize: 18, fontWeight: '800', color: COLORS.primaryLight },
  trackBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.primary, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8, gap: 6 },
  trackBtnText: { color: COLORS.white, fontWeight: '700', fontSize: 13 },
  invoiceBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.background, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6, gap: 4 },
  invoiceBtnText: { color: COLORS.primaryLight, fontSize: 12, fontWeight: '600' },

  emptyState: { alignItems: 'center', justifyContent: 'center', paddingVertical: 40 },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary, marginTop: 12 },
  emptyDesc: { fontSize: 12, color: COLORS.textMuted, marginTop: 4, textAlign: 'center' },
});
