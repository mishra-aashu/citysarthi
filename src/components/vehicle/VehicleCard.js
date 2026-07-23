import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../config/theme';

export default function VehicleCard({ vehicle, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.header}>
        <Text style={styles.name}>{vehicle?.name || 'Vehicle Name'}</Text>
        <Text style={styles.price}>₹{vehicle?.price || '999'}/day</Text>
      </View>
      <Text style={styles.category}>{vehicle?.category || 'Sedan'} • {vehicle?.fuelType || 'Petrol'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: COLORS.surface, borderRadius: 14, padding: 14, marginVertical: 6, borderWidth: 1, borderColor: COLORS.surfaceLight },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 16, fontWeight: 'bold', color: COLORS.textPrimary },
  price: { fontSize: 16, fontWeight: 'bold', color: COLORS.primary },
  category: { fontSize: 13, color: COLORS.textSecondary, marginTop: 4 },
});
