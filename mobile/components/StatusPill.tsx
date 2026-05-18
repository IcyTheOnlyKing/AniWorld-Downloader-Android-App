import { StyleSheet, View } from 'react-native';

import Colors from '@/constants/Colors';
import { Text } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';

export function StatusPill({ label, tone = 'accent' }: { label: string; tone?: 'accent' | 'success' | 'warning' }) {
  const scheme = useColorScheme() ?? 'light';
  const palette = Colors[scheme];
  const backgroundColor =
    tone === 'success' ? palette.success : tone === 'warning' ? palette.warning : palette.accent;

  return (
    <View style={[styles.container, { backgroundColor }]}> 
      <Text style={styles.label} lightColor="#fff" darkColor="#fff">
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
  },
});
