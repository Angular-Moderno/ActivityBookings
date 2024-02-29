import {
  Injectable,
  Signal,
  WritableSignal,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { LocalRepository } from '@services/local.repository';

@Injectable({
  providedIn: 'root',
})
export class FavoritesStore {
  #localRepository: LocalRepository = inject(LocalRepository);
  #state: WritableSignal<string[]> = signal<string[]>([]);

  state: Signal<string[]> = this.#state.asReadonly();

  favCount = computed(() => this.#state().length);

  constructor() {
    this.setState(this.#localRepository.load('favorites', []));

    effect(() => this.#localRepository.save('favorites', this.#state()));
  }

  setState(favorites: string[]): void {
    this.#state.set(favorites);
  }
}
