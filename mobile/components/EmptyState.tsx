import { StyleSheet, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { Text } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

export function EmptyState({ title, message }: { title: string; message: string }) {
  const scheme = useColorScheme() ?? 'light';

  return (
    <View style={styles.container}>
      <FontAwesome name="inbox" size={32} color={Colors[scheme].muted} />
      <Text style={styles.title}>{title}</Text>
      <Text style={[styles.message, { color: Colors[scheme].muted }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  title: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '700',
  },
  message: {
    marginTop: 6,
    fontSize: 13,
    textAlign: 'center',
  },
});
