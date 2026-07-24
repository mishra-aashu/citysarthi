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
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { loginWithPhone, loginWithGoogle } from '../../services/authService';

export default function LoginScreen({ navigation }) {
  const [authMethod, setAuthMethod] = useState('email'); // 'email' or 'phone'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const { colors } = useTheme();

  const handleEmailLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing Fields', 'Please enter your email and password');
      return;
    }
    setLoading(true);
    const res = await login(email, password);
    setLoading(false);
    if (res.success) {
      Alert.alert('Welcome Back! 👋', 'Logged in successfully.');
      if (navigation?.navigate) navigation.navigate('Main');
    } else {
      Alert.alert('Login Failed', res.error || 'Invalid credentials');
    }
  };

  const handleSendOtp = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      Alert.alert('Invalid Number', 'Please enter a valid 10-digit mobile number');
      return;
    }
    setLoading(true);
    const res = await loginWithPhone(phoneNumber);
    setLoading(false);
    if (res.success) {
      if (navigation?.navigate) navigation.navigate('OTP', { phoneNumber });
    } else {
      Alert.alert('Login Failed', res.error || 'Unable to send OTP');
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    const res = await loginWithGoogle();
    setLoading(false);
    if (!res.success) {
      Alert.alert('Google Sign-In', res.error || 'Failed to initialize Google login');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.logoCircle, { backgroundColor: 'rgba(243, 163, 20, 0.15)' }]}>
          <Ionicons name="car-sport" size={44} color={colors.primary} />
        </View>

        <Text style={[styles.title, { color: colors.textPrimary }]}>
          City<Text style={{ color: colors.primary }}>Sarthi</Text>
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Sign in to rent vehicles, track bookings, & manage host profile
        </Text>

        {/* Auth Method Switcher */}
        <View style={[styles.methodTabs, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
          <TouchableOpacity
            style={[styles.methodTabBtn, authMethod === 'email' && { backgroundColor: colors.primary }]}
            onPress={() => setAuthMethod('email')}
          >
            <Text style={[styles.methodTabTxt, { color: authMethod === 'email' ? '#000000' : colors.textMuted }]}>
              Email Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.methodTabBtn, authMethod === 'phone' && { backgroundColor: colors.primary }]}
            onPress={() => setAuthMethod('phone')}
          >
            <Text style={[styles.methodTabTxt, { color: authMethod === 'phone' ? '#000000' : colors.textMuted }]}>
              Mobile OTP
            </Text>
          </TouchableOpacity>
        </View>

        {authMethod === 'email' ? (
          <View style={styles.formWidth}>
            <View style={[styles.inputContainer, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
              <Ionicons name="mail-outline" size={18} color={colors.textMuted} style={{ marginRight: 10 }} />
              <TextInput
                style={[styles.input, { color: colors.textPrimary }]}
                placeholder="Email Address"
                placeholderTextColor={colors.textMuted}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={[styles.inputContainer, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
              <Ionicons name="lock-closed-outline" size={18} color={colors.textMuted} style={{ marginRight: 10 }} />
              <TextInput
                style={[styles.input, { color: colors.textPrimary }]}
                placeholder="Password"
                placeholderTextColor={colors.textMuted}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <TouchableOpacity style={[styles.submitBtn, { backgroundColor: colors.primary }]} onPress={handleEmailLogin} disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#000000" />
              ) : (
                <>
                  <Text style={styles.submitBtnText}>Sign In with Email</Text>
                  <Ionicons name="arrow-forward" size={18} color="#000000" />
                </>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.formWidth}>
            <View style={[styles.inputContainer, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
              <Text style={[styles.countryCode, { color: colors.textPrimary }]}>+91</Text>
              <TextInput
                style={[styles.input, { color: colors.textPrimary }]}
                placeholder="10-Digit Mobile Number"
                placeholderTextColor={colors.textMuted}
                keyboardType="phone-pad"
                maxLength={10}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
            </View>

            <TouchableOpacity style={[styles.submitBtn, { backgroundColor: colors.primary }]} onPress={handleSendOtp} disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#000000" />
              ) : (
                <>
                  <Text style={styles.submitBtnText}>Get OTP Code</Text>
                  <Ionicons name="arrow-forward" size={18} color="#000000" />
                </>
              )}
            </TouchableOpacity>
          </View>
        )}

        {/* Divider */}
        <View style={styles.dividerRow}>
          <View style={[styles.line, { backgroundColor: colors.subtleBorder }]} />
          <Text style={[styles.orTxt, { color: colors.textMuted }]}>OR SIGN IN WITH</Text>
          <View style={[styles.line, { backgroundColor: colors.subtleBorder }]} />
        </View>

        {/* Google OAuth Button */}
        <TouchableOpacity style={[styles.googleBtn, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]} onPress={handleGoogleLogin}>
          <Ionicons name="logo-google" size={20} color="#EA4335" />
          <Text style={[styles.googleBtnText, { color: colors.textPrimary }]}>Continue with Google</Text>
        </TouchableOpacity>

        <View style={styles.footerRow}>
          <Text style={[styles.footerText, { color: colors.textMuted }]}>New to CitySarthi? </Text>
          <TouchableOpacity onPress={() => navigation?.navigate && navigation.navigate('Register')}>
            <Text style={[styles.registerLink, { color: colors.primaryLight }]}>Create Free Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 24, alignItems: 'center', justifyContent: 'center', minHeight: '100%' },
  logoCircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: { fontSize: 32, fontWeight: '900' },
  subtitle: { fontSize: 13, marginTop: 6, textAlign: 'center', marginBottom: 24, maxWidth: 360 },

  methodTabs: { flexDirection: 'row', width: '100%', maxWidth: 380, borderRadius: 12, borderWidth: 1, padding: 4, marginBottom: 20 },
  methodTabBtn: { flex: 1, paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  methodTabTxt: { fontSize: 13, fontWeight: '800' },

  formWidth: { width: '100%', maxWidth: 380 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    height: 52,
    marginBottom: 14,
  },
  countryCode: { fontSize: 15, fontWeight: '700', marginRight: 10 },
  input: { flex: 1, fontSize: 15, outlineStyle: 'none' },
  submitBtn: {
    flexDirection: 'row',
    height: 52,
    borderRadius: 26,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
  },
  submitBtnText: { color: '#000000', fontSize: 15, fontWeight: '800' },

  dividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 24, width: '100%', maxWidth: 380 },
  line: { flex: 1, height: 1 },
  orTxt: { fontSize: 10, fontWeight: '800', marginHorizontal: 12, letterSpacing: 0.5 },

  googleBtn: {
    flexDirection: 'row',
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    width: '100%',
    maxWidth: 380,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  googleBtnText: { fontSize: 14, fontWeight: '700' },

  footerRow: { flexDirection: 'row', marginTop: 24 },
  footerText: { fontSize: 14 },
  registerLink: { fontWeight: '800', fontSize: 14 },
});
