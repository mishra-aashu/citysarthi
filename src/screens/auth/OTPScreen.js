import React, { useState, useEffect, useContext } from 'react';
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
import ResponsiveContainer from '../../components/common/ResponsiveContainer';
import { useTheme } from '../../context/ThemeContext';
import { AuthContext } from '../../context/AuthContext';

export default function OTPScreen({ route, onVerifySuccess, onBack }) {
  const phoneNumber = route?.params?.phoneNumber || '9876543210';
  const [otp, setOtp] = useState(['1', '2', '3', '4']);
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleVerify = () => {
    const code = otp.join('');
    if (code.length < 4) {
      Alert.alert('Incomplete Code', 'Please enter 4-digit OTP code');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Logged in user mock session
      setUser({
        id: 'usr_demo_101',
        email: 'aashu@example.com',
        user_metadata: { full_name: 'Aashu Sharma', phone: phoneNumber },
      });
      if (onVerifySuccess) onVerifySuccess();
    }, 800);
  };

  return (
    <ResponsiveContainer>
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.header}>
          <TouchableOpacity style={[styles.backBtn, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]} onPress={onBack}>
            <Ionicons name="arrow-back" size={20} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={[styles.iconBox, { backgroundColor: 'rgba(243, 163, 20, 0.15)' }]}>
            <Ionicons name="keypad" size={36} color={colors.primary} />
          </View>

          <Text style={[styles.title, { color: colors.textPrimary }]}>Verify OTP Code</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            We sent a 4-digit verification code to {'\n'}
            <Text style={{ fontWeight: '700', color: colors.primary }}>+91 {phoneNumber}</Text>
          </Text>

          <View style={styles.otpRow}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                style={[
                  styles.otpInput,
                  {
                    backgroundColor: colors.surface,
                    borderColor: digit ? colors.primary : colors.cardBorder,
                    color: colors.textPrimary,
                  },
                ]}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={(val) => {
                  const newOtp = [...otp];
                  newOtp[index] = val;
                  setOtp(newOtp);
                }}
              />
            ))}
          </View>

          <TouchableOpacity
            style={[styles.verifyBtn, { backgroundColor: colors.primary }]}
            onPress={handleVerify}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#000000" />
            ) : (
              <Text style={styles.verifyBtnText}>Verify & Proceed</Text>
            )}
          </TouchableOpacity>

          <View style={styles.resendRow}>
            <Text style={[styles.resendText, { color: colors.textMuted }]}>
              {timer > 0 ? `Resend code in 00:${timer < 10 ? '0' : ''}${timer}` : "Didn't receive code? "}
            </Text>
            {timer === 0 && (
              <TouchableOpacity onPress={() => setTimer(30)}>
                <Text style={[styles.resendLink, { color: colors.primary }]}>Resend OTP</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </SafeAreaView>
    </ResponsiveContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 16 },
  backBtn: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 1 },
  content: { flex: 1, padding: 24, alignItems: 'center', justifyContent: 'center' },
  iconBox: { width: 72, height: 72, borderRadius: 36, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 24, fontWeight: '800' },
  subtitle: { fontSize: 13, textAlign: 'center', marginTop: 8, marginBottom: 32, lineHeight: 20 },
  otpRow: { flexDirection: 'row', gap: 12, marginBottom: 32 },
  otpInput: {
    width: 56,
    height: 60,
    borderRadius: 14,
    borderWidth: 1.5,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '800',
  },
  verifyBtn: { height: 52, borderRadius: 28, width: '100%', justifyContent: 'center', alignItems: 'center' },
  verifyBtnText: { color: '#000000', fontSize: 16, fontWeight: '800' },
  resendRow: { flexDirection: 'row', marginTop: 24 },
  resendText: { fontSize: 13 },
  resendLink: { fontSize: 13, fontWeight: '700' },
});
