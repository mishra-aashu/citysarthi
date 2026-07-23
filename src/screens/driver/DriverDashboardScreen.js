import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
  Modal,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ResponsiveContainer from '../../components/common/ResponsiveContainer';
import { useTheme } from '../../context/ThemeContext';

export default function DriverDashboardScreen({ onSwitchRole }) {
  const { colors } = useTheme();
  const [isOnline, setIsOnline] = useState(true);
  const [showRideAlert, setShowRideAlert] = useState(false);
  const [tripAccepted, setTripAccepted] = useState(false);

  const handleAcceptRide = () => {
    setShowRideAlert(false);
    setTripAccepted(true);
    Alert.alert('Ride Accepted! 🚕', 'Navigate to Sector 18 Noida to pick up customer (Aashu). OTP: 8492');
  };

  return (
    <ResponsiveContainer>
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.cardBorder }]}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.title, { color: colors.textPrimary }]}>Driver Captain Portal</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Accept rides, offer chauffeur trips & earn daily
            </Text>
          </View>
          <View style={styles.dutySwitchRow}>
            <Text style={[styles.dutyText, { color: isOnline ? colors.success : colors.textMuted }]}>
              {isOnline ? 'ONLINE' : 'OFFLINE'}
            </Text>
            <Switch value={isOnline} onValueChange={setIsOnline} trackColor={{ false: '#767577', true: colors.success }} />
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {/* Duty Status Banner */}
          <View
            style={[
              styles.dutyBanner,
              {
                backgroundColor: isOnline ? 'rgba(52, 199, 89, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                borderColor: isOnline ? colors.success : colors.danger,
              },
            ]}
          >
            <Ionicons name={isOnline ? "radio-button-on" : "radio-button-off"} size={22} color={isOnline ? colors.success : colors.danger} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={[styles.bannerTitle, { color: isOnline ? colors.success : colors.danger }]}>
                {isOnline ? 'You are Online & Receiving Ride Requests' : 'You are Offline'}
              </Text>
              <Text style={[styles.bannerSub, { color: colors.textSecondary }]}>
                {isOnline ? 'Nearest customer pickup search area: Noida & Delhi NCR' : 'Switch online to start receiving ride alerts'}
              </Text>
            </View>
          </View>

          {/* Today Earnings Card */}
          <View style={[styles.earningsCard, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
            <Text style={[styles.cardLabel, { color: colors.textMuted }]}>TODAY'S DRIVER PAYOUT</Text>
            <Text style={[styles.earningsVal, { color: colors.primaryLight }]}>₹1,840.00</Text>

            <View style={styles.statRow}>
              <View style={styles.statBox}>
                <Text style={[styles.statNum, { color: colors.textPrimary }]}>8</Text>
                <Text style={[styles.statSub, { color: colors.textMuted }]}>Rides Done</Text>
              </View>
              <View style={[styles.statDivider, { backgroundColor: colors.subtleBorder }]} />
              <View style={styles.statBox}>
                <Text style={[styles.statNum, { color: colors.success }]}>₹320</Text>
                <Text style={[styles.statSub, { color: colors.textMuted }]}>Tips & Bonus</Text>
              </View>
              <View style={[styles.statDivider, { backgroundColor: colors.subtleBorder }]} />
              <View style={styles.statBox}>
                <Text style={[styles.statNum, { color: colors.accent }]}>4.96 ★</Text>
                <Text style={[styles.statSub, { color: colors.textMuted }]}>Driver Rating</Text>
              </View>
            </View>
          </View>

          {/* Test Trigger Button for Ride Alert */}
          {isOnline && (
            <TouchableOpacity
              style={[styles.testRideBtn, { backgroundColor: colors.primary }]}
              onPress={() => setShowRideAlert(true)}
            >
              <Ionicons name="notifications" size={20} color="#000000" />
              <Text style={styles.testRideText}>Simulate Incoming Customer Ride Alert</Text>
            </TouchableOpacity>
          )}

          {/* Active Trip Banner if Accepted */}
          {tripAccepted && (
            <View style={[styles.activeTripCard, { backgroundColor: colors.surface, borderColor: colors.primary }]}>
              <View style={styles.tripHead}>
                <Ionicons name="location" size={22} color={colors.primaryLight} />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={[styles.tripCustName, { color: colors.textPrimary }]}>Customer: Aashu Sharma</Text>
                  <Text style={[styles.tripLoc, { color: colors.textMuted }]}>Pickup: Sector 18 Hub, Noida (1.4 km away)</Text>
                </View>
                <View style={[styles.otpPill, { backgroundColor: colors.background }]}>
                  <Text style={[styles.otpText, { color: colors.accent }]}>PIN: 8492</Text>
                </View>
              </View>

              <TouchableOpacity
                style={[styles.startNavBtn, { backgroundColor: colors.success }]}
                onPress={() => Alert.alert('Trip Started 🚗', 'Navigating to drop-off point: Aerocity Delhi')}
              >
                <Ionicons name="navigate-circle" size={20} color="#FFFFFF" />
                <Text style={styles.startNavText}>Start Navigation & Trip</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>

        {/* Incoming Ride Alert Modal */}
        <Modal visible={showRideAlert} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={[styles.rideAlertBox, { backgroundColor: colors.surface, borderColor: colors.primary }]}>
              <View style={styles.alertHeader}>
                <Ionicons name="car-sport" size={32} color={colors.primaryLight} />
                <Text style={[styles.alertTitle, { color: colors.textPrimary }]}>NEW RIDE REQUEST!</Text>
                <Text style={[styles.alertFare, { color: colors.primaryLight }]}>₹480.00</Text>
              </View>

              <View style={[styles.alertDivider, { backgroundColor: colors.subtleBorder }]} />

              <View style={styles.locRow}>
                <Ionicons name="ellipse" size={12} color={colors.success} />
                <Text style={[styles.locText, { color: colors.textPrimary }]}>Pickup: Sector 18, Noida (1.2 km away)</Text>
              </View>
              <View style={styles.locRow}>
                <Ionicons name="location" size={14} color={colors.danger} />
                <Text style={[styles.locText, { color: colors.textPrimary }]}>Drop: Aerocity Terminal 3, Delhi</Text>
              </View>

              <View style={styles.btnRow}>
                <TouchableOpacity
                  style={[styles.declineBtn, { backgroundColor: colors.background, borderColor: colors.cardBorder }]}
                  onPress={() => setShowRideAlert(false)}
                >
                  <Text style={[styles.declineText, { color: colors.textSecondary }]}>Decline</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.acceptBtn, { backgroundColor: colors.primary }]} onPress={handleAcceptRide}>
                  <Text style={styles.acceptText}>ACCEPT RIDE (20s)</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ResponsiveContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1 },
  title: { fontSize: 20, fontWeight: '800' },
  subtitle: { fontSize: 12, marginTop: 2 },
  dutySwitchRow: { alignItems: 'flex-end' },
  dutyText: { fontSize: 10, fontWeight: '900', letterSpacing: 0.5, marginBottom: 2 },
  content: { padding: 16 },

  dutyBanner: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 14, borderWidth: 1, marginBottom: 18 },
  bannerTitle: { fontSize: 13, fontWeight: '800' },
  bannerSub: { fontSize: 11, marginTop: 2 },

  earningsCard: { borderRadius: 16, padding: 18, borderWidth: 1, marginBottom: 20 },
  cardLabel: { fontSize: 10, fontWeight: '800', letterSpacing: 0.8 },
  earningsVal: { fontSize: 32, fontWeight: '900', marginTop: 4 },
  statRow: { flexDirection: 'row', marginTop: 18, paddingTop: 14, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.08)' },
  statBox: { flex: 1, alignItems: 'center' },
  statNum: { fontSize: 16, fontWeight: '800' },
  statSub: { fontSize: 10, marginTop: 2 },
  statDivider: { width: 1, height: '70%', alignSelf: 'center' },

  testRideBtn: { flexDirection: 'row', height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', gap: 8, marginBottom: 16 },
  testRideText: { color: '#000000', fontSize: 14, fontWeight: '800' },

  activeTripCard: { borderRadius: 16, padding: 16, borderWidth: 1.5, marginBottom: 16 },
  tripHead: { flexDirection: 'row', alignItems: 'center' },
  tripCustName: { fontSize: 15, fontWeight: '800' },
  tripLoc: { fontSize: 11, marginTop: 2 },
  otpPill: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  otpText: { fontSize: 12, fontWeight: '900' },
  startNavBtn: { flexDirection: 'row', height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', gap: 6, marginTop: 14 },
  startNavText: { color: '#FFFFFF', fontSize: 13, fontWeight: '800' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', padding: 20 },
  rideAlertBox: { borderRadius: 20, padding: 20, borderWidth: 2 },
  alertHeader: { alignItems: 'center' },
  alertTitle: { fontSize: 16, fontWeight: '900', marginTop: 8 },
  alertFare: { fontSize: 28, fontWeight: '900', marginTop: 4 },
  alertDivider: { height: 1, marginVertical: 14 },
  locRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  locText: { fontSize: 13, fontWeight: '600' },
  btnRow: { flexDirection: 'row', gap: 10, marginTop: 18 },
  declineBtn: { flex: 1, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', borderWidth: 1 },
  declineText: { fontSize: 14, fontWeight: '700' },
  acceptBtn: { flex: 2, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center' },
  acceptText: { color: '#000000', fontSize: 14, fontWeight: '900' },
});
