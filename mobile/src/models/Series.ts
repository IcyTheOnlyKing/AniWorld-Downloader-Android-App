export type Provider = 'AniWorld' | 'SerienStream';
export type MediaType = 'anime' | 'series';

export interface Series {
  id: string;
  title: string;
  description: string;
  seasons: number;
  episodes: number;
  rating: number;
  tags: string[];
  provider: Provider;
  mediaType: MediaType;
}
