import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../config/theme';

export default function LocationPicker({ pickup, drop, onSelectPickup, onSelectDrop }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.inputBox} onPress={onSelectPickup}>
        <Text style={styles.label}>Pickup Location</Text>
        <Text style={styles.value}>{pickup || 'Select Pickup Location'}</Text>
      </TouchableOpacity>
      <View style={styles.divider} />
      <TouchableOpacity style={styles.inputBox} onPress={onSelectDrop}>
        <Text style={styles.label}>Drop Location</Text>
        <Text style={styles.value}>{drop || 'Select Drop Location'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: COLORS.surface, borderRadius: 12, padding: 12 },
  inputBox: { paddingVertical: 6 },
  label: { fontSize: 11, color: COLORS.textMuted, textTransform: 'uppercase' },
  value: { fontSize: 14, color: COLORS.textPrimary, fontWeight: '500', marginTop: 2 },
  divider: { height: 1, backgroundColor: COLORS.surfaceLight, marginVertical: 8 },
});
