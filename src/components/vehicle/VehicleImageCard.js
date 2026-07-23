import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../config/theme';

export default function VehicleImageCard({ imageUri, type, height = 150 }) {
  const [hasError, setHasError] = useState(false);

  const getIconForType = (t = '') => {
    const lower = t.toLowerCase();
    if (lower.includes('suv') || lower.includes('muv')) return 'car-estate';
    if (lower.includes('sedan')) return 'car-side';
    if (lower.includes('auto')) return 'subway-variant';
    if (lower.includes('bike') || lower.includes('motor')) return 'motorbike';
    if (lower.includes('luxury') || lower.includes('sports')) return 'car-sports';
    if (lower.includes('tempo') || lower.includes('truck')) return 'truck-cargo-container';
    return 'car-sports';
  };

  if (!imageUri || hasError) {
    return (
      <View style={[styles.placeholderContainer, { height }]}>
        <View style={styles.iconCircle}>
          <MaterialCommunityIcons name={getIconForType(type)} size={48} color={COLORS.primaryLight} />
        </View>
        <View style={styles.badgeRow}>
          <Ionicons name="car-sport" size={14} color={COLORS.accent} />
          <Text style={styles.placeholderText}>CitySarthi Verified Vehicle</Text>
        </View>
      </View>
    );
  }

  return (
    <Image
      source={{ uri: imageUri }}
      style={[styles.img, { height }]}
      onError={() => setHasError(true)}
    />
  );
}

const styles = StyleSheet.create({
  img: {
    width: '100%',
    backgroundColor: COLORS.surfaceLight,
  },
  placeholderContainer: {
    width: '100%',
    backgroundColor: 'rgba(30, 41, 59, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(37, 99, 235, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  placeholderText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textMuted,
    letterSpacing: 0.5,
  },
});
