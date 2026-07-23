import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export default function ResponsiveContainer({ children, maxWidth = 1200, style }) {
  const { width } = useWindowDimensions();
  const { colors } = useTheme();
  const isDesktop = width >= 768;

  return (
    <View style={[styles.outer, { backgroundColor: colors.background }]}>
      <View
        style={[
          styles.inner,
          isDesktop && { maxWidth, alignSelf: 'center', width: '100%' },
          style,
        ]}
      >
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    width: '100%',
  },
  inner: {
    flex: 1,
    width: '100%',
  },
});
