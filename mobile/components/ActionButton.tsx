import { StyleSheet, Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { Text } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';

export function ActionButton({
  label,
  onPress,
  variant = 'primary',
}: {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'ghost';
}) {
  const scheme = useColorScheme() ?? 'light';
  const palette = Colors[scheme];
  const textColor = variant === 'primary' ? '#fff' : palette.text;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        variant === 'primary'
          ? { backgroundColor: palette.accent }
          : { backgroundColor: 'transparent', borderColor: palette.border, borderWidth: 1 },
        pressed && { opacity: 0.75 },
      ]}
    >
      <Text style={styles.label} lightColor={textColor} darkColor={textColor}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
});
