import { Injectable, Signal, WritableSignal, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoritesStore {
  #state: WritableSignal<string[]> = signal<string[]>([]);

  state: Signal<string[]> = this.#state.asReadonly();

  favCount = computed(() => this.#state().length);

  setState(favorites: string[]): void {
    this.#state.set(favorites);
  }
}
