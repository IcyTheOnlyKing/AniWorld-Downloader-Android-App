import { StyleSheet, View } from 'react-native';

import { DownloadQueueItem } from '@/src/models/DownloadQueue';
import { SurfaceCard } from '@/components/SurfaceCard';
import { Text } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { ProgressBar } from '@/components/ProgressBar';
import { formatPercent } from '@/src/utils/format';
import { StatusPill } from '@/components/StatusPill';

const statusTone: Record<DownloadQueueItem['status'], 'accent' | 'success' | 'warning'> = {
  queued: 'warning',
  downloading: 'accent',
  paused: 'warning',
  completed: 'success',
  failed: 'warning',
};

export function QueueCard({ item }: { item: DownloadQueueItem }) {
  const scheme = useColorScheme() ?? 'light';

  return (
    <SurfaceCard style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{item.title}</Text>
        <StatusPill label={item.status.toUpperCase()} tone={statusTone[item.status]} />
      </View>
      <Text style={[styles.subtitle, { color: Colors[scheme].muted }]}>Season {item.season}</Text>
      <View style={styles.progressRow}>
        <ProgressBar progress={item.progress} />
        <Text style={styles.progressText}>{formatPercent(item.progress)}</Text>
      </View>
      <View style={styles.metaRow}>
        <Text style={[styles.meta, { color: Colors[scheme].muted }]}>
          {item.speedMbps > 0 ? `${item.speedMbps.toFixed(1)} Mbps` : 'Waiting for slot'}
        </Text>
        <Text style={[styles.meta, { color: Colors[scheme].muted }]}>
          {item.etaMinutes > 0 ? `${item.etaMinutes} min ETA` : 'Finalizing'}
        </Text>
      </View>
    </SurfaceCard>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
    marginRight: 8,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '500',
  },
  progressRow: {
    marginTop: 12,
  },
  progressText: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: '600',
  },
  metaRow: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  meta: {
    fontSize: 12,
    fontWeight: '500',
  },
});
