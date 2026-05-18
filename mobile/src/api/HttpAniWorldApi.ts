import { AniWorldApi } from '@/src/api/AniWorldApi';
import { DownloadQueueItem, DownloadRequest } from '@/src/models/DownloadQueue';
import { LibraryItem } from '@/src/models/Library';
import { Series } from '@/src/models/Series';

export class HttpAniWorldApi implements AniWorldApi {
  constructor(private readonly baseUrlProvider: () => string) {}

  async fetchCatalog(query?: string): Promise<Series[]> {
    const params = query ? `?q=${encodeURIComponent(query)}` : '';
    return this.request<Series[]>(`/catalog${params}`);
  }

  async fetchQueue(): Promise<DownloadQueueItem[]> {
    return this.request<DownloadQueueItem[]>('/downloads/queue');
  }

  async fetchLibrary(): Promise<LibraryItem[]> {
    return this.request<LibraryItem[]>('/library');
  }

  async enqueueDownload(request: DownloadRequest): Promise<DownloadQueueItem> {
    // This triggers a download on the Raspberry Pi only; no media is saved on the phone.
    return this.request<DownloadQueueItem>('/downloads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
  }

  private async request<T>(path: string, init?: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseUrlProvider()}${path}`, init);
    if (!response.ok) {
      throw new Error(`Pi request failed: ${response.status}`);
    }
    return response.json() as Promise<T>;
  }
}
