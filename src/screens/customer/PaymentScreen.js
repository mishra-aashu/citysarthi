import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ResponsiveContainer from '../../components/common/ResponsiveContainer';
import { useTheme } from '../../context/ThemeContext';

export default function PaymentScreen({ onBack, onPaymentSuccess }) {
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const { colors } = useTheme();

  return (
    <ResponsiveContainer>
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.topHeader, { backgroundColor: colors.surface, borderBottomColor: colors.cardBorder }]}>
          <TouchableOpacity style={[styles.backBtn, { backgroundColor: colors.background }]} onPress={onBack}>
            <Ionicons name="arrow-back" size={20} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={[styles.topHeaderTitle, { color: colors.textPrimary }]}>Payment Gateway</Text>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={[styles.amountBox, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
            <Text style={[styles.amountLabel, { color: colors.textMuted }]}>AMOUNT TO PAY</Text>
            <Text style={[styles.amountVal, { color: colors.primaryLight }]}>₹2,829.00</Text>
          </View>

          <Text style={[styles.sectionHeader, { color: colors.textPrimary }]}>Select Payment Option</Text>

          <TouchableOpacity
            style={[
              styles.methodCard,
              { backgroundColor: colors.surface, borderColor: colors.cardBorder },
              selectedMethod === 'upi' && { borderColor: colors.primary, backgroundColor: 'rgba(37, 99, 235, 0.08)' },
            ]}
            onPress={() => setSelectedMethod('upi')}
          >
            <Ionicons name="qr-code-outline" size={22} color={colors.primaryLight} />
            <View style={styles.methodInfo}>
              <Text style={[styles.methodTitle, { color: colors.textPrimary }]}>UPI (Google Pay, PhonePe, Paytm)</Text>
              <Text style={[styles.methodSub, { color: colors.textMuted }]}>Instant 0% convenience fee payment</Text>
            </View>
            <Ionicons
              name={selectedMethod === 'upi' ? 'checkmark-circle' : 'ellipse-outline'}
              size={22}
              color={selectedMethod === 'upi' ? colors.primaryLight : colors.textMuted}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.methodCard,
              { backgroundColor: colors.surface, borderColor: colors.cardBorder },
              selectedMethod === 'wallet' && { borderColor: colors.primary, backgroundColor: 'rgba(37, 99, 235, 0.08)' },
            ]}
            onPress={() => setSelectedMethod('wallet')}
          >
            <Ionicons name="wallet-outline" size={22} color={colors.accent} />
            <View style={styles.methodInfo}>
              <Text style={[styles.methodTitle, { color: colors.textPrimary }]}>CitySarthi Wallet (Balance: ₹1,450)</Text>
              <Text style={[styles.methodSub, { color: colors.textMuted }]}>Pay ₹1,450 via Wallet + rest ₹1,379 via UPI</Text>
            </View>
            <Ionicons
              name={selectedMethod === 'wallet' ? 'checkmark-circle' : 'ellipse-outline'}
              size={22}
              color={selectedMethod === 'wallet' ? colors.primaryLight : colors.textMuted}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.methodCard,
              { backgroundColor: colors.surface, borderColor: colors.cardBorder },
              selectedMethod === 'card' && { borderColor: colors.primary, backgroundColor: 'rgba(37, 99, 235, 0.08)' },
            ]}
            onPress={() => setSelectedMethod('card')}
          >
            <Ionicons name="card-outline" size={22} color={colors.success} />
            <View style={styles.methodInfo}>
              <Text style={[styles.methodTitle, { color: colors.textPrimary }]}>Credit / Debit Card</Text>
              <Text style={[styles.methodSub, { color: colors.textMuted }]}>Visa, Mastercard, RuPay, Amex</Text>
            </View>
            <Ionicons
              name={selectedMethod === 'card' ? 'checkmark-circle' : 'ellipse-outline'}
              size={22}
              color={selectedMethod === 'card' ? colors.primaryLight : colors.textMuted}
            />
          </TouchableOpacity>
        </ScrollView>

        <View style={[styles.bottomBar, { backgroundColor: colors.surface, borderTopColor: colors.cardBorder }]}>
          <TouchableOpacity style={[styles.payNowBtn, { backgroundColor: colors.success }]} onPress={onPaymentSuccess}>
            <Ionicons name="lock-closed" size={16} color="#FFFFFF" />
            <Text style={styles.payNowText}>Pay Securely ₹2,829</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ResponsiveContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14, borderBottomWidth: 1 },
  backBtn: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  topHeaderTitle: { fontSize: 16, fontWeight: '700' },
  content: { padding: 16 },

  amountBox: { borderRadius: 16, padding: 20, alignItems: 'center', marginBottom: 20, borderWidth: 1 },
  amountLabel: { fontSize: 11, fontWeight: '800', letterSpacing: 1 },
  amountVal: { fontSize: 28, fontWeight: '900', marginTop: 4 },

  sectionHeader: { fontSize: 15, fontWeight: '700', marginBottom: 12 },
  methodCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 14, marginBottom: 12, borderWidth: 1 },
  methodInfo: { flex: 1, marginLeft: 12 },
  methodTitle: { fontSize: 14, fontWeight: '700' },
  methodSub: { fontSize: 11, marginTop: 2 },

  bottomBar: { padding: 16, borderTopWidth: 1 },
  payNowBtn: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 14, borderRadius: 10, gap: 8 },
  payNowText: { color: '#FFFFFF', fontWeight: '800', fontSize: 15 },
});
