import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { COLORS } from '../../config/theme';

export default function Loader({ size = 'large' }) {
  return (
    <View style={styles.loader}>
      <ActivityIndicator size={size} color={COLORS.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background },
});
