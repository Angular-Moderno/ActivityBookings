import { ChangeDetectionStrategy, Component, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { ActivitiesRepository } from '@api/activities.repository';
import { Activity } from '@domain/activity.type';
import { FavoritesStore } from '@state/favorites.store';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'lab-favorites',
  standalone: true,
  imports: [RouterLink],
  template: `
    @for (activity of activities(); track activity.id) {
      <span>
        <a [routerLink]="['/bookings', activity.slug]">{{ activity.name }}</a>
      </span>
      <span>at {{ activity.location }} on {{ activity.date }}</span>
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

  #activitiesRepository: ActivitiesRepository = inject(ActivitiesRepository);

  #favoriteSlugs: string[] = this.#favorites.state();

  #getActivityBySlug$ = (favoriteSlug: string) =>
    this.#activitiesRepository.getActivityBySlug$(favoriteSlug);

  #mapActivitiesFromSlugs$: Observable<Activity>[] = this.#favoriteSlugs.map(
    this.#getActivityBySlug$,
  );

  #activities$: Observable<Activity[]> = forkJoin(this.#mapActivitiesFromSlugs$);

  activities: Signal<Activity[]> = toSignal(this.#activities$, { initialValue: [] });
}
