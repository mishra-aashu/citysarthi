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
import { COLORS } from '../../config/theme';
import { AuthContext } from '../../context/AuthContext';
import { loginWithPhone } from '../../services/authService';

export default function LoginScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

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
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoCircle}>
          <Ionicons name="car-sport" size={40} color={COLORS.primaryLight} />
        </View>

        <Text style={styles.title}>City<Text style={styles.highlight}>Sarthi</Text></Text>
        <Text style={styles.subtitle}>Enter your mobile number to start vehicle booking & rentals</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.countryCode}>+91</Text>
          <TextInput
            style={styles.input}
            placeholder="Mobile Number"
            placeholderTextColor={COLORS.textMuted}
            keyboardType="phone-pad"
            maxLength={10}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>

        <TouchableOpacity style={styles.submitBtn} onPress={handleSendOtp} disabled={loading}>
          {loading ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <>
              <Text style={styles.submitBtnText}>Get OTP Code</Text>
              <Ionicons name="arrow-forward" size={18} color={COLORS.white} />
            </>
          )}
        </TouchableOpacity>

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>New to CitySarthi? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerLink}>Register Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { flex: 1, padding: 24, justifyContent: 'center', alignItems: 'center' },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(37, 99, 235, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: { fontSize: 30, fontWeight: 'bold', color: COLORS.textPrimary },
  highlight: { color: COLORS.primaryLight },
  subtitle: { fontSize: 13, color: COLORS.textSecondary, marginTop: 8, textAlign: 'center', marginBottom: 32 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.surfaceLight,
    paddingHorizontal: 16,
    height: 52,
    width: '100%',
    marginBottom: 20,
  },
  countryCode: { fontSize: 15, fontWeight: '700', color: COLORS.textPrimary, marginRight: 10 },
  input: { flex: 1, color: COLORS.textPrimary, fontSize: 15 },
  submitBtn: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    height: 52,
    borderRadius: 12,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  submitBtnText: { color: COLORS.white, fontSize: 16, fontWeight: '700' },
  footerRow: { flexDirection: 'row', marginTop: 24 },
  footerText: { color: COLORS.textMuted, fontSize: 14 },
  registerLink: { color: COLORS.primaryLight, fontWeight: '700', fontSize: 14 },
});
