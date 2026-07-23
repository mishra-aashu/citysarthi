import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export default function VehicleCard({ vehicle, onPress }) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.cardBorder,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.header}>
        <Text style={[styles.name, { color: colors.textPrimary }]}>{vehicle?.name || 'Vehicle Name'}</Text>
        <Text style={[styles.price, { color: colors.primaryLight }]}>₹{vehicle?.price || '999'}/day</Text>
      </View>
      <Text style={[styles.category, { color: colors.textSecondary }]}>
        {vehicle?.category || 'Sedan'} • {vehicle?.fuelType || 'Petrol'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 14, padding: 14, marginVertical: 6, borderWidth: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 16, fontWeight: 'bold' },
  price: { fontSize: 16, fontWeight: 'bold' },
  category: { fontSize: 13, marginTop: 4 },
});
