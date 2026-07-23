import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import VehicleImageCard from '../../components/vehicle/VehicleImageCard';
import ResponsiveContainer from '../../components/common/ResponsiveContainer';
import { useTheme } from '../../context/ThemeContext';

export default function VehicleDetailsScreen({ vehicle, onBack, onBookNow }) {
  const { colors, isDark } = useTheme();

  const v = vehicle || {
    name: 'Hyundai Creta 2023',
    type: 'SUV',
    transmission: 'Automatic',
    fuel: 'Petrol',
    seats: 5,
    rating: 4.9,
    trips: 142,
    price: 89,
    priceUnit: 'hr',
    location: 'Connaught Place, Delhi',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80',
  };

  return (
    <ResponsiveContainer>
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Top Header */}
        <View style={[styles.topHeader, { backgroundColor: colors.surface, borderBottomColor: colors.cardBorder }]}>
          <TouchableOpacity style={[styles.backBtn, { backgroundColor: colors.background }]} onPress={onBack}>
            <Ionicons name="arrow-back" size={20} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={[styles.topHeaderTitle, { color: colors.textPrimary }]}>{v.name}</Text>
          <TouchableOpacity style={[styles.shareBtn, { backgroundColor: colors.background }]}>
            <Ionicons name="share-social-outline" size={20} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Main Image */}
          <View style={styles.imageContainer}>
            <VehicleImageCard imageUri={v.image} type={v.type} height={220} />
            <View style={[styles.ratingPill, { backgroundColor: isDark ? 'rgba(15,23,42,0.85)' : 'rgba(255,255,255,0.9)' }]}>
              <Ionicons name="star" size={14} color={colors.accent} />
              <Text style={[styles.ratingText, { color: colors.accent }]}>{v.rating} ({v.trips || 120} trips)</Text>
            </View>
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.titleRow}>
              <View>
                <Text style={[styles.vehicleName, { color: colors.textPrimary }]}>{v.name}</Text>
                <Text style={[styles.vehicleType, { color: colors.textMuted }]}>{v.type} • {v.fuel}</Text>
              </View>
              <View style={styles.priceBox}>
                <Text style={[styles.priceAmount, { color: colors.primaryLight }]}>₹{v.price}</Text>
                <Text style={[styles.priceUnit, { color: colors.textMuted }]}>/{v.priceUnit || 'hr'}</Text>
              </View>
            </View>

            <View style={styles.locationRow}>
              <Ionicons name="location" size={16} color={colors.primaryLight} />
              <Text style={[styles.locationText, { color: colors.textSecondary }]}>{v.location}</Text>
            </View>

            {/* Key Features Grid */}
            <Text style={[styles.sectionHeader, { color: colors.textPrimary }]}>Specifications & Features</Text>
            <View style={styles.specsGrid}>
              <View style={[styles.specBox, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
                <MaterialCommunityIcons name="car-shift-pattern" size={24} color={colors.primaryLight} />
                <Text style={[styles.specVal, { color: colors.textPrimary }]}>{v.transmission}</Text>
                <Text style={[styles.specLbl, { color: colors.textMuted }]}>Gearbox</Text>
              </View>

              <View style={[styles.specBox, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
                <MaterialCommunityIcons name="car-seat" size={24} color={colors.primaryLight} />
                <Text style={[styles.specVal, { color: colors.textPrimary }]}>{v.seats} Seats</Text>
                <Text style={[styles.specLbl, { color: colors.textMuted }]}>Capacity</Text>
              </View>

              <View style={[styles.specBox, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
                <MaterialCommunityIcons name="fuel" size={24} color={colors.primaryLight} />
                <Text style={[styles.specVal, { color: colors.textPrimary }]}>{v.fuel}</Text>
                <Text style={[styles.specLbl, { color: colors.textMuted }]}>Fuel Type</Text>
              </View>

              <View style={[styles.specBox, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
                <MaterialCommunityIcons name="shield-check" size={24} color={colors.primaryLight} />
                <Text style={[styles.specVal, { color: colors.textPrimary }]}>Zero Dep</Text>
                <Text style={[styles.specLbl, { color: colors.textMuted }]}>Insured</Text>
              </View>
            </View>

            {/* Fare Breakdown */}
            <Text style={[styles.sectionHeader, { color: colors.textPrimary }]}>Fair Fare Breakdown</Text>
            <View style={[styles.fareCard, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
              <View style={styles.fareRow}>
                <Text style={[styles.fareLbl, { color: colors.textSecondary }]}>Base Rental Rate</Text>
                <Text style={[styles.fareVal, { color: colors.textPrimary }]}>₹{v.price} / hr</Text>
              </View>

              <View style={styles.fareRow}>
                <Text style={[styles.fareLbl, { color: colors.textSecondary }]}>Free Kilometers Included</Text>
                <Text style={[styles.fareVal, { color: colors.textPrimary }]}>10 km / hr</Text>
              </View>

              <View style={styles.fareRow}>
                <Text style={[styles.fareLbl, { color: colors.textSecondary }]}>Refundable Security Deposit</Text>
                <Text style={[styles.fareVal, { color: colors.textPrimary }]}>₹1,000</Text>
              </View>

              <View style={styles.fareRow}>
                <Text style={[styles.fareLbl, { color: colors.textSecondary }]}>Damage Protection Insurance</Text>
                <Text style={[styles.fareVal, { color: colors.textPrimary }]}>Included</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Fixed Bottom Booking Bar */}
        <View style={[styles.bottomBar, { backgroundColor: colors.surface, borderTopColor: colors.cardBorder }]}>
          <View style={styles.totalBox}>
            <Text style={[styles.totalLbl, { color: colors.textMuted }]}>Total Estimated</Text>
            <Text style={[styles.totalVal, { color: colors.primaryLight }]}>
              ₹{v.price * 24} <Text style={[styles.totalDuration, { color: colors.textMuted }]}> (24 hrs)</Text>
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.bookNowBtn, { backgroundColor: colors.primary }]}
            onPress={() => onBookNow && onBookNow(v)}
          >
            <Text style={styles.bookNowText}>Proceed to Book</Text>
            <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
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
  shareBtn: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },

  scrollContent: { paddingBottom: 100 },
  imageContainer: { position: 'relative' },
  ratingPill: { position: 'absolute', bottom: 12, right: 12, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20, gap: 4 },
  ratingText: { fontSize: 12, fontWeight: '700' },

  detailsContainer: { padding: 16 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  vehicleName: { fontSize: 20, fontWeight: '800' },
  vehicleType: { fontSize: 13, marginTop: 2 },
  priceBox: { alignItems: 'flex-end' },
  priceAmount: { fontSize: 22, fontWeight: '900' },
  priceUnit: { fontSize: 11 },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10, gap: 4 },
  locationText: { fontSize: 13 },

  sectionHeader: { fontSize: 15, fontWeight: '700', marginTop: 20, marginBottom: 12 },
  specsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  specBox: { width: '48%', borderRadius: 12, padding: 12, borderWidth: 1 },
  specVal: { fontSize: 13, fontWeight: '700', marginTop: 6 },
  specLbl: { fontSize: 11, marginTop: 1 },

  fareCard: { borderRadius: 14, padding: 14, borderWidth: 1 },
  fareRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  fareLbl: { fontSize: 13 },
  fareVal: { fontSize: 13, fontWeight: '700' },

  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, borderTopWidth: 1 },
  totalBox: {},
  totalLbl: { fontSize: 11 },
  totalVal: { fontSize: 18, fontWeight: '900' },
  totalDuration: { fontSize: 11, fontWeight: '400' },
  bookNowBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 10, gap: 6 },
  bookNowText: { color: '#FFFFFF', fontWeight: '800', fontSize: 14 },
});
