import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  useWindowDimensions,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import VehicleImageCard from '../../components/vehicle/VehicleImageCard';
import ResponsiveContainer from '../../components/common/ResponsiveContainer';
import { getVehicles, STATIC_VEHICLES } from '../../services/vehicleService';
import { useTheme } from '../../context/ThemeContext';

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
  const { colors, isDark } = useTheme();
  const isDesktop = width >= 768;

  useEffect(() => {
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
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Top Header */}
          <View style={styles.header}>
            <View style={styles.logoRow}>
              <View style={styles.brandContainer}>
                <Ionicons name="car-sport" size={26} color={colors.primaryLight} />
                <Text style={[styles.brandTitle, { color: colors.textPrimary }]}>
                  City<Text style={{ color: colors.primaryLight }}>Sarthi</Text>
                </Text>
              </View>

              <View style={styles.headerActions}>
                <TouchableOpacity style={styles.walletPill}>
                  <Ionicons name="wallet-outline" size={16} color={colors.accent} />
                  <Text style={[styles.walletText, { color: colors.accent }]}>₹1,450</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.iconBtn, { backgroundColor: colors.surface }]}>
                  <Ionicons name="notifications-outline" size={20} color={colors.textPrimary} />
                  <View style={[styles.notifBadge, { backgroundColor: colors.danger }]} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Location Bar */}
            <TouchableOpacity style={[styles.locationBar, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
              <Ionicons name="location" size={18} color={colors.primaryLight} />
              <View style={styles.locationTextContainer}>
                <Text style={[styles.locationLabel, { color: colors.textMuted }]}>YOUR LOCATION</Text>
                <Text style={[styles.locationValue, { color: colors.textPrimary }]} numberOfLines={1}>
                  {pickupLoc}
                </Text>
              </View>
              <Ionicons name="chevron-down" size={18} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* Trip Type Segment Control */}
          <View style={[styles.tripTypeContainer, { backgroundColor: colors.surface, borderColor: colors.cardBorder, borderWidth: 1 }]}>
            <TouchableOpacity
              style={[styles.tripTypeTab, tripType === 'self_drive' && { backgroundColor: colors.primary }]}
              onPress={() => setTripType('self_drive')}
            >
              <MaterialCommunityIcons
                name="car-key"
                size={18}
                color={tripType === 'self_drive' ? '#000000' : colors.textPrimary}
              />
              <Text
                style={[
                  styles.tripTabText,
                  { color: tripType === 'self_drive' ? '#000000' : colors.textPrimary, fontWeight: '800' },
                ]}
              >
                Self-Drive Rental
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tripTypeTab, tripType === 'ride' && { backgroundColor: colors.primary }]}
              onPress={() => setTripType('ride')}
            >
              <Ionicons
                name="car"
                size={18}
                color={tripType === 'ride' ? '#000000' : colors.textPrimary}
              />
              <Text
                style={[
                  styles.tripTabText,
                  { color: tripType === 'ride' ? '#000000' : colors.textPrimary, fontWeight: '800' },
                ]}
              >
                Ride / Taxi
              </Text>
            </TouchableOpacity>
          </View>

          {/* Search / Booking Box */}
          <View style={[styles.searchCard, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
            <Text style={[styles.searchCardTitle, { color: colors.textPrimary }]}>
              {tripType === 'self_drive' ? 'Rent a Vehicle Anywhere, Anytime' : 'Book an Instant Ride'}
            </Text>

            <View style={[styles.inputGroup, { backgroundColor: colors.background, borderColor: colors.cardBorder }]}>
              <Ionicons name="ellipse" size={10} color={colors.success} style={styles.inputDot} />
              <TextInput
                style={[styles.input, { color: colors.textPrimary }]}
                value={pickupLoc}
                onChangeText={setPickupLoc}
                placeholder="Pickup Address / City"
                placeholderTextColor={colors.textMuted}
                underlineColorAndroid="transparent"
              />
            </View>

            {tripType === 'ride' && (
              <View style={[styles.inputGroup, { marginTop: 10, backgroundColor: colors.background, borderColor: colors.cardBorder }]}>
                <Ionicons name="location" size={12} color={colors.danger} style={styles.inputDot} />
                <TextInput
                  style={[styles.input, { color: colors.textPrimary }]}
                  value={dropLoc}
                  onChangeText={setDropLoc}
                  placeholder="Where to? (Destination)"
                  placeholderTextColor={colors.textMuted}
                  underlineColorAndroid="transparent"
                />
              </View>
            )}

            <TouchableOpacity
              style={[styles.searchBtn, { backgroundColor: colors.primary }]}
              onPress={() => onNavigateToTab && onNavigateToTab('Search')}
            >
              <Ionicons name="search" size={18} color="#000000" />
              <Text style={styles.searchBtnText}>
                {tripType === 'self_drive' ? 'Find Available Vehicles' : 'Search Rides & Fares'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Categories Grid */}
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Vehicle Categories</Text>
            <TouchableOpacity onPress={() => onNavigateToTab && onNavigateToTab('Search')}>
              <Text style={[styles.seeAllText, { color: colors.primaryLight }]}>See All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[styles.catCard, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}
                onPress={() => onNavigateToTab && onNavigateToTab('Search')}
              >
                {cat.badge && (
                  <View style={[styles.catBadge, { backgroundColor: colors.accent }]}>
                    <Text style={styles.catBadgeText}>{cat.badge}</Text>
                  </View>
                )}
                <View style={styles.catIconCircle}>
                  <MaterialCommunityIcons name={cat.icon} size={28} color={colors.primaryLight} />
                </View>
                <Text style={[styles.catName, { color: colors.textPrimary }]}>{cat.name}</Text>
                <Text style={[styles.catPrice, { color: colors.textMuted }]}>{cat.price}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Promo Banner Card */}
          <View
            style={[
              styles.promoCard,
              {
                backgroundColor: colors.promoBg,
                borderColor: colors.promoBorder,
              },
            ]}
          >
            <View style={styles.promoContent}>
              <View style={styles.promoTag}>
                <Text style={styles.promoTagText}>MONSOON OFFER</Text>
              </View>
              <Text style={[styles.promoTitle, { color: colors.promoTitle }]}>
                Flat 20% OFF on First Self-Drive
              </Text>
              <Text style={[styles.promoDesc, { color: colors.promoDesc }]}>
                Use Code: <Text style={{ color: colors.accent, fontWeight: '800' }}>CITYSARTHI20</Text>
              </Text>
            </View>
            <Ionicons
              name="gift-outline"
              size={54}
              color={isDark ? 'rgba(255,255,255,0.2)' : 'rgba(243, 163, 20, 0.18)'}
              style={styles.promoBgIcon}
            />
          </View>

          {/* Nearby Available Vehicles */}
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Featured Vehicles Near You</Text>
            <TouchableOpacity onPress={() => onNavigateToTab && onNavigateToTab('Search')}>
              <Text style={[styles.seeAllText, { color: colors.primaryLight }]}>Explore</Text>
            </TouchableOpacity>
          </View>

          <View style={isDesktop ? styles.desktopGrid : null}>
            {vehicles.map((v) => (
              <TouchableOpacity
                key={v.id}
                style={[
                  styles.vehicleCard,
                  { backgroundColor: colors.surface, borderColor: colors.cardBorder },
                  isDesktop && styles.desktopVehicleCard,
                ]}
                onPress={() => onSelectVehicle && onSelectVehicle(v)}
                activeOpacity={0.85}
              >
                <VehicleImageCard imageUri={v.image} type={v.type} height={160} />
                <View style={styles.vehicleBadgeContainer}>
                  <Text style={[styles.vehicleTypeTag, { backgroundColor: isDark ? 'rgba(15, 23, 42, 0.85)' : 'rgba(241, 245, 249, 0.95)', color: isDark ? '#FFFFFF' : '#0F172A' }]}>
                    {v.type}
                  </Text>
                </View>

                <View style={styles.vehicleInfo}>
                  <View style={styles.vehicleRow}>
                    <Text style={[styles.vehicleName, { color: colors.textPrimary }]}>{v.name}</Text>
                    <View style={styles.ratingBox}>
                      <Ionicons name="star" size={14} color={colors.accent} />
                      <Text style={[styles.ratingText, { color: colors.accent }]}>{v.rating}</Text>
                    </View>
                  </View>

                  <Text style={[styles.vehicleLoc, { color: colors.textMuted }]}>
                    <Ionicons name="location-outline" size={12} color={colors.textMuted} /> {v.location}
                  </Text>

                  <View style={styles.specChips}>
                    <View style={[styles.chip, { backgroundColor: colors.background }]}>
                      <Text style={[styles.chipText, { color: colors.textSecondary }]}>{v.transmission}</Text>
                    </View>
                    <View style={[styles.chip, { backgroundColor: colors.background }]}>
                      <Text style={[styles.chipText, { color: colors.textSecondary }]}>{v.fuel}</Text>
                    </View>
                    <View style={[styles.chip, { backgroundColor: colors.background }]}>
                      <Text style={[styles.chipText, { color: colors.textSecondary }]}>{v.seats} Seats</Text>
                    </View>
                  </View>

                  <View style={[styles.cardFooter, { borderTopColor: colors.subtleBorder }]}>
                    <View style={styles.priceContainer}>
                      <Text style={[styles.priceAmount, { color: colors.primaryLight }]}>₹{v.price}</Text>
                      <Text style={[styles.priceUnit, { color: colors.textMuted }]}>/{v.priceUnit}</Text>
                    </View>

                    <TouchableOpacity
                      style={[styles.bookBtn, { backgroundColor: colors.primary }]}
                      onPress={() => onSelectVehicle && onSelectVehicle(v)}
                    >
                      <Text style={styles.bookBtnText}>Book Now</Text>
                      <Ionicons name="arrow-forward" size={14} color="#000000" />
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
  container: { flex: 1 },
  scrollContent: { paddingHorizontal: 18, paddingTop: 14, paddingBottom: 40 },
  header: { marginBottom: 18 },
  logoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  brandContainer: { flexDirection: 'row', alignItems: 'center' },
  brandTitle: { fontSize: 22, fontWeight: 'bold', marginLeft: 8 },
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
  walletText: { fontSize: 13, fontWeight: '700', marginLeft: 4 },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
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
  },
  locationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 14,
    marginTop: 14,
    borderWidth: 1,
  },
  locationTextContainer: { flex: 1, marginLeft: 8 },
  locationLabel: { fontSize: 9, fontWeight: '700', letterSpacing: 0.5 },
  locationValue: { fontSize: 13, fontWeight: '600', marginTop: 1 },

  tripTypeContainer: {
    flexDirection: 'row',
    padding: 5,
    borderRadius: 30,
    marginBottom: 20,
    gap: 4,
  },
  tripTypeTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 11,
    borderRadius: 24,
    gap: 6,
  },
  tripTabText: { fontSize: 13, fontWeight: '700' },

  searchCard: {
    borderRadius: 20,
    padding: 18,
    marginBottom: 24,
    borderWidth: 1,
  },
  searchCardTitle: { fontSize: 16, fontWeight: '800', marginBottom: 14 },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
  },
  inputDot: { marginRight: 8 },
  input: { flex: 1, fontSize: 13, outlineStyle: 'none', outlineWidth: 0 },
  searchBtn: {
    flexDirection: 'row',
    borderRadius: 28,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    gap: 8,
  },
  searchBtnText: { color: '#000000', fontWeight: '800', fontSize: 15, letterSpacing: 0.3 },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4, marginBottom: 14 },
  sectionTitle: { fontSize: 18, fontWeight: '800' },
  seeAllText: { fontSize: 13, fontWeight: '700' },

  categoriesScroll: { marginBottom: 24, marginHorizontal: -18, paddingHorizontal: 18 },
  catCard: {
    width: 112,
    padding: 12,
    paddingTop: 16,
    paddingBottom: 14,
    borderRadius: 16,
    marginRight: 12,
    alignItems: 'center',
    position: 'relative',
    borderWidth: 1,
  },
  catBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    zIndex: 10,
  },
  catBadgeText: { fontSize: 8, fontWeight: '800', color: '#FFFFFF' },
  catIconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: 'rgba(243, 163, 20, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 4,
  },
  catName: { fontSize: 12, fontWeight: '700', textAlign: 'center' },
  catPrice: { fontSize: 10, marginTop: 2, fontWeight: '500' },

  promoCard: {
    borderRadius: 18,
    padding: 18,
    marginBottom: 24,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1,
  },
  promoContent: { zIndex: 2 },
  promoTag: { backgroundColor: '#4F46E5', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, alignSelf: 'flex-start' },
  promoTagText: { fontSize: 9, fontWeight: '800', color: '#EEF2FF', letterSpacing: 0.5 },
  promoTitle: { fontSize: 16, fontWeight: '800', marginTop: 8 },
  promoDesc: { fontSize: 12, marginTop: 4 },
  promoBgIcon: { position: 'absolute', right: -10, bottom: -10, zIndex: 1 },

  vehicleCard: {
    borderRadius: 18,
    marginBottom: 20,
    overflow: 'hidden',
    borderWidth: 1,
  },
  vehicleBadgeContainer: { position: 'absolute', top: 12, left: 12 },
  vehicleTypeTag: {
    fontSize: 10,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  vehicleInfo: { padding: 16 },
  vehicleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  vehicleName: { fontSize: 16, fontWeight: '700' },
  ratingBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(245, 158, 11, 0.15)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, gap: 4 },
  ratingText: { fontSize: 12, fontWeight: '700' },
  vehicleLoc: { fontSize: 12, marginTop: 4 },
  specChips: { flexDirection: 'row', gap: 6, marginTop: 10 },
  chip: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  chipText: { fontSize: 11, fontWeight: '500' },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, paddingTop: 10, borderTopWidth: 1 },
  priceContainer: { flexDirection: 'row', alignItems: 'baseline' },
  priceAmount: { fontSize: 20, fontWeight: '800' },
  priceUnit: { fontSize: 12, marginLeft: 2 },
  bookBtn: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 9, borderRadius: 20, alignItems: 'center', gap: 4 },
  bookBtnText: { color: '#000000', fontWeight: '800', fontSize: 13 },
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
