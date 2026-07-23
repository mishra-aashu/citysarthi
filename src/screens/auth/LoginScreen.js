import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { loginWithPhone } from '../../services/authService';

export default function LoginScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const { colors } = useTheme();

  const handleSendOtp = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      Alert.alert('Invalid Number', 'Please enter a valid 10-digit mobile number');
      return;
    }
    setLoading(true);
    const res = await loginWithPhone(phoneNumber);
    setLoading(false);
    if (res.success) {
      navigation.navigate('OTP', { phoneNumber });
    } else {
      Alert.alert('Login Failed', res.error || 'Unable to send OTP');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <View style={[styles.logoCircle, { backgroundColor: 'rgba(243, 163, 20, 0.15)' }]}>
          <Ionicons name="car-sport" size={40} color={colors.primary} />
        </View>

        <Text style={[styles.title, { color: colors.textPrimary }]}>City<Text style={{ color: colors.primary }}>Sarthi</Text></Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Enter your mobile number to start vehicle booking & rentals</Text>

        <View style={[styles.inputContainer, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
          <Text style={[styles.countryCode, { color: colors.textPrimary }]}>+91</Text>
          <TextInput
            style={[styles.input, { color: colors.textPrimary }]}
            placeholder="Mobile Number"
            placeholderTextColor={colors.textMuted}
            keyboardType="phone-pad"
            maxLength={10}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>

        <TouchableOpacity style={[styles.submitBtn, { backgroundColor: colors.primary }]} onPress={handleSendOtp} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <Text style={styles.submitBtnText}>Get OTP Code</Text>
              <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
            </>
          )}
        </TouchableOpacity>

        <View style={styles.footerRow}>
          <Text style={[styles.footerText, { color: colors.textMuted }]}>New to CitySarthi? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={[styles.registerLink, { color: colors.primary }]}>Register Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, padding: 24, justifyContent: 'center', alignItems: 'center' },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: { fontSize: 30, fontWeight: 'bold' },
  subtitle: { fontSize: 13, marginTop: 8, textAlign: 'center', marginBottom: 32 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    height: 52,
    width: '100%',
    marginBottom: 20,
  },
  countryCode: { fontSize: 15, fontWeight: '700', marginRight: 10 },
  input: { flex: 1, fontSize: 15 },
  submitBtn: {
    flexDirection: 'row',
    height: 52,
    borderRadius: 12,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  submitBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  footerRow: { flexDirection: 'row', marginTop: 24 },
  footerText: { fontSize: 14 },
  registerLink: { fontWeight: '700', fontSize: 14 },
});
