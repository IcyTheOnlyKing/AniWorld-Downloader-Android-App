import { StyleSheet, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import Colors from '@/constants/Colors';
import { Text } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';

export function ConnectionBadge({ label, address }: { label: string; address: string }) {
  const scheme = useColorScheme() ?? 'light';

  return (
    <View style={[styles.container, { borderColor: Colors[scheme].border }]}> 
      <FontAwesome name="wifi" size={14} color={Colors[scheme].accent} />
      <View style={styles.textBlock}>
        <Text style={styles.label}>{label}</Text>
        <Text style={[styles.address, { color: Colors[scheme].muted }]}>{address}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 10,
    borderRadius: 14,
    borderWidth: 1,
  },
  textBlock: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
  },
  address: {
    fontSize: 11,
  },
});
