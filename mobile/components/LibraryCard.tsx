import { StyleSheet, View } from 'react-native';

import { LibraryItem } from '@/src/models/Library';
import { SurfaceCard } from '@/components/SurfaceCard';
import { Text } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { formatDate, formatEpisodes, formatSize } from '@/src/utils/format';

export function LibraryCard({ item }: { item: LibraryItem }) {
  const scheme = useColorScheme() ?? 'light';

  return (
    <SurfaceCard style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={[styles.subtitle, { color: Colors[scheme].muted }]}>
        {formatEpisodes(item.seasons, item.episodes)}
      </Text>
      <View style={styles.details}>
        <Text style={[styles.meta, { color: Colors[scheme].muted }]}>Size</Text>
        <Text style={styles.value}>{formatSize(item.sizeGb)}</Text>
      </View>
      <View style={styles.details}>
        <Text style={[styles.meta, { color: Colors[scheme].muted }]}>Updated</Text>
        <Text style={styles.value}>{formatDate(item.lastUpdated)}</Text>
      </View>
      <Text style={[styles.path, { color: Colors[scheme].muted }]} numberOfLines={1}>
        {item.location}
      </Text>
    </SurfaceCard>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '500',
  },
  details: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  meta: {
    fontSize: 12,
    fontWeight: '500',
  },
  value: {
    fontSize: 13,
    fontWeight: '600',
  },
  path: {
    marginTop: 8,
    fontSize: 11,
  },
});
