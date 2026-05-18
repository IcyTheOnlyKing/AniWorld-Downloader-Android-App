import { AniWorldApi } from '@/src/api/AniWorldApi';
import { DownloadQueueItem, DownloadRequest } from '@/src/models/DownloadQueue';
import { LibraryItem } from '@/src/models/Library';
import { Series } from '@/src/models/Series';

export class AniWorldRepository {
  constructor(private readonly api: AniWorldApi) {}

  getCatalog(query?: string): Promise<Series[]> {
    return this.api.fetchCatalog(query);
  }

  getQueue(): Promise<DownloadQueueItem[]> {
    return this.api.fetchQueue();
  }

  getLibrary(): Promise<LibraryItem[]> {
    return this.api.fetchLibrary();
  }

  enqueueDownload(request: DownloadRequest): Promise<DownloadQueueItem> {
    return this.api.enqueueDownload(request);
  }
}
