import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../config/theme';

export default function VehicleCategoryTile({ title, icon, selected, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.tile, selected && styles.selectedTile]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, selected && styles.selectedText]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tile: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.surfaceLight,
  },
  selectedTile: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  text: { color: COLORS.textSecondary, fontSize: 14, fontWeight: '500' },
  selectedText: { color: COLORS.white, fontWeight: 'bold' },
});
