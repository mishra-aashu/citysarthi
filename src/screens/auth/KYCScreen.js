import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ResponsiveContainer from '../../components/common/ResponsiveContainer';
import { useTheme } from '../../context/ThemeContext';
import { submitKYC } from '../../services/kycService';

export default function KYCScreen({ onBack, onComplete }) {
  const [dlNumber, setDlNumber] = useState('DL-0420210088921');
  const [aadhaarNumber, setAadhaarNumber] = useState('7849 1029 4482');
  const [dlUploaded, setDlUploaded] = useState(true);
  const [aadhaarUploaded, setAadhaarUploaded] = useState(true);
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();

  const handleSubmit = async () => {
    if (!dlNumber || !aadhaarNumber) {
      Alert.alert('Missing Documents', 'Please enter your Driving License and Aadhaar numbers');
      return;
    }
    setLoading(true);
    const res = await submitKYC({
      drivingLicense: dlNumber,
      aadharNumber: aadhaarNumber,
    });
    setLoading(false);
    if (res.success) {
      Alert.alert('KYC Verified! 🎉', 'Your Driving License & ID proof have been approved.', [
        { text: 'Awesome', onPress: () => onComplete && onComplete() },
      ]);
    }
  };

  return (
    <ResponsiveContainer>
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.header}>
          <TouchableOpacity style={[styles.backBtn, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]} onPress={onBack}>
            <Ionicons name="arrow-back" size={20} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Manage Driving License & KYC</Text>
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {/* Status Badge */}
          <View style={[styles.statusBanner, { backgroundColor: 'rgba(52, 199, 89, 0.12)', borderColor: colors.success }]}>
            <Ionicons name="checkmark-circle" size={24} color={colors.success} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={[styles.statusTitle, { color: colors.success }]}>Verification Status: VERIFIED</Text>
              <Text style={[styles.statusSubtitle, { color: colors.textSecondary }]}>
                Verified for Self-Drive Cars, Scooters, and Commercial Taxi rentals.
              </Text>
            </View>
          </View>

          {/* Driving License Card */}
          <View style={[styles.docCard, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
            <View style={styles.docHeader}>
              <Ionicons name="card" size={22} color={colors.primaryLight} />
              <Text style={[styles.docTitle, { color: colors.textPrimary }]}>Driving License (DL)</Text>
              <View style={[styles.verifiedBadge, { backgroundColor: 'rgba(52, 199, 89, 0.15)' }]}>
                <Text style={[styles.badgeText, { color: colors.success }]}>VERIFIED</Text>
              </View>
            </View>

            <Text style={[styles.inputLabel, { color: colors.textMuted }]}>LICENSE NUMBER</Text>
            <View style={[styles.inputBox, { backgroundColor: colors.background, borderColor: colors.cardBorder }]}>
              <TextInput
                style={[styles.input, { color: colors.textPrimary }]}
                value={dlNumber}
                onChangeText={setDlNumber}
                placeholder="e.g. DL-0420210088921"
                placeholderTextColor={colors.textMuted}
              />
            </View>

            <View style={styles.uploadRow}>
              <TouchableOpacity
                style={[styles.uploadBox, { backgroundColor: colors.background, borderColor: dlUploaded ? colors.primary : colors.cardBorder }]}
                onPress={() => setDlUploaded(true)}
              >
                <Ionicons name={dlUploaded ? "checkmark-circle" : "camera"} size={22} color={dlUploaded ? colors.primaryLight : colors.textMuted} />
                <Text style={[styles.uploadText, { color: colors.textSecondary }]}>
                  {dlUploaded ? 'DL Front Attached' : 'Upload Front Image'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.uploadBox, { backgroundColor: colors.background, borderColor: dlUploaded ? colors.primary : colors.cardBorder }]}
                onPress={() => setDlUploaded(true)}
              >
                <Ionicons name={dlUploaded ? "checkmark-circle" : "camera"} size={22} color={dlUploaded ? colors.primaryLight : colors.textMuted} />
                <Text style={[styles.uploadText, { color: colors.textSecondary }]}>
                  {dlUploaded ? 'DL Back Attached' : 'Upload Back Image'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Aadhaar Card */}
          <View style={[styles.docCard, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
            <View style={styles.docHeader}>
              <Ionicons name="finger-print" size={22} color={colors.primaryLight} />
              <Text style={[styles.docTitle, { color: colors.textPrimary }]}>Aadhaar Card Verification</Text>
              <View style={[styles.verifiedBadge, { backgroundColor: 'rgba(52, 199, 89, 0.15)' }]}>
                <Text style={[styles.badgeText, { color: colors.success }]}>VERIFIED</Text>
              </View>
            </View>

            <Text style={[styles.inputLabel, { color: colors.textMuted }]}>12-DIGIT AADHAAR NUMBER</Text>
            <View style={[styles.inputBox, { backgroundColor: colors.background, borderColor: colors.cardBorder }]}>
              <TextInput
                style={[styles.input, { color: colors.textPrimary }]}
                value={aadhaarNumber}
                onChangeText={setAadhaarNumber}
                keyboardType="number-pad"
                placeholder="xxxx xxxx xxxx"
                placeholderTextColor={colors.textMuted}
              />
            </View>

            <TouchableOpacity
              style={[styles.uploadFullBox, { backgroundColor: colors.background, borderColor: aadhaarUploaded ? colors.primary : colors.cardBorder }]}
              onPress={() => setAadhaarUploaded(true)}
            >
              <Ionicons name={aadhaarUploaded ? "shield-checkmark" : "cloud-upload"} size={22} color={aadhaarUploaded ? colors.primaryLight : colors.textMuted} />
              <Text style={[styles.uploadText, { color: colors.textSecondary }]}>
                {aadhaarUploaded ? 'Aadhaar e-KYC Verified' : 'Upload Aadhaar Card Document'}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={[styles.saveBtn, { backgroundColor: colors.primary }]} onPress={handleSubmit} disabled={loading}>
            <Text style={styles.saveBtnText}>Update & Save KYC</Text>
            <Ionicons name="checkmark-done" size={20} color="#000000" />
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ResponsiveContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.08)', gap: 12 },
  backBtn: { width: 38, height: 38, borderRadius: 19, justifyContent: 'center', alignItems: 'center', borderWidth: 1 },
  headerTitle: { fontSize: 18, fontWeight: '800' },
  content: { padding: 16 },
  statusBanner: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 14, borderWidth: 1, marginBottom: 16 },
  statusTitle: { fontSize: 13, fontWeight: '800' },
  statusSubtitle: { fontSize: 11, marginTop: 2 },
  docCard: { borderRadius: 16, padding: 16, borderWidth: 1, marginBottom: 16 },
  docHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 14, gap: 8 },
  docTitle: { flex: 1, fontSize: 15, fontWeight: '700' },
  verifiedBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  badgeText: { fontSize: 10, fontWeight: '800' },
  inputLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 0.5, marginBottom: 6 },
  inputBox: { borderRadius: 10, borderWidth: 1, paddingHorizontal: 12, height: 44, justifyContent: 'center', marginBottom: 12 },
  input: { fontSize: 14, fontWeight: '600', outlineStyle: 'none' },
  uploadRow: { flexDirection: 'row', gap: 10 },
  uploadBox: { flex: 1, borderRadius: 12, borderWidth: 1, borderStyle: 'dashed', padding: 12, alignItems: 'center', gap: 6 },
  uploadFullBox: { borderRadius: 12, borderWidth: 1, borderStyle: 'dashed', padding: 14, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8, marginTop: 4 },
  uploadText: { fontSize: 11, fontWeight: '600', textAlign: 'center' },
  saveBtn: { flexDirection: 'row', height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 8 },
  saveBtnText: { color: '#000000', fontSize: 15, fontWeight: '800' },
});
