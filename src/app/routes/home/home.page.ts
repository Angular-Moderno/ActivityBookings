import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Activity } from '../../domain/activity.type';
import { ActivityComponent } from './activity.component';

@Component({
  standalone: true,
  imports: [ActivityComponent],
  template: `
    <article>
      <header>
        <h2>Activities</h2>
      </header>
      <main>
        @for (activity of activities(); track activity.id) {
          <lab-activity [activity]="activity" />
        }
      </main>
    </article>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomePage {
  #httpClient$: HttpClient = inject(HttpClient);
  #apiUrl = 'http://localhost:3000/activities';
  activities = signal<Activity[]>([]);

  constructor() {
    this.#httpClient$
      .get<Activity[]>(this.#apiUrl)
      .subscribe((result) => this.activities.set(result));
  }
}
