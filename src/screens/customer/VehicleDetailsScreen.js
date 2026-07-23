import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../../config/theme';
import VehicleImageCard from '../../components/vehicle/VehicleImageCard';

export default function VehicleDetailsScreen({ vehicle, onBack, onBookNow }) {
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
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.topHeader}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Ionicons name="arrow-back" size={20} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.topHeaderTitle}>{v.name}</Text>
        <TouchableOpacity style={styles.shareBtn}>
          <Ionicons name="share-social-outline" size={20} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Main Image */}
        <View style={styles.imageContainer}>
          <VehicleImageCard imageUri={v.image} type={v.type} height={220} />
          <View style={styles.ratingPill}>
            <Ionicons name="star" size={14} color={COLORS.accent} />
            <Text style={styles.ratingText}>{v.rating} ({v.trips || 120} trips)</Text>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.titleRow}>
            <View>
              <Text style={styles.vehicleName}>{v.name}</Text>
              <Text style={styles.vehicleType}>{v.type} • {v.fuel}</Text>
            </View>
            <View style={styles.priceBox}>
              <Text style={styles.priceAmount}>₹{v.price}</Text>
              <Text style={styles.priceUnit}>/{v.priceUnit || 'hr'}</Text>
            </View>
          </View>

          <View style={styles.locationRow}>
            <Ionicons name="location" size={16} color={COLORS.primaryLight} />
            <Text style={styles.locationText}>{v.location}</Text>
          </View>

          {/* Key Features Grid */}
          <Text style={styles.sectionHeader}>Specifications & Features</Text>
          <View style={styles.specsGrid}>
            <View style={styles.specBox}>
              <MaterialCommunityIcons name="car-shift-pattern" size={24} color={COLORS.primaryLight} />
              <Text style={styles.specVal}>{v.transmission}</Text>
              <Text style={styles.specLbl}>Gearbox</Text>
            </View>

            <View style={styles.specBox}>
              <MaterialCommunityIcons name="car-seat" size={24} color={COLORS.primaryLight} />
              <Text style={styles.specVal}>{v.seats} Seats</Text>
              <Text style={styles.specLbl}>Capacity</Text>
            </View>

            <View style={styles.specBox}>
              <MaterialCommunityIcons name="fuel" size={24} color={COLORS.primaryLight} />
              <Text style={styles.specVal}>{v.fuel}</Text>
              <Text style={styles.specLbl}>Fuel Type</Text>
            </View>

            <View style={styles.specBox}>
              <MaterialCommunityIcons name="shield-check" size={24} color={COLORS.primaryLight} />
              <Text style={styles.specVal}>Zero Dep</Text>
              <Text style={styles.specLbl}>Insured</Text>
            </View>
          </View>

          {/* Fare Breakdown */}
          <Text style={styles.sectionHeader}>Fair Fare Breakdown</Text>
          <View style={styles.fareCard}>
            <View style={styles.fareRow}>
              <Text style={styles.fareLbl}>Base Rental Rate</Text>
              <Text style={styles.fareVal}>₹{v.price} / hr</Text>
            </View>

            <View style={styles.fareRow}>
              <Text style={styles.fareLbl}>Free Kilometers Included</Text>
              <Text style={styles.fareVal}>10 km / hr</Text>
            </View>

            <View style={styles.fareRow}>
              <Text style={styles.fareLbl}>Refundable Security Deposit</Text>
              <Text style={styles.fareVal}>₹1,000</Text>
            </View>

            <View style={styles.fareRow}>
              <Text style={styles.fareLbl}>Damage Protection Insurance</Text>
              <Text style={styles.fareVal}>Included</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Bottom Booking Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.totalBox}>
          <Text style={styles.totalLbl}>Total Estimated</Text>
          <Text style={styles.totalVal}>₹{v.price * 24} <Text style={styles.totalDuration}>(24 hrs)</Text></Text>
        </View>

        <TouchableOpacity style={styles.bookNowBtn} onPress={() => onBookNow && onBookNow(v)}>
          <Text style={styles.bookNowText}>Proceed to Book</Text>
          <Ionicons name="arrow-forward" size={16} color={COLORS.white} />
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
  shareBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center' },

  scrollContent: { paddingBottom: 100 },
  imageContainer: { position: 'relative' },
  carImg: { width: '100%', height: 220, backgroundColor: COLORS.surfaceLight },
  ratingPill: { position: 'absolute', bottom: 12, right: 12, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(15,23,42,0.85)', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20, gap: 4 },
  ratingText: { color: COLORS.accent, fontSize: 12, fontWeight: '700' },

  detailsContainer: { padding: 16 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  vehicleName: { fontSize: 20, fontWeight: '800', color: COLORS.textPrimary },
  vehicleType: { fontSize: 13, color: COLORS.textMuted, marginTop: 2 },
  priceBox: { alignItems: 'flex-end' },
  priceAmount: { fontSize: 22, fontWeight: '900', color: COLORS.primaryLight },
  priceUnit: { fontSize: 11, color: COLORS.textMuted },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10, gap: 4 },
  locationText: { fontSize: 13, color: COLORS.textSecondary },

  sectionHeader: { fontSize: 15, fontWeight: '700', color: COLORS.textPrimary, marginTop: 20, marginBottom: 12 },
  specsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  specBox: { width: '48%', backgroundColor: COLORS.surface, borderRadius: 12, padding: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  specVal: { fontSize: 13, fontWeight: '700', color: COLORS.textPrimary, marginTop: 6 },
  specLbl: { fontSize: 11, color: COLORS.textMuted, marginTop: 1 },

  fareCard: { backgroundColor: COLORS.surface, borderRadius: 14, padding: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  fareRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  fareLbl: { fontSize: 13, color: COLORS.textSecondary },
  fareVal: { fontSize: 13, fontWeight: '700', color: COLORS.textPrimary },

  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.surface, paddingHorizontal: 16, paddingVertical: 14, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.08)' },
  totalBox: {},
  totalLbl: { fontSize: 11, color: COLORS.textMuted },
  totalVal: { fontSize: 18, fontWeight: '900', color: COLORS.primaryLight },
  totalDuration: { fontSize: 11, color: COLORS.textMuted, fontWeight: '400' },
  bookNowBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.primary, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 10, gap: 6 },
  bookNowText: { color: COLORS.white, fontWeight: '800', fontSize: 14 },
});
