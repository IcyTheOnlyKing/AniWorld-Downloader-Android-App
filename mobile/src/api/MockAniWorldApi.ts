import { AniWorldApi } from '@/src/api/AniWorldApi';
import { mockLibrary, mockQueue, mockSeries } from '@/src/api/mockData';
import { DownloadQueueItem, DownloadRequest } from '@/src/models/DownloadQueue';
import { LibraryItem } from '@/src/models/Library';
import { Series } from '@/src/models/Series';

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value));

export class MockAniWorldApi implements AniWorldApi {
  private queue: DownloadQueueItem[] = clone(mockQueue);
  private library: LibraryItem[] = clone(mockLibrary);

  async fetchCatalog(query?: string): Promise<Series[]> {
    const normalized = query?.trim().toLowerCase();
    const filtered = normalized
      ? mockSeries.filter((item) =>
          [item.title, item.description, item.tags.join(' ')].some((text) =>
            text.toLowerCase().includes(normalized)
          )
        )
      : mockSeries;

    return this.simulateLatency(filtered);
  }

  async fetchQueue(): Promise<DownloadQueueItem[]> {
    this.queue = this.queue.map((item) => {
      if (item.status !== 'downloading') {
        return item;
      }

      const increment = Math.random() * 0.08 + 0.04;
      const nextProgress = Math.min(1, item.progress + increment);
      return {
        ...item,
        progress: nextProgress,
        status: nextProgress >= 1 ? 'completed' : item.status,
        speedMbps: nextProgress >= 1 ? 0 : item.speedMbps,
        etaMinutes: nextProgress >= 1 ? 0 : Math.max(2, item.etaMinutes - 1),
      };
    });

    const completed = this.queue.filter((item) => item.status === 'completed');
    completed.forEach((item) => {
      const alreadyAdded = this.library.some((lib) => lib.title === item.title);
      if (!alreadyAdded) {
        this.library.push({
          id: `lib-${item.seriesId}`,
          title: item.title,
          seasons: item.season,
          episodes: item.season * 12,
          sizeGb: Number((item.season * 12 * 1.4).toFixed(1)),
          lastUpdated: new Date().toISOString(),
          location: `/mnt/media/${item.title.toLowerCase().replace(/\s/g, '-')}`,
        });
      }
    });

    return this.simulateLatency(clone(this.queue));
  }

  async fetchLibrary(): Promise<LibraryItem[]> {
    return this.simulateLatency(clone(this.library));
  }

  async enqueueDownload(request: DownloadRequest): Promise<DownloadQueueItem> {
    const series = mockSeries.find((item) => item.id === request.seriesId);
    if (!series) {
      throw new Error('Series not found');
    }

    const newItem: DownloadQueueItem = {
      id: `queue-${Date.now()}`,
      seriesId: request.seriesId,
      title: series.title,
      season: request.season,
      progress: 0,
      status: 'queued',
      speedMbps: 0,
      etaMinutes: 30,
    };

    this.queue = [newItem, ...this.queue];
    return this.simulateLatency(clone(newItem));
  }

  private simulateLatency<T>(value: T): Promise<T> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(value), 400);
    });
  }
}
