import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ResponsiveContainer from '../../components/common/ResponsiveContainer';
import { useTheme } from '../../context/ThemeContext';

export default function LiveTrackingScreen({ vehicle, onBack }) {
  const { colors, isDark } = useTheme();
  const [isLocked, setIsLocked] = useState(true);
  const vName = vehicle?.name || 'Hyundai Creta 2023';

  const toggleLock = () => {
    const nextState = !isLocked;
    setIsLocked(nextState);
    Alert.alert(
      nextState ? 'Vehicle Locked 🔒' : 'Vehicle Unlocked 🔓',
      nextState ? 'Remote door locks engaged successfully.' : 'Remote door locks disengaged. Have a safe drive!'
    );
  };

  return (
    <ResponsiveContainer>
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.topHeader, { backgroundColor: colors.surface, borderBottomColor: colors.cardBorder }]}>
          <TouchableOpacity style={[styles.backBtn, { backgroundColor: colors.background }]} onPress={onBack}>
            <Ionicons name="arrow-back" size={20} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={[styles.topHeaderTitle, { color: colors.textPrimary }]}>Live GPS & Vehicle Telematics</Text>
          <View style={{ width: 36 }} />
        </View>

        {/* Map View Graphic */}
        <View style={[styles.mapContainer, { backgroundColor: isDark ? '#0B132B' : '#E2E8F0' }]}>
          <View style={styles.mapGraphic}>
            <View style={styles.carPulseCircle}>
              <Ionicons name="car-sport" size={32} color="#000000" />
            </View>
            <Text style={[styles.mapPinLabel, { backgroundColor: colors.surface, color: colors.textPrimary, borderColor: colors.cardBorder }]}>
              {vName} • Moving at 45 km/h
            </Text>
          </View>

          {/* Telematics Bar */}
          <View style={[styles.telematicsCard, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
            <View style={styles.telemItem}>
              <Ionicons name="speedometer-outline" size={20} color={colors.primaryLight} />
              <Text style={[styles.telemVal, { color: colors.textPrimary }]}>45 km/h</Text>
              <Text style={[styles.telemSub, { color: colors.textMuted }]}>CURRENT SPEED</Text>
            </View>

            <View style={[styles.telemDivider, { backgroundColor: colors.subtleBorder }]} />

            <View style={styles.telemItem}>
              <Ionicons name="water-outline" size={20} color={colors.primaryLight} />
              <Text style={[styles.telemVal, { color: colors.textPrimary }]}>85% (CNG/Petrol)</Text>
              <Text style={[styles.telemSub, { color: colors.textMuted }]}>FUEL TANK</Text>
            </View>

            <View style={[styles.telemDivider, { backgroundColor: colors.subtleBorder }]} />

            <View style={styles.telemItem}>
              <Ionicons name="location-outline" size={20} color={colors.primaryLight} />
              <Text style={[styles.telemVal, { color: colors.textPrimary }]}>Noida Sec 62</Text>
              <Text style={[styles.telemSub, { color: colors.textMuted }]}>PICKUP HUB</Text>
            </View>
          </View>

          {/* Live Trip Status Drawer */}
          <View style={[styles.tripDrawer, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
            <View style={styles.drawerHeader}>
              <View>
                <Text style={[styles.vehicleTitle, { color: colors.textPrimary }]}>{vName}</Text>
                <Text style={[styles.statusText, { color: colors.textMuted }]}>
                  Trip Status: <Text style={{ color: colors.success }}>ACTIVE (TRIP #CS-88392)</Text>
                </Text>
              </View>
              <TouchableOpacity
                style={[styles.lockBtn, { backgroundColor: isLocked ? colors.primary : colors.success }]}
                onPress={toggleLock}
              >
                <Ionicons name={isLocked ? "lock-closed" : "lock-open"} size={16} color="#000000" />
                <Text style={styles.lockBtnText}>{isLocked ? 'Locked' : 'Unlocked'}</Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.divider, { backgroundColor: colors.subtleBorder }]} />

            <View style={styles.actionsRow}>
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: colors.background, borderColor: colors.cardBorder }]}
                onPress={() => Alert.alert('Hub Manager', 'Calling Sector 62 Support Hub at +91 99990 00000')}
              >
                <Ionicons name="call" size={18} color={colors.primaryLight} />
                <Text style={[styles.actionBtnText, { color: colors.textPrimary }]}>Call Support</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: colors.background, borderColor: colors.cardBorder }]}
                onPress={() => Alert.alert('Extension', 'Booking extend requested for 2 hours.')}
              >
                <Ionicons name="time-outline" size={18} color={colors.primaryLight} />
                <Text style={[styles.actionBtnText, { color: colors.textPrimary }]}>Extend Trip</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: 'rgba(239, 68, 68, 0.15)', borderColor: 'rgba(239, 68, 68, 0.3)' }]}
                onPress={() => Alert.alert('SOS Triggered 🚨', 'Emergency response team and nearby CitySarthi captain alerted!')}
              >
                <Ionicons name="warning" size={18} color={colors.danger} />
                <Text style={[styles.actionBtnText, { color: colors.danger }]}>SOS Alert</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ResponsiveContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14, borderBottomWidth: 1, zIndex: 10 },
  backBtn: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  topHeaderTitle: { fontSize: 16, fontWeight: '700' },

  mapContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', position: 'relative' },
  mapGraphic: { alignItems: 'center', position: 'relative', marginTop: -80 },
  carPulseCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F3A314',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#F3A314',
    shadowRadius: 16,
    shadowOpacity: 0.6,
  },
  mapPinLabel: { fontWeight: '800', fontSize: 13, marginTop: 10, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10, borderWidth: 1 },

  telematicsCard: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
  },
  telemItem: { flex: 1, alignItems: 'center' },
  telemVal: { fontSize: 13, fontWeight: '800', marginTop: 4 },
  telemSub: { fontSize: 9, fontWeight: '700', letterSpacing: 0.5, marginTop: 1 },
  telemDivider: { width: 1, height: '80%', alignSelf: 'center' },

  tripDrawer: { position: 'absolute', bottom: 16, left: 16, right: 16, borderRadius: 18, padding: 16, borderWidth: 1 },
  drawerHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  vehicleTitle: { fontSize: 16, fontWeight: '800' },
  statusText: { fontSize: 11, marginTop: 2 },
  lockBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, gap: 6 },
  lockBtnText: { color: '#000000', fontWeight: '800', fontSize: 12 },

  divider: { height: 1, marginVertical: 12 },
  actionsRow: { flexDirection: 'row', gap: 8 },
  actionBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, borderRadius: 10, borderWidth: 1, gap: 4 },
  actionBtnText: { fontSize: 11, fontWeight: '700' },
});
