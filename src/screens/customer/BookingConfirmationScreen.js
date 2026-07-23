import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../config/theme';

export default function BookingConfirmationScreen({ vehicle, onViewLiveTracking, onGoHome }) {
  const vName = vehicle?.name || 'Hyundai Creta 2023';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Ionicons name="checkmark-circle" size={72} color={COLORS.success} />
        </View>

        <Text style={styles.title}>Booking Confirmed!</Text>
        <Text style={styles.subtitle}>Your vehicle is reserved & ready for pickup</Text>

        <View style={styles.card}>
          <Text style={styles.bookingId}>Booking ID: CS-88392</Text>
          <Text style={styles.vehicleTitle}>{vName}</Text>
          
          <View style={styles.otpBox}>
            <Text style={styles.otpLabel}>START TRIP OTP PIN:</Text>
            <Text style={styles.otpValue}>4921</Text>
          </View>
          <Text style={styles.otpNotice}>Show this OTP to hub manager or enter in app to unlock car.</Text>
        </View>

        <TouchableOpacity style={styles.trackBtn} onPress={onViewLiveTracking}>
          <Ionicons name="navigate" size={18} color={COLORS.white} />
          <Text style={styles.trackBtnText}>Track Vehicle / Start Trip</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.homeBtn} onPress={onGoHome}>
          <Text style={styles.homeBtnText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, justifyContent: 'center' },
  content: { padding: 24, alignItems: 'center' },
  iconCircle: { marginBottom: 16 },
  title: { fontSize: 24, fontWeight: '900', color: COLORS.textPrimary },
  subtitle: { fontSize: 13, color: COLORS.textSecondary, marginTop: 4, textAlign: 'center' },

  card: { backgroundColor: COLORS.surface, borderRadius: 16, padding: 20, width: '100%', marginVertical: 24, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  bookingId: { fontSize: 12, fontWeight: '700', color: COLORS.textMuted },
  vehicleTitle: { fontSize: 18, fontWeight: '800', color: COLORS.textPrimary, marginTop: 4 },

  otpBox: { backgroundColor: COLORS.background, borderRadius: 12, paddingHorizontal: 20, paddingVertical: 12, marginTop: 16, alignItems: 'center', borderWidth: 1, borderColor: COLORS.accent },
  otpLabel: { fontSize: 10, fontWeight: '800', color: COLORS.textMuted },
  otpValue: { fontSize: 26, fontWeight: '900', color: COLORS.accent, letterSpacing: 4, marginTop: 2 },
  otpNotice: { fontSize: 11, color: COLORS.textMuted, marginTop: 12, textAlign: 'center' },

  trackBtn: { flexDirection: 'row', backgroundColor: COLORS.primary, width: '100%', paddingVertical: 14, borderRadius: 12, justifyContent: 'center', alignItems: 'center', gap: 8, marginBottom: 12 },
  trackBtnText: { color: COLORS.white, fontWeight: '800', fontSize: 14 },
  homeBtn: { paddingVertical: 10 },
  homeBtnText: { color: COLORS.textSecondary, fontWeight: '600', fontSize: 13 },
});
