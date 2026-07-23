import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../config/theme';

export default function Badge({ label, color = COLORS.primary }) {
  return (
    <View style={[styles.badge, { backgroundColor: color }]}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, alignSelf: 'flex-start' },
  text: { color: COLORS.white, fontSize: 12, fontWeight: 'bold' },
});
