import { StyleSheet, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import Colors from '@/constants/Colors';
import { Text } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';

export function InfoBanner({ title, message }: { title: string; message: string }) {
  const scheme = useColorScheme() ?? 'light';

  return (
    <View style={[styles.container, { backgroundColor: Colors[scheme].surfaceAlt }]}> 
      <FontAwesome name="cloud-download" size={18} color={Colors[scheme].accent} />
      <View style={styles.textBlock}>
        <Text style={styles.title}>{title}</Text>
        <Text style={[styles.message, { color: Colors[scheme].muted }]}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 16,
  },
  textBlock: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
  },
  message: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 16,
  },
});
