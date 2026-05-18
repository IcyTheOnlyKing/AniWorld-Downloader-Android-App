import { StyleSheet, View, Pressable } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { Series } from '@/src/models/Series';
import { SurfaceCard } from '@/components/SurfaceCard';
import { Text } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { TagList } from '@/components/TagList';
import { InfoRow } from '@/components/InfoRow';
import { ActionButton } from '@/components/ActionButton';
import { StatusPill } from '@/components/StatusPill';

export function SeriesCard({
  series,
  expanded,
  onToggle,
  onDownload,
}: {
  series: Series;
  expanded: boolean;
  onToggle: () => void;
  onDownload: () => void;
}) {
  const scheme = useColorScheme() ?? 'light';

  return (
    <SurfaceCard style={styles.card}>
      <Pressable onPress={onToggle} style={({ pressed }) => [pressed && styles.pressed]}>
        <View style={styles.header}>
          <View style={[styles.cover, { backgroundColor: Colors[scheme].surfaceAlt }]}>
            <FontAwesome
              name={series.mediaType === 'anime' ? 'play-circle' : 'television'}
              size={28}
              color={Colors[scheme].accent}
            />
          </View>
          <View style={styles.meta}>
            <View style={styles.titleRow}>
              <Text style={styles.title}>{series.title}</Text>
              <StatusPill
                label={series.provider}
                tone={series.provider === 'AniWorld' ? 'accent' : 'success'}
              />
            </View>
            <Text style={[styles.subtitle, { color: Colors[scheme].muted }]}>
              {`${series.seasons} season${series.seasons === 1 ? '' : 's'} · ${series.episodes} eps`}
            </Text>
          </View>
        </View>
        <Text style={[styles.description, { color: Colors[scheme].muted }]} numberOfLines={expanded ? 5 : 2}>
          {series.description}
        </Text>
      </Pressable>

      {expanded ? (
        <View style={styles.details}>
          <TagList tags={series.tags} />
          <InfoRow label="Rating" value={`${series.rating.toFixed(1)} / 5`} />
          <InfoRow label="Provider" value={series.provider} />
          <View style={styles.actions}>
            <ActionButton label="Queue on Pi" onPress={onDownload} />
          </View>
        </View>
      ) : null}
    </SurfaceCard>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  pressed: {
    opacity: 0.8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cover: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  meta: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '500',
  },
  description: {
    marginTop: 10,
    fontSize: 13,
    lineHeight: 18,
  },
  details: {
    marginTop: 12,
  },
  actions: {
    marginTop: 12,
  },
});
