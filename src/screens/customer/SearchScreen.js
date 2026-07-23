import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import VehicleImageCard from '../../components/vehicle/VehicleImageCard';
import ResponsiveContainer from '../../components/common/ResponsiveContainer';
import { useTheme } from '../../context/ThemeContext';

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
  const { colors } = useTheme();

  const filteredVehicles = ALL_VEHICLES.filter((v) => {
    const matchesFilter = activeFilter === 'All' || v.category === activeFilter || v.type.includes(activeFilter);
    const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) || v.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <ResponsiveContainer>
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.cardBorder }]}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>Search Vehicles</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Find cars, bikes, autos & tempos near you
          </Text>

          {/* Search Bar Input */}
          <View style={[styles.searchBarContainer, { backgroundColor: colors.background, borderColor: colors.surfaceLight }]}>
            <Ionicons name="search" size={20} color={colors.textMuted} />
            <TextInput
              style={[styles.searchInput, { color: colors.textPrimary }]}
              placeholder="Search by car model, location or brand..."
              placeholderTextColor={colors.textMuted}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={18} color={colors.textMuted} />
              </TouchableOpacity>
            )}
          </View>

          {/* Filter Pills */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll}>
            {FILTERS.map((f) => (
              <TouchableOpacity
                key={f}
                style={[
                  styles.filterChip,
                  { backgroundColor: colors.background, borderColor: colors.surfaceLight },
                  activeFilter === f && { backgroundColor: colors.primary, borderColor: colors.primary },
                ]}
                onPress={() => setActiveFilter(f)}
              >
                <Text
                  style={[
                    styles.filterText,
                    { color: colors.textMuted },
                    activeFilter === f && { color: colors.white, fontWeight: '700' },
                  ]}
                >
                  {f}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <ScrollView contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
          <Text style={[styles.resultCount, { color: colors.textMuted }]}>
            Showing {filteredVehicles.length} vehicles
          </Text>

          {filteredVehicles.map((v) => (
            <TouchableOpacity
              key={v.id}
              style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}
              onPress={() => onSelectVehicle && onSelectVehicle(v)}
              activeOpacity={0.85}
            >
              <View style={{ width: 120 }}>
                <VehicleImageCard imageUri={v.image} type={v.type} height={120} />
              </View>
              <View style={styles.cardInfo}>
                <View style={styles.titleRow}>
                  <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>{v.name}</Text>
                  <View style={styles.ratingBadge}>
                    <Ionicons name="star" size={12} color={colors.accent} />
                    <Text style={[styles.ratingText, { color: colors.accent }]}>{v.rating}</Text>
                  </View>
                </View>

                <Text style={[styles.cardLoc, { color: colors.textMuted }]}>
                  <Ionicons name="location" size={12} color={colors.primaryLight} /> {v.location}
                </Text>

                <View style={styles.tagRow}>
                  <Text style={[styles.tag, { color: colors.textSecondary, backgroundColor: colors.background }]}>
                    {v.type}
                  </Text>
                  <Text style={[styles.tag, { color: colors.textSecondary, backgroundColor: colors.background }]}>
                    {v.fuel}
                  </Text>
                  <Text style={[styles.tag, { color: colors.textSecondary, backgroundColor: colors.background }]}>
                    {v.transmission}
                  </Text>
                </View>

                <View style={styles.cardFooter}>
                  <Text style={[styles.cardPrice, { color: colors.primaryLight }]}>
                    ₹{v.price}<Text style={[styles.unitText, { color: colors.textMuted }]}>/hr</Text>
                  </Text>
                  <TouchableOpacity
                    style={[styles.selectBtn, { backgroundColor: colors.primary }]}
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
    </ResponsiveContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 16, borderBottomWidth: 1 },
  title: { fontSize: 22, fontWeight: '800' },
  subtitle: { fontSize: 13, marginTop: 2 },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 12,
    borderWidth: 1,
    gap: 8,
  },
  searchInput: { flex: 1, fontSize: 14 },
  filtersScroll: { marginTop: 12, marginHorizontal: -16, paddingHorizontal: 16 },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
  },
  filterText: { fontSize: 12, fontWeight: '600' },

  listContent: { padding: 16 },
  resultCount: { fontSize: 12, marginBottom: 12, fontWeight: '600' },
  card: {
    borderRadius: 14,
    marginBottom: 14,
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1,
  },
  cardInfo: { flex: 1, padding: 12 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 15, fontWeight: '700' },
  ratingBadge: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  ratingText: { fontSize: 12, fontWeight: '700' },
  cardLoc: { fontSize: 11, marginTop: 4 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginTop: 8 },
  tag: { fontSize: 10, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  cardPrice: { fontSize: 17, fontWeight: '800' },
  unitText: { fontSize: 11 },
  selectBtn: { paddingHorizontal: 16, paddingVertical: 7, borderRadius: 20 },
  selectBtnText: { color: '#000000', fontSize: 12, fontWeight: '800' },
});
