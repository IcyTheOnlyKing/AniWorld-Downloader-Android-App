import { DownloadQueueItem, DownloadRequest } from '@/src/models/DownloadQueue';
import { LibraryItem } from '@/src/models/Library';
import { Series } from '@/src/models/Series';

export interface AniWorldApi {
  fetchCatalog(query?: string): Promise<Series[]>;
  fetchQueue(): Promise<DownloadQueueItem[]>;
  fetchLibrary(): Promise<LibraryItem[]>;
  enqueueDownload(request: DownloadRequest): Promise<DownloadQueueItem>;
}
