import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../../config/theme';
import VehicleImageCard from '../../components/vehicle/VehicleImageCard';
import ResponsiveContainer from '../../components/common/ResponsiveContainer';

import { getVehicles, STATIC_VEHICLES } from '../../services/vehicleService';

const { width } = Dimensions.get('window');

const CATEGORIES = [
  { id: 'self_drive', name: 'Self-Drive', icon: 'car-key', iconType: 'material', badge: 'Popular', price: 'from ₹49/hr' },
  { id: 'sedan', name: 'Sedan', icon: 'car-side', iconType: 'material', badge: 'Comfort', price: 'from ₹14/km' },
  { id: 'suv', name: 'SUV / MUV', icon: 'car-estate', iconType: 'material', badge: '7 Seater', price: 'from ₹18/km' },
  { id: 'auto', name: 'Auto Taxi', icon: 'subway-variant', iconType: 'material', badge: 'Fast', price: 'from ₹9/km' },
  { id: 'bike', name: 'Bike Taxi', icon: 'motorbike', iconType: 'material', badge: 'Cheap', price: 'from ₹6/km' },
  { id: 'luxury', name: 'Luxury', icon: 'car-sports', iconType: 'material', badge: 'VIP', price: 'from ₹99/hr' },
  { id: 'tempo', name: 'Tempo', icon: 'truck-cargo-container', iconType: 'material', badge: 'Cargo', price: 'from ₹25/km' },
  { id: 'bus', name: 'Bus / Van', icon: 'bus', iconType: 'material', badge: 'Group', price: 'from ₹45/km' },
];

