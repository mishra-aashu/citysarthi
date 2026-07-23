import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ResponsiveContainer from '../../components/common/ResponsiveContainer';
import { useTheme } from '../../context/ThemeContext';

export default function BookingConfirmationScreen({ vehicle, onViewLiveTracking, onGoHome }) {
  const { colors } = useTheme();
  const vName = vehicle?.name || 'Hyundai Creta 2023';

  return (
    <ResponsiveContainer>
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.content}>
          <View style={styles.iconCircle}>
            <Ionicons name="checkmark-circle" size={72} color={colors.success} />
          </View>

          <Text style={[styles.title, { color: colors.textPrimary }]}>Booking Confirmed!</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Your vehicle is reserved & ready for pickup
          </Text>

          <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
            <Text style={[styles.bookingId, { color: colors.textMuted }]}>Booking ID: CS-88392</Text>
            <Text style={[styles.vehicleTitle, { color: colors.textPrimary }]}>{vName}</Text>

            <View style={[styles.otpBox, { backgroundColor: colors.background, borderColor: colors.accent }]}>
              <Text style={[styles.otpLabel, { color: colors.textMuted }]}>START TRIP OTP PIN:</Text>
              <Text style={[styles.otpValue, { color: colors.accent }]}>4921</Text>
            </View>
            <Text style={[styles.otpNotice, { color: colors.textMuted }]}>
              Show this OTP to hub manager or enter in app to unlock car.
            </Text>
          </View>

          <TouchableOpacity style={[styles.trackBtn, { backgroundColor: colors.primary }]} onPress={onViewLiveTracking}>
            <Ionicons name="navigate" size={18} color="#FFFFFF" />
            <Text style={styles.trackBtnText}>Track Vehicle / Start Trip</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.homeBtn} onPress={onGoHome}>
            <Text style={[styles.homeBtnText, { color: colors.textSecondary }]}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ResponsiveContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  content: { padding: 24, alignItems: 'center' },
  iconCircle: { marginBottom: 16 },
  title: { fontSize: 24, fontWeight: '900' },
  subtitle: { fontSize: 13, marginTop: 4, textAlign: 'center' },

  card: { borderRadius: 16, padding: 20, width: '100%', marginVertical: 24, alignItems: 'center', borderWidth: 1 },
  bookingId: { fontSize: 12, fontWeight: '700' },
  vehicleTitle: { fontSize: 18, fontWeight: '800', marginTop: 4 },

  otpBox: { borderRadius: 12, paddingHorizontal: 20, paddingVertical: 12, marginTop: 16, alignItems: 'center', borderWidth: 1 },
  otpLabel: { fontSize: 10, fontWeight: '800' },
  otpValue: { fontSize: 26, fontWeight: '900', letterSpacing: 4, marginTop: 2 },
  otpNotice: { fontSize: 11, marginTop: 12, textAlign: 'center' },

  trackBtn: { flexDirection: 'row', width: '100%', paddingVertical: 14, borderRadius: 12, justifyContent: 'center', alignItems: 'center', gap: 8, marginBottom: 12 },
  trackBtnText: { color: '#FFFFFF', fontWeight: '800', fontSize: 14 },
  homeBtn: { paddingVertical: 10 },
  homeBtnText: { fontWeight: '600', fontSize: 13 },
});
