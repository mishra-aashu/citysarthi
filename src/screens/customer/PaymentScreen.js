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
import { COLORS } from '../../config/theme';

export default function PaymentScreen({ onBack, onPaymentSuccess }) {
  const [selectedMethod, setSelectedMethod] = useState('upi');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topHeader}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Ionicons name="arrow-back" size={20} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.topHeaderTitle}>Payment Gateway</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.amountBox}>
          <Text style={styles.amountLabel}>AMOUNT TO PAY</Text>
          <Text style={styles.amountVal}>₹2,829.00</Text>
        </View>

        <Text style={styles.sectionHeader}>Select Payment Option</Text>

        <TouchableOpacity
          style={[styles.methodCard, selectedMethod === 'upi' && styles.activeMethodCard]}
          onPress={() => setSelectedMethod('upi')}
        >
          <Ionicons name="qr-code-outline" size={22} color={COLORS.primaryLight} />
          <View style={styles.methodInfo}>
            <Text style={styles.methodTitle}>UPI (Google Pay, PhonePe, Paytm)</Text>
            <Text style={styles.methodSub}>Instant 0% convenience fee payment</Text>
          </View>
          <Ionicons
            name={selectedMethod === 'upi' ? 'checkmark-circle' : 'ellipse-outline'}
            size={22}
            color={selectedMethod === 'upi' ? COLORS.primaryLight : COLORS.textMuted}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.methodCard, selectedMethod === 'wallet' && styles.activeMethodCard]}
          onPress={() => setSelectedMethod('wallet')}
        >
          <Ionicons name="wallet-outline" size={22} color={COLORS.accent} />
          <View style={styles.methodInfo}>
            <Text style={styles.methodTitle}>CitySarthi Wallet (Balance: ₹1,450)</Text>
            <Text style={styles.methodSub}>Pay ₹1,450 via Wallet + rest ₹1,379 via UPI</Text>
          </View>
          <Ionicons
            name={selectedMethod === 'wallet' ? 'checkmark-circle' : 'ellipse-outline'}
            size={22}
            color={selectedMethod === 'wallet' ? COLORS.primaryLight : COLORS.textMuted}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.methodCard, selectedMethod === 'card' && styles.activeMethodCard]}
          onPress={() => setSelectedMethod('card')}
        >
          <Ionicons name="card-outline" size={22} color={COLORS.success} />
          <View style={styles.methodInfo}>
            <Text style={styles.methodTitle}>Credit / Debit Card</Text>
            <Text style={styles.methodSub}>Visa, Mastercard, RuPay, Amex</Text>
          </View>
          <Ionicons
            name={selectedMethod === 'card' ? 'checkmark-circle' : 'ellipse-outline'}
            size={22}
            color={selectedMethod === 'card' ? COLORS.primaryLight : COLORS.textMuted}
          />
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.payNowBtn} onPress={onPaymentSuccess}>
          <Ionicons name="lock-closed" size={16} color={COLORS.white} />
          <Text style={styles.payNowText}>Pay Securely ₹2,829</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  topHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14, backgroundColor: COLORS.surface, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.06)' },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center' },
  topHeaderTitle: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary },
  content: { padding: 16 },

  amountBox: { backgroundColor: COLORS.surface, borderRadius: 16, padding: 20, alignItems: 'center', marginBottom: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  amountLabel: { fontSize: 11, fontWeight: '800', color: COLORS.textMuted, letterSpacing: 1 },
  amountVal: { fontSize: 28, fontWeight: '900', color: COLORS.primaryLight, marginTop: 4 },

  sectionHeader: { fontSize: 15, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 12 },
  methodCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, padding: 16, borderRadius: 14, marginBottom: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  activeMethodCard: { borderColor: COLORS.primary, backgroundColor: 'rgba(37, 99, 235, 0.08)' },
  methodInfo: { flex: 1, marginLeft: 12 },
  methodTitle: { fontSize: 14, fontWeight: '700', color: COLORS.textPrimary },
  methodSub: { fontSize: 11, color: COLORS.textMuted, marginTop: 2 },

  bottomBar: { padding: 16, backgroundColor: COLORS.surface, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)' },
  payNowBtn: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.success, paddingVertical: 14, borderRadius: 10, gap: 8 },
  payNowText: { color: COLORS.white, fontWeight: '800', fontSize: 15 },
});
