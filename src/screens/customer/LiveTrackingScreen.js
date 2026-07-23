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
import ResponsiveContainer from '../../components/common/ResponsiveContainer';

export default function LiveTrackingScreen({ vehicle, onBack }) {
  const vName = vehicle?.name || 'Hyundai Creta 2023';

  return (
    <ResponsiveContainer>
      <SafeAreaView style={styles.container}>
        <View style={styles.topHeader}>
          <TouchableOpacity style={styles.backBtn} onPress={onBack}>
            <Ionicons name="arrow-back" size={20} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.topHeaderTitle}>Live Map Tracking</Text>
          <View style={{ width: 36 }} />
        </View>

        {/* Simulated Live Map Area */}
        <View style={styles.mapContainer}>
          <View style={styles.mapGraphic}>
            <Ionicons name="location" size={48} color={COLORS.primaryLight} />
            <Text style={styles.mapPinLabel}>Sector 62 Hub, Noida</Text>
            <View style={styles.radarPulse} />
          </View>

          {/* Live Trip Status Drawer */}
          <View style={styles.tripDrawer}>
            <View style={styles.drawerHeader}>
              <View>
                <Text style={styles.vehicleTitle}>{vName}</Text>
                <Text style={styles.statusText}>Trip Status: <Text style={{ color: COLORS.success }}>Active (Check-In Complete)</Text></Text>
              </View>
              <View style={styles.etaPill}>
                <Text style={styles.etaTitle}>ETA 12 Min</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.actionsRow}>
              <TouchableOpacity style={styles.actionBtn}>
                <Ionicons name="call" size={18} color={COLORS.primaryLight} />
                <Text style={styles.actionBtnText}>Call Hub</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionBtn}>
                <Ionicons name="chatbubbles" size={18} color={COLORS.primaryLight} />
                <Text style={styles.actionBtnText}>Chat</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.actionBtn, { backgroundColor: 'rgba(239, 68, 68, 0.15)' }]}>
                <Ionicons name="warning" size={18} color={COLORS.danger} />
                <Text style={[styles.actionBtnText, { color: COLORS.danger }]}>SOS Help</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ResponsiveContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  topHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14, backgroundColor: COLORS.surface, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.06)', zIndex: 10 },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center' },
  topHeaderTitle: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary },

  mapContainer: { flex: 1, backgroundColor: '#0B132B', justifyContent: 'center', alignItems: 'center', position: 'relative' },
  mapGraphic: { alignItems: 'center', position: 'relative' },
  mapPinLabel: { color: COLORS.white, fontWeight: '800', fontSize: 14, marginTop: 8, backgroundColor: 'rgba(15,23,42,0.9)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  radarPulse: { position: 'absolute', top: 10, width: 90, height: 90, borderRadius: 45, borderWidth: 2, borderColor: 'rgba(96, 165, 250, 0.4)', zIndex: -1 },

  tripDrawer: { position: 'absolute', bottom: 16, left: 16, right: 16, backgroundColor: COLORS.surface, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  drawerHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  vehicleTitle: { fontSize: 16, fontWeight: '800', color: COLORS.textPrimary },
  statusText: { fontSize: 12, color: COLORS.textMuted, marginTop: 2 },
  etaPill: { backgroundColor: 'rgba(16, 185, 129, 0.15)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
  etaTitle: { color: COLORS.success, fontSize: 12, fontWeight: '800' },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.06)', marginVertical: 12 },
  actionsRow: { flexDirection: 'row', gap: 10 },
  actionBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.background, paddingVertical: 10, borderRadius: 10, gap: 6 },
  actionBtnText: { fontSize: 12, fontWeight: '700', color: COLORS.primaryLight },
});
