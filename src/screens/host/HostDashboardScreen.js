import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ResponsiveContainer from '../../components/common/ResponsiveContainer';
import { useTheme } from '../../context/ThemeContext';

export default function HostDashboardScreen({ onSwitchRole }) {
  const { colors } = useTheme();
  const [vehiclesList, setVehiclesList] = useState([
    { id: 'h_1', name: 'Hyundai Creta 2023', regNo: 'UP16-BV-4892', type: 'SUV', hourlyRate: '89', trips: 14, status: 'RENTED_OUT' },
    { id: 'h_2', name: 'Maruti Suzuki Swift', regNo: 'DL04-CC-1120', type: 'Hatchback', hourlyRate: '49', trips: 28, status: 'AVAILABLE' },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newReg, setNewReg] = useState('');
  const [newRate, setNewRate] = useState('79');
  const [newType, setNewType] = useState('SUV');

  const handleAddVehicle = () => {
    if (!newName || !newReg) {
      Alert.alert('Incomplete Form', 'Please enter vehicle name and registration number.');
      return;
    }
    const newV = {
      id: 'h_' + Date.now(),
      name: newName,
      regNo: newReg,
      type: newType,
      hourlyRate: newRate,
      trips: 0,
      status: 'AVAILABLE',
    };
    setVehiclesList([newV, ...vehiclesList]);
    setNewName('');
    setNewReg('');
    setShowAddModal(false);
    Alert.alert('Vehicle Listed! 🚗', `${newName} is now live on CitySarthi for rental bookings.`);
  };

  return (
    <ResponsiveContainer>
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.cardBorder }]}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.title, { color: colors.textPrimary }]}>Host Partner Portal</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Manage your fleet, track rental income & bookings
            </Text>
          </View>
          <TouchableOpacity style={[styles.addBtn, { backgroundColor: colors.primary }]} onPress={() => setShowAddModal(true)}>
            <Ionicons name="add" size={18} color="#000000" />
            <Text style={styles.addBtnText}>List Car</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {/* Earnings Overview Card */}
          <View style={[styles.earningsCard, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
            <Text style={[styles.cardLabel, { color: colors.textMuted }]}>THIS MONTH'S HOST EARNINGS</Text>
            <Text style={[styles.earningsVal, { color: colors.primaryLight }]}>₹38,450.00</Text>

            <View style={styles.statRow}>
              <View style={styles.statBox}>
                <Text style={[styles.statNum, { color: colors.textPrimary }]}>42</Text>
                <Text style={[styles.statSub, { color: colors.textMuted }]}>Total Trips</Text>
              </View>
              <View style={[styles.statDivider, { backgroundColor: colors.subtleBorder }]} />
              <View style={styles.statBox}>
                <Text style={[styles.statNum, { color: colors.success }]}>96.4%</Text>
                <Text style={[styles.statSub, { color: colors.textMuted }]}>Occupancy Rate</Text>
              </View>
              <View style={[styles.statDivider, { backgroundColor: colors.subtleBorder }]} />
              <View style={styles.statBox}>
                <Text style={[styles.statNum, { color: colors.accent }]}>4.92 ★</Text>
                <Text style={[styles.statSub, { color: colors.textMuted }]}>Host Rating</Text>
              </View>
            </View>
          </View>

          {/* Active Fleet List */}
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Your Listed Vehicles ({vehiclesList.length})</Text>
          </View>

          {vehiclesList.map((v) => (
            <View key={v.id} style={[styles.vCard, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
              <View style={styles.vHeader}>
                <Ionicons name="car-sport" size={24} color={colors.primaryLight} />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={[styles.vName, { color: colors.textPrimary }]}>{v.name}</Text>
                  <Text style={[styles.vReg, { color: colors.textMuted }]}>{v.regNo} • {v.type}</Text>
                </View>
                <View
                  style={[
                    styles.statusPill,
                    { backgroundColor: v.status === 'RENTED_OUT' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(52, 199, 89, 0.15)' },
                  ]}
                >
                  <Text style={[styles.statusPillText, { color: v.status === 'RENTED_OUT' ? '#3B82F6' : colors.success }]}>
                    {v.status === 'RENTED_OUT' ? 'Currently Rented' : 'Ready for Rent'}
                  </Text>
                </View>
              </View>

              <View style={[styles.vDivider, { backgroundColor: colors.subtleBorder }]} />

              <View style={styles.vFooter}>
                <Text style={[styles.vRate, { color: colors.textPrimary }]}>
                  Rate: <Text style={{ color: colors.primaryLight, fontWeight: '800' }}>₹{v.hourlyRate}/hr</Text>
                </Text>
                <Text style={[styles.vTrips, { color: colors.textSecondary }]}>{v.trips} trips completed</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Add Vehicle Modal */}
        <Modal visible={showAddModal} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>List New Vehicle</Text>
                <TouchableOpacity onPress={() => setShowAddModal(false)}>
                  <Ionicons name="close" size={24} color={colors.textMuted} />
                </TouchableOpacity>
              </View>

              <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>VEHICLE MAKE & MODEL</Text>
              <View style={[styles.inputBox, { backgroundColor: colors.background, borderColor: colors.cardBorder }]}>
                <TextInput
                  style={[styles.input, { color: colors.textPrimary }]}
                  placeholder="e.g. Mahindra Thar 4x4 / Tata Nexon"
                  placeholderTextColor={colors.textMuted}
                  value={newName}
                  onChangeText={setNewName}
                />
              </View>

              <Text style={[styles.inputLabel, { color: colors.textSecondary, marginTop: 10 }]}>REGISTRATION NUMBER</Text>
              <View style={[styles.inputBox, { backgroundColor: colors.background, borderColor: colors.cardBorder }]}>
                <TextInput
                  style={[styles.input, { color: colors.textPrimary }]}
                  placeholder="e.g. DL-01-AB-1234"
                  placeholderTextColor={colors.textMuted}
                  autoCapitalize="characters"
                  value={newReg}
                  onChangeText={setNewReg}
                />
              </View>

              <Text style={[styles.inputLabel, { color: colors.textSecondary, marginTop: 10 }]}>HOURLY RENTAL RATE (₹)</Text>
              <View style={[styles.inputBox, { backgroundColor: colors.background, borderColor: colors.cardBorder }]}>
                <TextInput
                  style={[styles.input, { color: colors.textPrimary }]}
                  keyboardType="numeric"
                  value={newRate}
                  onChangeText={setNewRate}
                />
              </View>

              <TouchableOpacity style={[styles.submitBtn, { backgroundColor: colors.primary, marginTop: 20 }]} onPress={handleAddVehicle}>
                <Text style={styles.submitBtnText}>Publish Vehicle Listing</Text>
              </TouchableOpacity>
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
  addBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, gap: 4 },
  addBtnText: { color: '#000000', fontWeight: '800', fontSize: 13 },
  content: { padding: 16 },

  earningsCard: { borderRadius: 16, padding: 18, borderWidth: 1, marginBottom: 20 },
  cardLabel: { fontSize: 10, fontWeight: '800', letterSpacing: 0.8 },
  earningsVal: { fontSize: 32, fontWeight: '900', marginTop: 4 },
  statRow: { flexDirection: 'row', marginTop: 18, paddingTop: 14, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.08)' },
  statBox: { flex: 1, alignItems: 'center' },
  statNum: { fontSize: 16, fontWeight: '800' },
  statSub: { fontSize: 10, marginTop: 2 },
  statDivider: { width: 1, height: '70%', alignSelf: 'center' },

  sectionHeader: { marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '800' },

  vCard: { borderRadius: 14, padding: 14, borderWidth: 1, marginBottom: 12 },
  vHeader: { flexDirection: 'row', alignItems: 'center' },
  vName: { fontSize: 15, fontWeight: '800' },
  vReg: { fontSize: 11, marginTop: 2 },
  statusPill: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  statusPillText: { fontSize: 10, fontWeight: '800' },
  vDivider: { height: 1, marginVertical: 10 },
  vFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  vRate: { fontSize: 12 },
  vTrips: { fontSize: 12 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.65)', justifyContent: 'flex-end' },
  modalContent: { borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  modalTitle: { fontSize: 18, fontWeight: '800' },
  inputLabel: { fontSize: 11, fontWeight: '700', letterSpacing: 0.5, marginBottom: 6 },
  inputBox: { borderRadius: 10, borderWidth: 1, paddingHorizontal: 12, height: 46, justifyContent: 'center' },
  input: { fontSize: 14, outlineStyle: 'none' },
  submitBtn: { height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center' },
  submitBtnText: { color: '#000000', fontSize: 15, fontWeight: '800' },
});
