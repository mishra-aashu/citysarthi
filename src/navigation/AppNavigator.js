import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomerStack from './CustomerStack';
import { useTheme } from '../context/ThemeContext';

export default function AppNavigator() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <CustomerStack />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
