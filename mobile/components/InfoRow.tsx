import { StyleSheet, View } from 'react-native';

import { Text } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

export function InfoRow({ label, value }: { label: string; value: string }) {
  const scheme = useColorScheme() ?? 'light';

  return (
    <View style={styles.row}>
      <Text style={[styles.label, { color: Colors[scheme].muted }]}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
  },
});
