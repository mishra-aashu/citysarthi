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

export default function BookingSummaryScreen({ vehicle, onBack, onProceedToPayment }) {
  const v = vehicle || { name: 'Hyundai Creta 2023', price: 89 };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topHeader}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Ionicons name="arrow-back" size={20} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.topHeaderTitle}>Booking Summary</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Vehicle Quick Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{v.name}</Text>
          <Text style={styles.cardSub}>Self-Drive Rental • 24 Hours Trip</Text>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.label}>Pickup Time</Text>
            <Text style={styles.val}>Today, 10:00 AM</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Drop Off Time</Text>
            <Text style={styles.val}>Tomorrow, 10:00 AM</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Pickup Location</Text>
            <Text style={styles.val}>Sector 62 Hub, Noida</Text>
          </View>
        </View>

        {/* Promo Code Box */}
        <View style={styles.promoBox}>
          <Ionicons name="pricetag-outline" size={18} color={COLORS.accent} />
          <Text style={styles.promoText}>Promo Code Applied: CITYSARTHI20 (-₹427)</Text>
          <Ionicons name="checkmark-circle" size={18} color={COLORS.success} />
        </View>

        {/* Bill Details */}
        <Text style={styles.sectionHeader}>Fare Summary</Text>
        <View style={styles.card}>
          <View style={styles.row}><Text style={styles.label}>Base Fare (24 hrs)</Text><Text style={styles.val}>₹2,136</Text></View>
          <View style={styles.row}><Text style={styles.label}>Convenience & Tax</Text><Text style={styles.val}>₹120</Text></View>
          <View style={styles.row}><Text style={styles.label}>Refundable Deposit</Text><Text style={styles.val}>₹1,000</Text></View>
          <View style={styles.row}><Text style={styles.label}>Discount (CITYSARTHI20)</Text><Text style={styles.discountVal}>-₹427</Text></View>
          <View style={styles.divider} />
          <View style={styles.row}><Text style={styles.totalLabel}>Total Amount Payable</Text><Text style={styles.totalVal}>₹2,829</Text></View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.payBtn} onPress={onProceedToPayment}>
          <Text style={styles.payBtnText}>Pay ₹2,829 & Confirm Booking</Text>
          <Ionicons name="shield-checkmark" size={18} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  topHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14, backgroundColor: COLORS.surface, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.06)' },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center' },
  topHeaderTitle: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary },
  content: { padding: 16 },

  card: { backgroundColor: COLORS.surface, borderRadius: 14, padding: 16, marginBottom: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  cardTitle: { fontSize: 18, fontWeight: '800', color: COLORS.textPrimary },
  cardSub: { fontSize: 12, color: COLORS.textMuted, marginTop: 2 },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.06)', marginVertical: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4 },
  label: { fontSize: 13, color: COLORS.textSecondary },
  val: { fontSize: 13, fontWeight: '700', color: COLORS.textPrimary },
  discountVal: { fontSize: 13, fontWeight: '700', color: COLORS.success },
  totalLabel: { fontSize: 15, fontWeight: '800', color: COLORS.textPrimary },
  totalVal: { fontSize: 18, fontWeight: '900', color: COLORS.primaryLight },

  promoBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(245, 158, 11, 0.1)', padding: 12, borderRadius: 12, marginBottom: 16, gap: 8, borderWidth: 1, borderColor: 'rgba(245, 158, 11, 0.2)' },
  promoText: { flex: 1, fontSize: 12, fontWeight: '700', color: COLORS.accent },
  sectionHeader: { fontSize: 15, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 8 },

  bottomBar: { padding: 16, backgroundColor: COLORS.surface, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)' },
  payBtn: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.primary, paddingVertical: 14, borderRadius: 10, gap: 8 },
  payBtnText: { color: COLORS.white, fontWeight: '800', fontSize: 14 },
});
