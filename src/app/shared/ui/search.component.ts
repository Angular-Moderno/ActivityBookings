import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ModelSignal,
  Signal,
  effect,
  model,
  viewChild,
} from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, fromEvent, map } from 'rxjs';

@Component({
  selector: 'lab-search',
  standalone: true,
  imports: [],
  template: ` <input #searchInput type="search" [value]="searchTerm()" placeholder="Search..." /> `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  searchInputEl: Signal<ElementRef | undefined> = viewChild('searchInput', { read: ElementRef });
  searchTerm: ModelSignal<string> = model<string>('');

  constructor() {
    effect(() => {
      const inputEl = this.searchInputEl();
      if (!inputEl) return;
      fromEvent<Event>(inputEl.nativeElement, 'input')
        .pipe(
          map((event: Event) => (event.target as HTMLInputElement).value),
          filter((value) => value.length > 2 || value.length === 0),
          debounceTime(300),
          distinctUntilChanged(),
        )
        .subscribe((searchTerm: string) => this.searchTerm.set(searchTerm));
    });
  }
}
