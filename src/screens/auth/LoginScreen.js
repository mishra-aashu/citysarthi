import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react me' in react-native ? No, standard imports:
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { COLORS } from '../../config/theme';

export default function LoginScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>CitySarthi Login</Text>
        <Text style={styles.subtitle}>Enter your mobile number to get started</Text>
        {/* Placeholder Login Form */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: COLORS.textPrimary },
  subtitle: { fontSize: 14, color: COLORS.textSecondary, marginTop: 8 },
});
