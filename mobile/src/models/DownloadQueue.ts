export type QueueStatus = 'queued' | 'downloading' | 'paused' | 'completed' | 'failed';

export interface DownloadRequest {
  seriesId: string;
  season: number;
  quality: '1080p' | '720p' | '480p';
}

export interface DownloadQueueItem {
  id: string;
  seriesId: string;
  title: string;
  season: number;
  progress: number;
  status: QueueStatus;
  speedMbps: number;
  etaMinutes: number;
}
