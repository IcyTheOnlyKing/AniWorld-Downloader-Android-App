import { useEffect, useMemo, useState } from 'react';
import { Alert, FlatList, StyleSheet, View } from 'react-native';

import { Series } from '@/src/models/Series';
import { useAppState } from '@/src/state/AppContext';
import { SeriesCard } from '@/components/SeriesCard';
import { SectionHeader } from '@/components/SectionHeader';
import { SearchInput } from '@/components/SearchInput';
import { EmptyState } from '@/components/EmptyState';
import { useDebouncedValue } from '@/src/hooks/useDebouncedValue';
import { runLayoutAnimation } from '@/src/utils/layoutAnimation';

export default function SearchScreen() {
  const { repository } = useAppState();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Series[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const debouncedQuery = useDebouncedValue(query, 400);

  useEffect(() => {
    let isActive = true;
    setLoading(true);
    repository
      .getCatalog(debouncedQuery)
      .then((data) => {
        if (isActive) {
          setResults(data);
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
  }, [debouncedQuery, repository]);

  const header = useMemo(
    () => (
      <View style={styles.header}>
        <SectionHeader title="Search" subtitle="AniWorld & SerienStream" />
        <SearchInput value={query} onChange={setQuery} />
      </View>
    ),
    [query]
  );

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={results}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={header}
      ListEmptyComponent={
        loading ? null : (
          <EmptyState
            title="No matches yet"
            message="Try a different title or tag to discover more series."
          />
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
                Alert.alert('Queued on Pi', `${item.title} is ready in the download queue.`);
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
