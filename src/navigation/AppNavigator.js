import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomerStack from './CustomerStack';
import { COLORS } from '../config/theme';

export default function AppNavigator() {
  return (
    <View style={styles.container}>
      <CustomerStack />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
});
