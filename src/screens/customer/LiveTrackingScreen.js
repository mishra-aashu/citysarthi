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

export default function LiveTrackingScreen({ vehicle, onBack }) {
  const { colors, isDark } = useTheme();
  const vName = vehicle?.name || 'Hyundai Creta 2023';

  return (
    <ResponsiveContainer>
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.topHeader, { backgroundColor: colors.surface, borderBottomColor: colors.cardBorder }]}>
          <TouchableOpacity style={[styles.backBtn, { backgroundColor: colors.background }]} onPress={onBack}>
            <Ionicons name="arrow-back" size={20} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={[styles.topHeaderTitle, { color: colors.textPrimary }]}>Live Map Tracking</Text>
          <View style={{ width: 36 }} />
        </View>

        {/* Simulated Live Map Area */}
        <View style={[styles.mapContainer, { backgroundColor: isDark ? '#0B132B' : '#E2E8F0' }]}>
          <View style={styles.mapGraphic}>
            <Ionicons name="location" size={48} color={colors.primaryLight} />
            <Text style={[styles.mapPinLabel, { backgroundColor: isDark ? 'rgba(15,23,42,0.9)' : 'rgba(255,255,255,0.95)', color: colors.textPrimary }]}>
              Sector 62 Hub, Noida
            </Text>
            <View style={styles.radarPulse} />
          </View>

          {/* Live Trip Status Drawer */}
          <View style={[styles.tripDrawer, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
            <View style={styles.drawerHeader}>
              <View>
                <Text style={[styles.vehicleTitle, { color: colors.textPrimary }]}>{vName}</Text>
                <Text style={[styles.statusText, { color: colors.textMuted }]}>
                  Trip Status: <Text style={{ color: colors.success }}>Active (Check-In Complete)</Text>
                </Text>
              </View>
              <View style={styles.etaPill}>
                <Text style={[styles.etaTitle, { color: colors.success }]}>ETA 12 Min</Text>
              </View>
            </View>

            <View style={[styles.divider, { backgroundColor: colors.subtleBorder }]} />

            <View style={styles.actionsRow}>
              <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.background }]}>
                <Ionicons name="call" size={18} color={colors.primaryLight} />
                <Text style={[styles.actionBtnText, { color: colors.primaryLight }]}>Call Hub</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.background }]}>
                <Ionicons name="chatbubbles" size={18} color={colors.primaryLight} />
                <Text style={[styles.actionBtnText, { color: colors.primaryLight }]}>Chat</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.actionBtn, { backgroundColor: 'rgba(239, 68, 68, 0.15)' }]}>
                <Ionicons name="warning" size={18} color={colors.danger} />
                <Text style={[styles.actionBtnText, { color: colors.danger }]}>SOS Help</Text>
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
  mapGraphic: { alignItems: 'center', position: 'relative' },
  mapPinLabel: { fontWeight: '800', fontSize: 14, marginTop: 8, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  radarPulse: { position: 'absolute', top: 10, width: 90, height: 90, borderRadius: 45, borderWidth: 2, borderColor: 'rgba(96, 165, 250, 0.4)', zIndex: -1 },

  tripDrawer: { position: 'absolute', bottom: 16, left: 16, right: 16, borderRadius: 16, padding: 16, borderWidth: 1 },
  drawerHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  vehicleTitle: { fontSize: 16, fontWeight: '800' },
  statusText: { fontSize: 12, marginTop: 2 },
  etaPill: { backgroundColor: 'rgba(16, 185, 129, 0.15)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
  etaTitle: { fontSize: 12, fontWeight: '800' },
  divider: { height: 1, marginVertical: 12 },
  actionsRow: { flexDirection: 'row', gap: 10 },
  actionBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, borderRadius: 10, gap: 6 },
  actionBtnText: { fontSize: 12, fontWeight: '700' },
});
