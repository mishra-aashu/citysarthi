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
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../../config/theme';
import VehicleImageCard from '../../components/vehicle/VehicleImageCard';

const ALL_VEHICLES = [
  {
    id: 's1',
    name: 'Tata Nexon EV',
    type: 'Electric SUV',
    transmission: 'Automatic',
    fuel: 'Electric (312 km range)',
    seats: 5,
    rating: 4.8,
    price: 99,
    location: 'Noida City Center',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80',
    category: 'SUV',
  },
  {
    id: 's2',
    name: 'Honda City',
    type: 'Sedan',
    transmission: 'Automatic',
    fuel: 'Petrol',
    seats: 5,
    rating: 4.9,
    price: 79,
    location: 'Connaught Place, Delhi',
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=600&q=80',
    category: 'Sedan',
  },
  {
    id: 's3',
    name: 'Toyota Innova Crysta',
    type: 'MUV',
    transmission: 'Manual',
    fuel: 'Diesel',
    seats: 7,
    rating: 4.95,
    price: 149,
    location: 'Airport Terminal 3, Delhi',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80',
    category: 'SUV',
  },
  {
    id: 's4',
    name: 'Bajaj RE Auto Taxi',
    type: 'Auto',
    transmission: 'Manual',
    fuel: 'CNG',
    seats: 3,
    rating: 4.6,
    price: 29,
    location: 'Sector 18 Market, Noida',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80',
    category: 'Auto',
  },
];

const FILTERS = ['All', 'SUV', 'Sedan', 'Hatchback', 'Electric', 'Auto', 'Bike'];

export default function SearchScreen({ onSelectVehicle }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredVehicles = ALL_VEHICLES.filter((v) => {
    const matchesFilter = activeFilter === 'All' || v.category === activeFilter || v.type.includes(activeFilter);
    const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) || v.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Search Vehicles</Text>
        <Text style={styles.subtitle}>Find cars, bikes, autos & tempos near you</Text>

        {/* Search Bar Input */}
        <View style={styles.searchBarContainer}>
          <Ionicons name="search" size={20} color={COLORS.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by car model, location or brand..."
            placeholderTextColor={COLORS.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color={COLORS.textMuted} />
            </TouchableOpacity>
          )}
        </View>

        {/* Filter Pills */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll}>
          {FILTERS.map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.filterChip, activeFilter === f && styles.activeFilterChip]}
              onPress={() => setActiveFilter(f)}
            >
              <Text style={[styles.filterText, activeFilter === f && styles.activeFilterText]}>
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.resultCount}>Showing {filteredVehicles.length} vehicles</Text>

        {filteredVehicles.map((v) => (
          <TouchableOpacity
            key={v.id}
            style={styles.card}
            onPress={() => onSelectVehicle && onSelectVehicle(v)}
            activeOpacity={0.85}
          >
            <View style={{ width: 120 }}>
              <VehicleImageCard imageUri={v.image} type={v.type} height={120} />
            </View>
            <View style={styles.cardInfo}>
              <View style={styles.titleRow}>
                <Text style={styles.cardTitle}>{v.name}</Text>
                <View style={styles.ratingBadge}>
                  <Ionicons name="star" size={12} color={COLORS.accent} />
                  <Text style={styles.ratingText}>{v.rating}</Text>
                </View>
              </View>

              <Text style={styles.cardLoc}>
                <Ionicons name="location" size={12} color={COLORS.primaryLight} /> {v.location}
              </Text>

              <View style={styles.tagRow}>
                <Text style={styles.tag}>{v.type}</Text>
                <Text style={styles.tag}>{v.fuel}</Text>
                <Text style={styles.tag}>{v.transmission}</Text>
              </View>

              <View style={styles.cardFooter}>
                <Text style={styles.cardPrice}>₹{v.price}<Text style={styles.unitText}>/hr</Text></Text>
                <TouchableOpacity
                  style={styles.selectBtn}
                  onPress={() => onSelectVehicle && onSelectVehicle(v)}
                >
                  <Text style={styles.selectBtnText}>Select</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: 16, backgroundColor: COLORS.surface, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.06)' },
  title: { fontSize: 22, fontWeight: '800', color: COLORS.textPrimary },
  subtitle: { fontSize: 13, color: COLORS.textSecondary, marginTop: 2 },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 12,
    borderWidth: 1,
    borderColor: COLORS.surfaceLight,
    gap: 8,
  },
  searchInput: { flex: 1, color: COLORS.textPrimary, fontSize: 14 },
  filtersScroll: { marginTop: 12, marginHorizontal: -16, paddingHorizontal: 16 },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.surfaceLight,
  },
  activeFilterChip: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  filterText: { fontSize: 12, fontWeight: '600', color: COLORS.textMuted },
  activeFilterText: { color: COLORS.white },

  listContent: { padding: 16 },
  resultCount: { fontSize: 12, color: COLORS.textMuted, marginBottom: 12, fontWeight: '600' },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    marginBottom: 14,
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  cardImg: { width: 120, height: '100%', backgroundColor: COLORS.surfaceLight },
  cardInfo: { flex: 1, padding: 12 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 15, fontWeight: '700', color: COLORS.textPrimary },
  ratingBadge: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  ratingText: { fontSize: 12, fontWeight: '700', color: COLORS.accent },
  cardLoc: { fontSize: 11, color: COLORS.textMuted, marginTop: 4 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginTop: 8 },
  tag: { fontSize: 10, color: COLORS.textSecondary, backgroundColor: COLORS.background, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  cardPrice: { fontSize: 17, fontWeight: '800', color: COLORS.primaryLight },
  unitText: { fontSize: 11, color: COLORS.textMuted },
  selectBtn: { backgroundColor: COLORS.primary, paddingHorizontal: 14, paddingVertical: 6, borderRadius: 6 },
  selectBtnText: { color: COLORS.white, fontSize: 12, fontWeight: '700' },
});
