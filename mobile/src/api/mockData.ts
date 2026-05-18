import { LibraryItem } from '@/src/models/Library';
import { Series } from '@/src/models/Series';
import { DownloadQueueItem } from '@/src/models/DownloadQueue';

export const mockSeries: Series[] = [
  {
    id: 'aw-solo-leveling',
    title: 'Solo Leveling',
    description:
      'A portal-ridden world where one hunter breaks every limit and becomes a one-man raid squad.',
    seasons: 1,
    episodes: 12,
    rating: 4.9,
    tags: ['Action', 'Fantasy', 'Dungeon'],
    provider: 'AniWorld',
    mediaType: 'anime',
  },
  {
    id: 'aw-frieren',
    title: "Frieren: Beyond Journey's End",
    description:
      'An immortal mage reflects on friendships, time, and the true meaning of legacy after the hero’s journey.',
    seasons: 1,
    episodes: 28,
    rating: 4.8,
    tags: ['Drama', 'Fantasy', 'Adventure'],
    provider: 'AniWorld',
    mediaType: 'anime',
  },
  {
    id: 'st-dark',
    title: 'Dark',
    description:
      'Small-town disappearances reveal a multi-generational time-loop conspiracy tied to a shadowy cult.',
    seasons: 3,
    episodes: 26,
    rating: 4.7,
    tags: ['Mystery', 'Sci-Fi', 'Thriller'],
    provider: 'SerienStream',
    mediaType: 'series',
  },
  {
    id: 'aw-jjk',
    title: 'Jujutsu Kaisen',
    description:
      'A cursed energy student joins Tokyo Jujutsu High to protect humanity from supernatural threats.',
    seasons: 2,
    episodes: 47,
    rating: 4.6,
    tags: ['Action', 'Supernatural', 'Shounen'],
    provider: 'AniWorld',
    mediaType: 'anime',
  },
  {
    id: 'st-expanse',
    title: 'The Expanse',
    description:
      'A detective and a ship crew uncover a galaxy-shaking conspiracy between Earth, Mars, and the Belt.',
    seasons: 6,
    episodes: 62,
    rating: 4.5,
    tags: ['Sci-Fi', 'Drama', 'Space'],
    provider: 'SerienStream',
    mediaType: 'series',
  },
];

export const mockQueue: DownloadQueueItem[] = [
  {
    id: 'queue-1',
    seriesId: 'aw-jjk',
    title: 'Jujutsu Kaisen',
    season: 2,
    progress: 0.42,
    status: 'downloading',
    speedMbps: 18.7,
    etaMinutes: 12,
  },
  {
    id: 'queue-2',
    seriesId: 'aw-frieren',
    title: "Frieren: Beyond Journey's End",
    season: 1,
    progress: 0.08,
    status: 'queued',
    speedMbps: 0,
    etaMinutes: 28,
  },
];

export const mockLibrary: LibraryItem[] = [
  {
    id: 'lib-solo-leveling',
    title: 'Solo Leveling',
    seasons: 1,
    episodes: 12,
    sizeGb: 18.4,
    lastUpdated: '2026-05-12T19:10:00Z',
    location: '/mnt/media/anime/solo-leveling',
  },
  {
    id: 'lib-dark',
    title: 'Dark',
    seasons: 3,
    episodes: 26,
    sizeGb: 85.9,
    lastUpdated: '2026-05-15T22:40:00Z',
    location: '/mnt/media/series/dark',
  },
];
