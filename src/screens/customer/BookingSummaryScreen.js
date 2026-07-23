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

export default function BookingSummaryScreen({ vehicle, onBack, onProceedToPayment }) {
  const { colors } = useTheme();
  const v = vehicle || { name: 'Hyundai Creta 2023', price: 89 };

  return (
    <ResponsiveContainer>
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.topHeader, { backgroundColor: colors.surface, borderBottomColor: colors.cardBorder }]}>
          <TouchableOpacity style={[styles.backBtn, { backgroundColor: colors.background }]} onPress={onBack}>
            <Ionicons name="arrow-back" size={20} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={[styles.topHeaderTitle, { color: colors.textPrimary }]}>Booking Summary</Text>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {/* Vehicle Quick Card */}
          <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
            <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>{v.name}</Text>
            <Text style={[styles.cardSub, { color: colors.textMuted }]}>Self-Drive Rental • 24 Hours Trip</Text>
            <View style={[styles.divider, { backgroundColor: colors.subtleBorder }]} />
            <View style={styles.row}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>Pickup Time</Text>
              <Text style={[styles.val, { color: colors.textPrimary }]}>Today, 10:00 AM</Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>Drop Off Time</Text>
              <Text style={[styles.val, { color: colors.textPrimary }]}>Tomorrow, 10:00 AM</Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>Pickup Location</Text>
              <Text style={[styles.val, { color: colors.textPrimary }]}>Sector 62 Hub, Noida</Text>
            </View>
          </View>

          {/* Promo Code Box */}
          <View style={styles.promoBox}>
            <Ionicons name="pricetag-outline" size={18} color={colors.accent} />
            <Text style={[styles.promoText, { color: colors.accent }]}>
              Promo Code Applied: CITYSARTHI20 (-₹427)
            </Text>
            <Ionicons name="checkmark-circle" size={18} color={colors.success} />
          </View>

          {/* Bill Details */}
          <Text style={[styles.sectionHeader, { color: colors.textPrimary }]}>Fare Summary</Text>
          <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
            <View style={styles.row}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>Base Fare (24 hrs)</Text>
              <Text style={[styles.val, { color: colors.textPrimary }]}>₹2,136</Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>Convenience & Tax</Text>
              <Text style={[styles.val, { color: colors.textPrimary }]}>₹120</Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>Refundable Deposit</Text>
              <Text style={[styles.val, { color: colors.textPrimary }]}>₹1,000</Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>Discount (CITYSARTHI20)</Text>
              <Text style={[styles.discountVal, { color: colors.success }]}>-₹427</Text>
            </View>
            <View style={[styles.divider, { backgroundColor: colors.subtleBorder }]} />
            <View style={styles.row}>
              <Text style={[styles.totalLabel, { color: colors.textPrimary }]}>Total Amount Payable</Text>
              <Text style={[styles.totalVal, { color: colors.primaryLight }]}>₹2,829</Text>
            </View>
          </View>
        </ScrollView>

        <View style={[styles.bottomBar, { backgroundColor: colors.surface, borderTopColor: colors.cardBorder }]}>
          <TouchableOpacity style={[styles.payBtn, { backgroundColor: colors.primary }]} onPress={onProceedToPayment}>
            <Text style={styles.payBtnText}>Pay ₹2,829 & Confirm Booking</Text>
            <Ionicons name="shield-checkmark" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ResponsiveContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14, borderBottomWidth: 1 },
  backBtn: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  topHeaderTitle: { fontSize: 16, fontWeight: '700' },
  content: { padding: 16 },

  card: { borderRadius: 14, padding: 16, marginBottom: 14, borderWidth: 1 },
  cardTitle: { fontSize: 18, fontWeight: '800' },
  cardSub: { fontSize: 12, marginTop: 2 },
  divider: { height: 1, marginVertical: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4 },
  label: { fontSize: 13 },
  val: { fontSize: 13, fontWeight: '700' },
  discountVal: { fontSize: 13, fontWeight: '700' },
  totalLabel: { fontSize: 15, fontWeight: '800' },
  totalVal: { fontSize: 18, fontWeight: '900' },

  promoBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(245, 158, 11, 0.1)', padding: 12, borderRadius: 12, marginBottom: 16, gap: 8, borderWidth: 1, borderColor: 'rgba(245, 158, 11, 0.2)' },
  promoText: { flex: 1, fontSize: 12, fontWeight: '700' },
  sectionHeader: { fontSize: 15, fontWeight: '700', marginBottom: 8 },

  bottomBar: { padding: 16, borderTopWidth: 1 },
  payBtn: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 14, borderRadius: 10, gap: 8 },
  payBtnText: { color: '#FFFFFF', fontWeight: '800', fontSize: 14 },
});
