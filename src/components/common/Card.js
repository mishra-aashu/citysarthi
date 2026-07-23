import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SHADOWS } from '../../config/theme';
import { useTheme } from '../../context/ThemeContext';

export default function Card({ children, style }) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.cardBorder,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    ...SHADOWS.card,
  },
});
