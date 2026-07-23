import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../config/theme';
import ResponsiveContainer from '../../components/common/ResponsiveContainer';

const FAQS = [
  { q: 'How do I start a self-drive rental trip?', a: 'Once at the car location, open My Bookings, tap Check-In, verify photos, enter your 4-digit OTP, and unlock the vehicle.' },
  { q: 'What is the security deposit & refund timeline?', a: 'Security deposit is ₹1,000 for standard cars and refunded automatically within 24 hours of checkout.' },
  { q: 'What if the vehicle breaks down or gets flat tire?', a: 'Tap the 24x7 Emergency Roadside Assistance SOS button below. Our team dispatches help within 30 mins.' },
];

export default function SupportScreen() {
  return (
    <ResponsiveContainer>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Help & Support</Text>
          <Text style={styles.subtitle}>24x7 Customer Assistance & Emergency SOS</Text>
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {/* Emergency SOS Banner */}
          <View style={styles.sosCard}>
            <View style={styles.sosHeader}>
              <Ionicons name="warning" size={24} color={COLORS.white} />
              <Text style={styles.sosTitle}>24x7 Roadside Emergency SOS</Text>
            </View>
            <Text style={styles.sosDesc}>
              In case of accident, breakdown, or safety concern during your trip.
            </Text>
            <TouchableOpacity style={styles.sosBtn}>
              <Ionicons name="call" size={16} color={COLORS.danger} />
              <Text style={styles.sosBtnText}>CALL EMERGENCY HELPLINE (1800-SARTHI)</Text>
            </TouchableOpacity>
          </View>

          {/* Quick Options */}
          <Text style={styles.sectionTitle}>Quick Support</Text>
          <View style={styles.grid}>
            <TouchableOpacity style={styles.gridCard}>
              <View style={[styles.gridIcon, { backgroundColor: 'rgba(37, 99, 235, 0.15)' }]}>
                <Ionicons name="chatbubbles" size={22} color={COLORS.primaryLight} />
              </View>
              <Text style={styles.gridTitle}>Live Chat</Text>
              <Text style={styles.gridDesc}>Chat with AI & Agents</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.gridCard}>
              <View style={[styles.gridIcon, { backgroundColor: 'rgba(16, 185, 129, 0.15)' }]}>
                <Ionicons name="call" size={22} color={COLORS.success} />
              </View>
              <Text style={styles.gridTitle}>Call Support</Text>
              <Text style={styles.gridDesc}>Speak to Executive</Text>
            </TouchableOpacity>
          </View>

          {/* FAQs Section */}
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          {FAQS.map((item, idx) => (
            <View key={idx} style={styles.faqCard}>
              <Text style={styles.faqQ}>Q: {item.q}</Text>
              <Text style={styles.faqA}>{item.a}</Text>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </ResponsiveContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: 16, backgroundColor: COLORS.surface, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.06)' },
  title: { fontSize: 22, fontWeight: '800', color: COLORS.textPrimary },
  subtitle: { fontSize: 13, color: COLORS.textSecondary, marginTop: 2 },
  content: { padding: 16 },

  sosCard: { backgroundColor: COLORS.danger, borderRadius: 16, padding: 16, marginBottom: 20 },
  sosHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  sosTitle: { fontSize: 16, fontWeight: '800', color: COLORS.white },
  sosDesc: { fontSize: 12, color: 'rgba(255,255,255,0.9)', marginTop: 6 },
  sosBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.white, paddingVertical: 10, borderRadius: 10, marginTop: 12, gap: 8 },
  sosBtnText: { color: COLORS.danger, fontWeight: '800', fontSize: 11 },

  sectionTitle: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 12 },
  grid: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  gridCard: { flex: 1, backgroundColor: COLORS.surface, borderRadius: 14, padding: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  gridIcon: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  gridTitle: { fontSize: 14, fontWeight: '700', color: COLORS.textPrimary },
  gridDesc: { fontSize: 11, color: COLORS.textMuted, marginTop: 2 },

  faqCard: { backgroundColor: COLORS.surface, borderRadius: 12, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  faqQ: { fontSize: 14, fontWeight: '700', color: COLORS.primaryLight },
  faqA: { fontSize: 12, color: COLORS.textSecondary, marginTop: 6, lineHeight: 18 },
});
