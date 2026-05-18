import { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { DownloadQueueItem } from '@/src/models/DownloadQueue';
import { useAppState } from '@/src/state/AppContext';
import { QueueCard } from '@/components/QueueCard';
import { SectionHeader } from '@/components/SectionHeader';
import { EmptyState } from '@/components/EmptyState';
import { useInterval } from '@/src/hooks/useInterval';
import { InfoBanner } from '@/components/InfoBanner';

export default function QueueScreen() {
  const { repository } = useAppState();
  const [queue, setQueue] = useState<DownloadQueueItem[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    repository
      .getQueue()
      .then((data) => setQueue(data))
      .finally(() => setLoading(false));
  }, [repository]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useInterval(refresh, 4000);

  const header = useMemo(
    () => (
      <View style={styles.header}>
        <SectionHeader title="Download Queue" subtitle="Live Pi progress" />
        <InfoBanner
          title="Queue synced to the Pi"
          message="Progress updates stream from the Raspberry Pi. Downloads never touch local storage."
        />
      </View>
    ),
    []
  );

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={queue}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={header}
      ListEmptyComponent={
        loading ? null : (
          <EmptyState title="Queue is clear" message="Start a download from Browse or Search." />
        )
      }
      renderItem={({ item }) => <QueueCard item={item} />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    gap: 16,
    marginBottom: 16,
  },
});
