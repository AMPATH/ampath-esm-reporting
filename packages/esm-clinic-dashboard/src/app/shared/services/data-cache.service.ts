import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataCacheService {
  private cache = new Map<string, Observable<any>>();

  constructor() { }

  public setDefaulTime(time) { }

  public clearExpired() { }

  public cacheRequest(url, params, request) {
    return this.cacheSingleRequest(url, params, request, 0);
  }

  public clearAll() {
    this.cache.clear();
  }

  public disableCache(value) { }

  public cacheSingleRequest(url, params, request: Observable<any>, time) {
    const cacheKey = url + (params ? params.toString() : '');
    if (!this.cache.has(cacheKey)) {
      this.cache.set(cacheKey, request.pipe(shareReplay(1)));
    }
    return this.cache.get(cacheKey);
  }
}
