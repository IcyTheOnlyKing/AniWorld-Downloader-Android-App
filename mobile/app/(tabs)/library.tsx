import { useEffect, useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { LibraryItem } from '@/src/models/Library';
import { useAppState } from '@/src/state/AppContext';
import { LibraryCard } from '@/components/LibraryCard';
import { SectionHeader } from '@/components/SectionHeader';
import { EmptyState } from '@/components/EmptyState';
import { ConnectionBadge } from '@/components/ConnectionBadge';

export default function LibraryScreen() {
  const { repository, connection, baseUrl } = useAppState();
  const [library, setLibrary] = useState<LibraryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;
    setLoading(true);
    repository
      .getLibrary()
      .then((data) => {
        if (isActive) {
          setLibrary(data);
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
        <SectionHeader title="Library" subtitle="Stored on Pi" />
        <ConnectionBadge label={connection.mode === 'local' ? 'Local Network' : 'Tailscale'} address={baseUrl} />
      </View>
    ),
    [baseUrl, connection.mode]
  );

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={library}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={header}
      ListEmptyComponent={
        loading ? null : (
          <EmptyState title="No downloads yet" message="Queued shows will appear here once finished." />
        )
      }
      renderItem={({ item }) => <LibraryCard item={item} />}
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
