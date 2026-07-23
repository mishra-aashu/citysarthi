import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../config/theme';

export default function MapViewContainer({ children }) {
  return (
    <View style={styles.mapContainer}>
      <Text style={styles.placeholderText}>[ Map View Component Placeholder ]</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    height: 250,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    justify: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.surfaceLight,
    overflow: 'hidden',
  },
  placeholderText: { color: COLORS.textSecondary, fontSize: 14 },
});
