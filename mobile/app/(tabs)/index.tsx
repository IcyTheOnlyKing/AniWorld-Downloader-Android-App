import { useEffect, useMemo, useState } from 'react';
import { Alert, FlatList, StyleSheet, View } from 'react-native';

import { Series } from '@/src/models/Series';
import { useAppState } from '@/src/state/AppContext';
import { SeriesCard } from '@/components/SeriesCard';
import { SectionHeader } from '@/components/SectionHeader';
import { InfoBanner } from '@/components/InfoBanner';
import { ConnectionBadge } from '@/components/ConnectionBadge';
import { runLayoutAnimation } from '@/src/utils/layoutAnimation';
import { EmptyState } from '@/components/EmptyState';

export default function BrowseScreen() {
  const { repository, connection, baseUrl } = useAppState();
  const [catalog, setCatalog] = useState<Series[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;
    setLoading(true);
    repository
      .getCatalog()
      .then((data) => {
        if (isActive) {
          setCatalog(data);
        }
      })
      .finally(() => {
        if (isActive) {
          setLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [repository]);

  const header = useMemo(
    () => (
      <View style={styles.header}>
        <SectionHeader title="Browse" subtitle="Pi downloads" />
        <InfoBanner
          title="Downloads run on your Raspberry Pi"
          message="Queue episodes here and let the Pi store the media files. Your phone stays storage-free."
        />
        <ConnectionBadge label={connection.mode === 'local' ? 'Local Network' : 'Tailscale'} address={baseUrl} />
      </View>
    ),
    [baseUrl, connection.mode]
  );

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={catalog}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={header}
      ListEmptyComponent={
        loading ? null : (
          <EmptyState title="Nothing to show" message="Try refreshing or switch to Search." />
        )
      }
      renderItem={({ item }) => (
        <SeriesCard
          series={item}
          expanded={expandedId === item.id}
          onToggle={() => {
            runLayoutAnimation();
            setExpandedId((current) => (current === item.id ? null : item.id));
          }}
          onDownload={() => {
            repository
              .enqueueDownload({ seriesId: item.id, season: 1, quality: '1080p' })
              .then(() => {
                Alert.alert('Queued on Pi', `${item.title} is now in the Raspberry Pi queue.`);
              });
          }}
        />
      )}
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
