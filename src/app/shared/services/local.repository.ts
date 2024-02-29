import { Injectable, inject } from '@angular/core';
import { PlatformService } from './platform.service';

@Injectable({
  providedIn: 'root',
})
export class LocalRepository {
  #platformService = inject(PlatformService);

  save(key: string, value: unknown): void {
    if (this.#platformService.isServer) return;
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
  }

  load<T>(key: string, defaultValue: T): T {
    if (this.#platformService.isServer) return defaultValue;
    const found = localStorage.getItem(key);
    if (found) {
      return JSON.parse(found);
    }
    this.save(key, defaultValue);
    return defaultValue;
  }

  remove(key: string): void {
    if (this.#platformService.isServer) return;
    localStorage.removeItem(key);
  }
}
