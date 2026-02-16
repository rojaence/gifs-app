import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { finalize, map, tap } from 'rxjs';

import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { GifMapper } from '../mapper/gif.mapper';
import { Gif } from '../interfaces/gif.interface';

@Injectable({ providedIn: 'root' })
export class GifService {

  private http = inject(HttpClient);
  private STORAGE_KEY = 'GIFS_HISTORY';
  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal<boolean>(false);
  searchGifsLoading = signal<boolean>(false);

  searchHistory = signal<Record<string, Gif[]>>({});
  searchHistoryKeys = computed(() => {
    return Object.keys(this.searchHistory());
  });

  constructor() {
    this.loadTrendingGifs();
    this.syncHistory('load');
  }

  protected syncHistory = (action: 'load' | 'save') => {
    console.log('🚀 ~ GifService ~ action:', action);
    if (action === 'load') {
      const local = localStorage.getItem(this.STORAGE_KEY);
      if (local) this.searchHistory.set(JSON.parse(local));
    }
    if (action === 'save') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.searchHistory()));
    }
  }

  loadTrendingGifs() {
    this.trendingGifsLoading.set(true);
    this.http.get<GiphyResponse>(`${environment.giphyApiUrl}/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20
      }
    })
    .pipe(
      finalize(() => this.trendingGifsLoading.set(false))
    )
    .subscribe((res) => {
      const gifs = GifMapper.mapGiphyItemsToGifArray(res.data);
      this.trendingGifs.set(gifs);
    })
  }

  searchGifs(query: string) {
    this.searchGifsLoading.set(true);
    return this.http.get<GiphyResponse>(`${environment.giphyApiUrl}/gifs/search`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
        q: query
      }
    })
    .pipe(
      map((res) => GifMapper.mapGiphyItemsToGifArray(res.data)),
      tap((items) => this.searchHistory.update((history) => ({ ...history, [query.toLocaleLowerCase()]: items }))),
      tap(() => this.syncHistory('save')),
      finalize(() => this.searchGifsLoading.set(false))
    )
  }
}