export default function HomeScreen({ onSelectVehicle, onNavigateToTab }) {
  const [tripType, setTripType] = useState('self_drive'); // 'self_drive' or 'ride'
  const [pickupLoc, setPickupLoc] = useState('Current Location (Sector 62, Noida)');
  const [dropLoc, setDropLoc] = useState('');
  const [vehicles, setVehicles] = useState(STATIC_VEHICLES);
  const [loading, setLoading] = useState(false);
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  React.useEffect(() => {
    let isMounted = true;
    setLoading(true);
    getVehicles({ tripType }).then((data) => {
      if (isMounted && data && data.length > 0) {
        setVehicles(data);
      }
      setLoading(false);
    });
    return () => { isMounted = false; };
  }, [tripType]);


  return (
    <ResponsiveContainer>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Top Header */}
        <View style={styles.header}>
          <View style={styles.logoRow}>
            <View style={styles.brandContainer}>
              <Ionicons name="car-sport" size={26} color={COLORS.primaryLight} />
              <Text style={styles.brandTitle}>City<Text style={styles.brandHighlight}>Sarthi</Text></Text>
            </View>

            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.walletPill}>
                <Ionicons name="wallet-outline" size={16} color={COLORS.accent} />
                <Text style={styles.walletText}>₹1,450</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.iconBtn}>
                <Ionicons name="notifications-outline" size={20} color={COLORS.textPrimary} />
                <View style={styles.notifBadge} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Location Bar */}
          <TouchableOpacity style={styles.locationBar}>
            <Ionicons name="location" size={18} color={COLORS.primaryLight} />
            <View style={styles.locationTextContainer}>
              <Text style={styles.locationLabel}>YOUR LOCATION</Text>
              <Text style={styles.locationValue} numberOfLines={1}>{pickupLoc}</Text>
            </View>
            <Ionicons name="chevron-down" size={18} color={COLORS.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Trip Type Segment Control */}
        <View style={styles.tripTypeContainer}>
          <TouchableOpacity
            style={[styles.tripTypeTab, tripType === 'self_drive' && styles.tripTypeTabActive]}
            onPress={() => setTripType('self_drive')}
          >
            <MaterialCommunityIcons
              name="car-key"
              size={18}
              color={tripType === 'self_drive' ? COLORS.white : COLORS.textMuted}
            />
            <Text style={[styles.tripTabText, tripType === 'self_drive' && styles.tripTabTextActive]}>
              Self-Drive Rental
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tripTypeTab, tripType === 'ride' && styles.tripTypeTabActive]}
            onPress={() => setTripType('ride')}
          >
            <Ionicons
              name="car"
              size={18}
              color={tripType === 'ride' ? COLORS.white : COLORS.textMuted}
            />
            <Text style={[styles.tripTabText, tripType === 'ride' && styles.tripTabTextActive]}>
              Ride / Taxi
            </Text>
          </TouchableOpacity>
        </View>

        {/* Search / Booking Box */}
        <View style={styles.searchCard}>
          <Text style={styles.searchCardTitle}>
            {tripType === 'self_drive' ? 'Rent a Vehicle Anywhere, Anytime' : 'Book an Instant Ride'}
          </Text>

          <View style={styles.inputGroup}>
            <Ionicons name="ellipse" size={10} color={COLORS.success} style={styles.inputDot} />
            <TextInput
              style={styles.input}
              value={pickupLoc}
              onChangeText={setPickupLoc}
              placeholder="Pickup Address / City"
              placeholderTextColor={COLORS.textMuted}
            />
          </View>

          {tripType === 'ride' && (
            <View style={[styles.inputGroup, { marginTop: 10 }]}>
              <Ionicons name="location" size={12} color={COLORS.danger} style={styles.inputDot} />
              <TextInput
                style={styles.input}
                value={dropLoc}
                onChangeText={setDropLoc}
                placeholder="Where to? (Destination)"
                placeholderTextColor={COLORS.textMuted}
              />
            </View>
          )}

          <TouchableOpacity
            style={styles.searchBtn}
            onPress={() => onNavigateToTab && onNavigateToTab('Search')}
          >
            <Ionicons name="search" size={18} color={COLORS.white} />
            <Text style={styles.searchBtnText}>
              {tripType === 'self_drive' ? 'Find Available Vehicles' : 'Search Rides & Fares'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Categories Grid */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Vehicle Categories</Text>
          <TouchableOpacity onPress={() => onNavigateToTab && onNavigateToTab('Search')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={styles.catCard}
              onPress={() => onNavigateToTab && onNavigateToTab('Search')}
            >
              {cat.badge && (
                <View style={styles.catBadge}>
                  <Text style={styles.catBadgeText}>{cat.badge}</Text>
                </View>
              )}
              <View style={styles.catIconCircle}>
                <MaterialCommunityIcons name={cat.icon} size={28} color={COLORS.primaryLight} />
              </View>
              <Text style={styles.catName}>{cat.name}</Text>
              <Text style={styles.catPrice}>{cat.price}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Promo Banner Card */}
        <View style={styles.promoCard}>
          <View style={styles.promoContent}>
            <View style={styles.promoTag}>
              <Text style={styles.promoTagText}>MONSOON OFFER</Text>
            </View>
            <Text style={styles.promoTitle}>Flat 20% OFF on First Self-Drive</Text>
            <Text style={styles.promoDesc}>Use Code: <Text style={styles.codeText}>CITYSARTHI20</Text></Text>
          </View>
          <Ionicons name="gift-outline" size={54} color="rgba(255,255,255,0.2)" style={styles.promoBgIcon} />
        </View>

        {/* Nearby Available Vehicles */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Vehicles Near You</Text>
          <TouchableOpacity onPress={() => onNavigateToTab && onNavigateToTab('Search')}>
            <Text style={styles.seeAllText}>Explore</Text>
          </TouchableOpacity>
        </View>

        <View style={isDesktop ? styles.desktopGrid : null}>
          {vehicles.map((v) => (
            <TouchableOpacity
              key={v.id}
              style={[styles.vehicleCard, isDesktop && styles.desktopVehicleCard]}
              onPress={() => onSelectVehicle && onSelectVehicle(v)}
              activeOpacity={0.85}
            >
              <VehicleImageCard imageUri={v.image} type={v.type} height={160} />
              <View style={styles.vehicleBadgeContainer}>
                <Text style={styles.vehicleTypeTag}>{v.type}</Text>
              </View>

              <View style={styles.vehicleInfo}>
                <View style={styles.vehicleRow}>
                  <Text style={styles.vehicleName}>{v.name}</Text>
                  <View style={styles.ratingBox}>
                    <Ionicons name="star" size={14} color={COLORS.accent} />
                    <Text style={styles.ratingText}>{v.rating}</Text>
                  </View>
                </View>

                <Text style={styles.vehicleLoc}>
                  <Ionicons name="location-outline" size={12} color={COLORS.textMuted} /> {v.location}
                </Text>

                <View style={styles.specChips}>
                  <View style={styles.chip}><Text style={styles.chipText}>{v.transmission}</Text></View>
                  <View style={styles.chip}><Text style={styles.chipText}>{v.fuel}</Text></View>
                  <View style={styles.chip}><Text style={styles.chipText}>{v.seats} Seats</Text></View>
                </View>

                <View style={styles.cardFooter}>
                  <View style={styles.priceContainer}>
                    <Text style={styles.priceAmount}>₹{v.price}</Text>
                    <Text style={styles.priceUnit}>/{v.priceUnit}</Text>
                  </View>

                  <TouchableOpacity
                    style={styles.bookBtn}
                    onPress={() => onSelectVehicle && onSelectVehicle(v)}
                  >
                    <Text style={styles.bookBtnText}>Book Now</Text>
                    <Ionicons name="arrow-forward" size={14} color={COLORS.white} />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
    </ResponsiveContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { paddingHorizontal: 16, paddingTop: 12 },
  header: { marginBottom: 16 },
  logoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  brandContainer: { flexDirection: 'row', alignItems: 'center' },
  brandTitle: { fontSize: 22, fontWeight: 'bold', color: COLORS.textPrimary, marginLeft: 8 },
  brandHighlight: { color: COLORS.primaryLight },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  walletPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  walletText: { fontSize: 13, fontWeight: '700', color: COLORS.accent, marginLeft: 4 },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notifBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.danger,
  },
  locationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: COLORS.surfaceLight,
  },
  locationTextContainer: { flex: 1, marginLeft: 8 },
  locationLabel: { fontSize: 9, fontWeight: '700', color: COLORS.textMuted, letterSpacing: 0.5 },
  locationValue: { fontSize: 13, fontWeight: '600', color: COLORS.textPrimary, marginTop: 1 },

  tripTypeContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    padding: 4,
    borderRadius: 12,
    marginBottom: 16,
  },
  tripTypeTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  tripTypeTabActive: { backgroundColor: COLORS.primary },
  tripTabText: { fontSize: 13, fontWeight: '600', color: COLORS.textMuted },
  tripTabTextActive: { color: COLORS.white },

  searchCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  searchCardTitle: { fontSize: 15, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 12 },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: COLORS.surfaceLight,
  },
  inputDot: { marginRight: 8 },
  input: { flex: 1, color: COLORS.textPrimary, fontSize: 13 },
  searchBtn: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 14,
    gap: 8,
  },
  searchBtnText: { color: COLORS.white, fontWeight: '700', fontSize: 14 },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: COLORS.textPrimary },
  seeAllText: { fontSize: 13, fontWeight: '600', color: COLORS.primaryLight },

  categoriesScroll: { marginBottom: 20, marginHorizontal: -16, paddingHorizontal: 16 },
  catCard: {
    backgroundColor: COLORS.surface,
    width: 105,
    padding: 12,
    borderRadius: 14,
    marginRight: 10,
    alignItems: 'center',
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  catBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: COLORS.accent,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 6,
  },
  catBadgeText: { fontSize: 8, fontWeight: '800', color: COLORS.black },
  catIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(37, 99, 235, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 4,
  },
  catName: { fontSize: 12, fontWeight: '700', color: COLORS.textPrimary, textAlign: 'center' },
  catPrice: { fontSize: 10, color: COLORS.textMuted, marginTop: 2 },

  promoCard: {
    backgroundColor: '#1E1B4B',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#4338CA',
  },
  promoContent: { zIndex: 2 },
  promoTag: { backgroundColor: '#4F46E5', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, alignSelf: 'flex-start' },
  promoTagText: { fontSize: 9, fontWeight: '800', color: '#EEF2FF', letterSpacing: 0.5 },
  promoTitle: { fontSize: 16, fontWeight: '800', color: COLORS.white, marginTop: 8 },
  promoDesc: { fontSize: 12, color: '#C7D2FE', marginTop: 4 },
  codeText: { fontWeight: '800', color: COLORS.accent },
  promoBgIcon: { position: 'absolute', right: -10, bottom: -10, zIndex: 1 },

  vehicleCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  vehicleImg: { width: '100%', height: 160, backgroundColor: COLORS.surfaceLight },
  vehicleBadgeContainer: { position: 'absolute', top: 12, left: 12 },
  vehicleTypeTag: {
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  vehicleInfo: { padding: 14 },
  vehicleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  vehicleName: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary },
  ratingBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(245, 158, 11, 0.15)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, gap: 4 },
  ratingText: { fontSize: 12, fontWeight: '700', color: COLORS.accent },
  vehicleLoc: { fontSize: 12, color: COLORS.textMuted, marginTop: 4 },
  specChips: { flexDirection: 'row', gap: 6, marginTop: 10 },
  chip: { backgroundColor: COLORS.background, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  chipText: { fontSize: 11, color: COLORS.textSecondary, fontWeight: '500' },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, paddingTop: 10, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)' },
  priceContainer: { flexDirection: 'row', alignItems: 'baseline' },
  priceAmount: { fontSize: 20, fontWeight: '800', color: COLORS.primaryLight },
  priceUnit: { fontSize: 12, color: COLORS.textMuted, marginLeft: 2 },
  bookBtn: { flexDirection: 'row', backgroundColor: COLORS.primary, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8, alignItems: 'center', gap: 4 },
  bookBtnText: { color: COLORS.white, fontWeight: '700', fontSize: 13 },
  desktopGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'space-between',
  },
  desktopVehicleCard: {
    width: '48.5%',
  },
});
