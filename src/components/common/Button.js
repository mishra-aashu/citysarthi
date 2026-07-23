import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export default function Button({ title, onPress, variant = 'primary', style, textStyle }) {
  const { colors } = useTheme();
  const isSecondary = variant === 'secondary';

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isSecondary
          ? { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.surfaceLight }
          : { backgroundColor: colors.primary },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.text,
          isSecondary ? { color: colors.textPrimary } : { color: '#000000' },
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { fontSize: 16, fontWeight: '800', letterSpacing: 0.3 },
});
