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

export default function RegisterScreen({ onRegisterSuccess, onBackToLogin }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedRole, setSelectedRole] = useState('CUSTOMER'); // 'CUSTOMER', 'HOST', 'DRIVER'
  const [referralCode, setReferralCode] = useState('');
  const { colors } = useTheme();

  const handleRegister = () => {
    if (!fullName || !phone) {
      Alert.alert('Required Fields', 'Please enter your full name and mobile number.');
      return;
    }
    Alert.alert('Account Created!', `Welcome to CitySarthi as a ${selectedRole.toLowerCase()}!`, [
      { text: 'Continue', onPress: () => onRegisterSuccess && onRegisterSuccess() },
    ]);
  };

  return (
    <ResponsiveContainer>
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <TouchableOpacity style={[styles.backBtn, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]} onPress={onBackToLogin}>
            <Ionicons name="arrow-back" size={20} color={colors.textPrimary} />
          </TouchableOpacity>

          <Text style={[styles.title, { color: colors.textPrimary }]}>Create Account</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Join CitySarthi to book vehicles or earn as a host/driver
          </Text>

          {/* Role Picker */}
          <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>SELECT YOUR ROLE</Text>
          <View style={styles.roleRow}>
            {[
              { id: 'CUSTOMER', label: 'Customer', icon: 'car-sport-outline' },
              { id: 'HOST', label: 'Vehicle Host', icon: 'business-outline' },
              { id: 'DRIVER', label: 'Driver/Captain', icon: 'person-outline' },
            ].map((role) => (
              <TouchableOpacity
                key={role.id}
                style={[
                  styles.roleCard,
                  { backgroundColor: colors.surface, borderColor: colors.cardBorder },
                  selectedRole === role.id && { backgroundColor: 'rgba(243, 163, 20, 0.15)', borderColor: colors.primary },
                ]}
                onPress={() => setSelectedRole(role.id)}
              >
                <Ionicons
                  name={role.icon}
                  size={20}
                  color={selectedRole === role.id ? colors.primaryLight : colors.textMuted}
                />
                <Text
                  style={[
                    styles.roleText,
                    { color: selectedRole === role.id ? colors.primaryLight : colors.textSecondary },
                  ]}
                >
                  {role.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Form Fields */}
          <View style={styles.form}>
            <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Full Name</Text>
            <View style={[styles.inputBox, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
              <Ionicons name="person-outline" size={18} color={colors.textMuted} />
              <TextInput
                style={[styles.input, { color: colors.textPrimary }]}
                placeholder="e.g. Aashu Sharma"
                placeholderTextColor={colors.textMuted}
                value={fullName}
                onChangeText={setFullName}
              />
            </View>

            <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Mobile Number</Text>
            <View style={[styles.inputBox, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
              <Ionicons name="call-outline" size={18} color={colors.textMuted} />
              <TextInput
                style={[styles.input, { color: colors.textPrimary }]}
                placeholder="10-digit mobile number"
                placeholderTextColor={colors.textMuted}
                keyboardType="phone-pad"
                maxLength={10}
                value={phone}
                onChangeText={setPhone}
              />
            </View>

            <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Email Address (Optional)</Text>
            <View style={[styles.inputBox, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
              <Ionicons name="mail-outline" size={18} color={colors.textMuted} />
              <TextInput
                style={[styles.input, { color: colors.textPrimary }]}
                placeholder="name@example.com"
                placeholderTextColor={colors.textMuted}
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Referral Code (Optional)</Text>
            <View style={[styles.inputBox, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
              <Ionicons name="gift-outline" size={18} color={colors.accent} />
              <TextInput
                style={[styles.input, { color: colors.textPrimary }]}
                placeholder="Have a promo code? (e.g. CITY250)"
                placeholderTextColor={colors.textMuted}
                autoCapitalize="characters"
                value={referralCode}
                onChangeText={setReferralCode}
              />
            </View>
          </View>

          <TouchableOpacity style={[styles.submitBtn, { backgroundColor: colors.primary }]} onPress={handleRegister}>
            <Text style={styles.submitBtnText}>Complete Registration</Text>
            <Ionicons name="checkmark-circle" size={20} color="#000000" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginLinkRow} onPress={onBackToLogin}>
            <Text style={[styles.loginText, { color: colors.textMuted }]}>Already have an account? </Text>
            <Text style={[styles.loginLink, { color: colors.primary }]}>Log In</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ResponsiveContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 24 },
  backBtn: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 1, marginBottom: 20 },
  title: { fontSize: 26, fontWeight: '800' },
  subtitle: { fontSize: 13, marginTop: 4, marginBottom: 24 },
  sectionLabel: { fontSize: 11, fontWeight: '700', letterSpacing: 0.8, marginBottom: 10 },
  roleRow: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  roleCard: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justify: 'center',
    gap: 6,
  },
  roleText: { fontSize: 12, fontWeight: '700', textAlign: 'center' },
  form: { gap: 6, marginBottom: 28 },
  inputLabel: { fontSize: 12, fontWeight: '700', marginTop: 10 },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    height: 50,
    gap: 10,
  },
  input: { flex: 1, fontSize: 14, outlineStyle: 'none' },
  submitBtn: {
    flexDirection: 'row',
    height: 52,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  submitBtnText: { color: '#000000', fontSize: 16, fontWeight: '800' },
  loginLinkRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  loginText: { fontSize: 13 },
  loginLink: { fontSize: 13, fontWeight: '700' },
});
