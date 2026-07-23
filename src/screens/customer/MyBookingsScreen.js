import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ResponsiveContainer from '../../components/common/ResponsiveContainer';
import { useTheme } from '../../context/ThemeContext';

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
  const { width } = useWindowDimensions();
  const [activeTab, setActiveTab] = useState('Active'); // 'Active' or 'Past'
  const { colors } = useTheme();
  const isDesktop = width >= 768;

  const activeBookings = BOOKINGS.filter((b) => b.status === 'ONGOING' || b.status === 'UPCOMING');
  const pastBookings = BOOKINGS.filter((b) => b.status === 'COMPLETED' || b.status === 'CANCELLED');

  const displayedBookings = activeTab === 'Active' ? activeBookings : pastBookings;

  return (
    <ResponsiveContainer>
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.cardBorder }]}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>My Bookings</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Track active trips, history & download invoices
          </Text>

          <View style={[styles.tabsContainer, { backgroundColor: colors.background, maxWidth: isDesktop ? 400 : '100%' }]}>
            <TouchableOpacity
              style={[
                styles.tabBtn,
                activeTab === 'Active' && [styles.activeTabBtn, { backgroundColor: colors.surface }],
              ]}
              onPress={() => setActiveTab('Active')}
            >
              <Text
                style={[
                  styles.tabText,
                  { color: colors.textMuted },
                  activeTab === 'Active' && { color: colors.primaryLight, fontWeight: '700' },
                ]}
              >
                Active & Upcoming ({activeBookings.length})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tabBtn,
                activeTab === 'Past' && [styles.activeTabBtn, { backgroundColor: colors.surface }],
              ]}
              onPress={() => setActiveTab('Past')}
            >
              <Text
                style={[
                  styles.tabText,
                  { color: colors.textMuted },
                  activeTab === 'Past' && { color: colors.primaryLight, fontWeight: '700' },
                ]}
              >
                Completed ({pastBookings.length})
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
          {displayedBookings.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="receipt-outline" size={48} color={colors.textMuted} />
              <Text style={[styles.emptyTitle, { color: colors.textPrimary }]}>
                No {activeTab.toLowerCase()} bookings found
              </Text>
              <Text style={[styles.emptyDesc, { color: colors.textMuted }]}>
                Your active and past vehicle rentals will show up here.
              </Text>
            </View>
          ) : (
            <View style={isDesktop ? styles.desktopGrid : null}>
              {displayedBookings.map((b) => (
                <View
                  key={b.id}
                  style={[
                    styles.card,
                    { backgroundColor: colors.surface, borderColor: colors.cardBorder },
                    isDesktop && styles.desktopCard,
                  ]}
                >
                  <View style={styles.cardHeader}>
                    <View>
                      <Text style={[styles.bookingId, { color: colors.textPrimary }]}>ID: {b.id}</Text>
                      <Text style={[styles.bookingType, { color: colors.textMuted }]}>{b.type}</Text>
                    </View>
                    <View
                      style={[
                        styles.statusBadge,
                        b.status === 'ONGOING' ? styles.statusOngoing : styles.statusCompleted,
                      ]}
                    >
                      <Text style={[styles.statusText, { color: b.status === 'ONGOING' ? colors.success : colors.textMuted }]}>
                        {b.status}
                      </Text>
                    </View>
                  </View>

                  <View style={[styles.divider, { backgroundColor: colors.subtleBorder }]} />

                  <Text style={[styles.vehicleName, { color: colors.textPrimary }]}>{b.vehicleName}</Text>

                  <View style={styles.infoRow}>
                    <Ionicons name="calendar-outline" size={14} color={colors.textMuted} />
                    <Text style={[styles.infoText, { color: colors.textSecondary }]}>
                      {b.startDate} → {b.endDate}
                    </Text>
                  </View>

                  <View style={styles.infoRow}>
                    <Ionicons name="location-outline" size={14} color={colors.textMuted} />
                    <Text style={[styles.infoText, { color: colors.textSecondary }]}>{b.pickup}</Text>
                  </View>

                  {b.otp && (
                    <View style={[styles.otpBox, { backgroundColor: colors.background }]}>
                      <Text style={[styles.otpLabel, { color: colors.textMuted }]}>Start Trip OTP / PIN:</Text>
                      <Text style={[styles.otpValue, { color: colors.accent }]}>{b.otp}</Text>
                    </View>
                  )}

                  <View style={[styles.cardFooter, { borderTopColor: colors.subtleBorder }]}>
                    <Text style={[styles.amountText, { color: colors.primaryLight }]}>{b.amount}</Text>

                    {b.status === 'ONGOING' ? (
                      <TouchableOpacity
                        style={[styles.trackBtn, { backgroundColor: colors.primary }]}
                        onPress={() => onTrackBooking && onTrackBooking({ name: b.vehicleName })}
                      >
                        <Ionicons name="navigate" size={14} color="#000000" />
                        <Text style={styles.trackBtnText}>Live Track</Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity style={[styles.invoiceBtn, { backgroundColor: colors.background }]}>
                        <Ionicons name="document-text-outline" size={14} color={colors.primaryLight} />
                        <Text style={[styles.invoiceBtnText, { color: colors.primaryLight }]}>Invoice</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              ))}
            </View>
          )}
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

  tabsContainer: { flexDirection: 'row', borderRadius: 10, padding: 3, marginTop: 14 },
  tabBtn: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 8 },
  activeTabBtn: {},
  tabText: { fontSize: 12, fontWeight: '600' },

  listContent: { padding: 16 },
  card: { borderRadius: 14, padding: 16, marginBottom: 14, borderWidth: 1 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  bookingId: { fontSize: 13, fontWeight: '700' },
  bookingType: { fontSize: 11 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  statusOngoing: { backgroundColor: 'rgba(16, 185, 129, 0.15)' },
  statusCompleted: { backgroundColor: 'rgba(100, 116, 139, 0.15)' },
  statusText: { fontSize: 10, fontWeight: '800' },

  divider: { height: 1, marginVertical: 12 },
  vehicleName: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  infoText: { fontSize: 12 },

  otpBox: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10, borderRadius: 8, marginTop: 8 },
  otpLabel: { fontSize: 12 },
  otpValue: { fontSize: 16, fontWeight: '900', letterSpacing: 2 },

  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, paddingTop: 10, borderTopWidth: 1 },
  amountText: { fontSize: 18, fontWeight: '800' },
  trackBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8, gap: 6 },
  trackBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 13 },
  invoiceBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6, gap: 4 },
  invoiceBtnText: { fontSize: 12, fontWeight: '600' },

  emptyState: { alignItems: 'center', justifyContent: 'center', paddingVertical: 40 },
  emptyTitle: { fontSize: 16, fontWeight: '700', marginTop: 12 },
  emptyDesc: { fontSize: 12, marginTop: 4, textAlign: 'center' },
  desktopGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  desktopCard: {
    flexBasis: '48%',
    flexGrow: 1,
    minWidth: 320,
    marginBottom: 16,
  },
});
