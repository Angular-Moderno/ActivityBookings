import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  WritableSignal,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DEFAULT_FILTER, Filter, SortOrders } from '@domain/filter.type';
import { Observable } from 'rxjs';

@Component({
  selector: 'lab-filter',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form>
      <input type="search" name="search" [(ngModel)]="search" placeholder="Search..." />
      <fieldset class="grid">
        <select name="orderBy" [(ngModel)]="orderBy" aria-label="Choose field to sort by...">
          <option value="id">Sort by ID</option>
          <option value="name">Sort by Name</option>
          <option value="date">Sort by Date</option>
          <option value="price">Sort by Price</option>
        </select>
        <fieldset>
          <legend>Sort order:</legend>
          <input type="radio" name="sort" id="asc" value="asc" [(ngModel)]="sort" />
          <label for="asc">Ascending</label>
          <input type="radio" name="sort" id="desc" value="desc" [(ngModel)]="sort" />
          <label for="desc">Descending</label>
        </fieldset>
      </fieldset>
    </form>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterWidget {
  #activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  #filterParams$: Observable<Params> = this.#activatedRoute.queryParams;

  #defaultFilter: Signal<Params | Filter> = toSignal(this.#filterParams$, {
    initialValue: DEFAULT_FILTER,
  });

  search: WritableSignal<string> = signal<string>(this.#defaultFilter().search);
  orderBy: WritableSignal<string> = signal<string>(this.#defaultFilter().orderBy);
  sort: WritableSignal<SortOrders> = signal<SortOrders>(this.#defaultFilter().sort);

  #filter: Signal<Filter> = computed(() => ({
    search: this.search(),
    orderBy: this.orderBy(),
    sort: this.sort(),
  }));

  constructor() {
    const router = inject(Router);
    effect(() => router.navigate([], { queryParams: this.#filter() }));
    // http://localhost:4200/?search=surf&orderBy=date&sort=desc
  }
}
