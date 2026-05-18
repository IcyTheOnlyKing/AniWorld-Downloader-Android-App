export const formatPercent = (value: number) => `${Math.round(value * 100)}%`;

export const formatSize = (sizeGb: number) => `${sizeGb.toFixed(1)} GB`;

export const formatEpisodes = (seasons: number, episodes: number) =>
  `${seasons} season${seasons === 1 ? '' : 's'} · ${episodes} eps`;

export const formatDate = (iso: string) => {
  const date = new Date(iso);
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};
