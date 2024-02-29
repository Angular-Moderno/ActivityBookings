import { ChangeDetectionStrategy, Component, Signal, inject } from '@angular/core';
import { FavoritesStore } from '@state/favorites.store';

@Component({
  selector: 'lab-favorites',
  standalone: true,
  imports: [],
  template: `
    @for (favorite of favorites(); track favorite) {
      <div>{{ favorite }}</div>
      <hr />
    } @empty {
      <div>No favorites yet</div>
    }
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FavoritesPage {
  #favorites: FavoritesStore = inject(FavoritesStore);

  favorites: Signal<string[]> = this.#favorites.state;
}
