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
import ResponsiveContainer from '../../components/common/ResponsiveContainer';
import { useTheme } from '../../context/ThemeContext';

const FAQS = [
  { q: 'How do I start a self-drive rental trip?', a: 'Once at the car location, open My Bookings, tap Check-In, verify photos, enter your 4-digit OTP, and unlock the vehicle.' },
  { q: 'What is the security deposit & refund timeline?', a: 'Security deposit is ₹1,000 for standard cars and refunded automatically within 24 hours of checkout.' },
  { q: 'What if the vehicle breaks down or gets flat tire?', a: 'Tap the 24x7 Emergency Roadside Assistance SOS button below. Our team dispatches help within 30 mins.' },
];

export default function SupportScreen() {
  const { colors } = useTheme();

  return (
    <ResponsiveContainer>
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.cardBorder }]}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>Help & Support</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            24x7 Customer Assistance & Emergency SOS
          </Text>
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {/* Emergency SOS Banner */}
          <View style={[styles.sosCard, { backgroundColor: colors.danger }]}>
            <View style={styles.sosHeader}>
              <Ionicons name="warning" size={24} color="#FFFFFF" />
              <Text style={styles.sosTitle}>24x7 Roadside Emergency SOS</Text>
            </View>
            <Text style={styles.sosDesc}>
              In case of accident, breakdown, or safety concern during your trip.
            </Text>
            <TouchableOpacity style={styles.sosBtn}>
              <Ionicons name="call" size={16} color={colors.danger} />
              <Text style={[styles.sosBtnText, { color: colors.danger }]}>
                CALL EMERGENCY HELPLINE (1800-SARTHI)
              </Text>
            </TouchableOpacity>
          </View>

          {/* Quick Options */}
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Quick Support</Text>
          <View style={styles.grid}>
            <TouchableOpacity style={[styles.gridCard, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
              <View style={[styles.gridIcon, { backgroundColor: 'rgba(243, 163, 20, 0.15)' }]}>
                <Ionicons name="chatbubbles" size={22} color={colors.primaryLight} />
              </View>
              <Text style={[styles.gridTitle, { color: colors.textPrimary }]}>Live Chat</Text>
              <Text style={[styles.gridDesc, { color: colors.textMuted }]}>Chat with AI & Agents</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.gridCard, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
              <View style={[styles.gridIcon, { backgroundColor: 'rgba(16, 185, 129, 0.15)' }]}>
                <Ionicons name="call" size={22} color={colors.success} />
              </View>
              <Text style={[styles.gridTitle, { color: colors.textPrimary }]}>Call Support</Text>
              <Text style={[styles.gridDesc, { color: colors.textMuted }]}>Speak to Executive</Text>
            </TouchableOpacity>
          </View>

          {/* FAQs Section */}
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Frequently Asked Questions</Text>
          {FAQS.map((item, idx) => (
            <View key={idx} style={[styles.faqCard, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
              <Text style={[styles.faqQ, { color: colors.primaryLight }]}>Q: {item.q}</Text>
              <Text style={[styles.faqA, { color: colors.textSecondary }]}>{item.a}</Text>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </ResponsiveContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 16, borderBottomWidth: 1 },
  title: { fontSize: 22, fontWeight: '800' },
  subtitle: { fontSize: 13, marginTop: 2 },
  content: { padding: 16 },

  sosCard: { borderRadius: 16, padding: 16, marginBottom: 20 },
  sosHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  sosTitle: { fontSize: 16, fontWeight: '800', color: '#FFFFFF' },
  sosDesc: { fontSize: 12, color: 'rgba(255,255,255,0.9)', marginTop: 6 },
  sosBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF', paddingVertical: 10, borderRadius: 10, marginTop: 12, gap: 8 },
  sosBtnText: { fontWeight: '800', fontSize: 11 },

  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12 },
  grid: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  gridCard: { flex: 1, borderRadius: 14, padding: 14, borderWidth: 1 },
  gridIcon: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  gridTitle: { fontSize: 14, fontWeight: '700' },
  gridDesc: { fontSize: 11, marginTop: 2 },

  faqCard: { borderRadius: 12, padding: 14, marginBottom: 10, borderWidth: 1 },
  faqQ: { fontSize: 14, fontWeight: '700' },
  faqA: { fontSize: 12, marginTop: 6, lineHeight: 18 },
});
