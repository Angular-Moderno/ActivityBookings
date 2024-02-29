import { isPlatformServer } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  #platformId = inject(PLATFORM_ID);

  get isServer() {
    return isPlatformServer(this.#platformId);
  }
  get isBrowser() {
    return !this.isServer;
  }
}
