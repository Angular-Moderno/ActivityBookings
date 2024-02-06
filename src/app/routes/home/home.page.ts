import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Activity } from '../../domain/activity.type';
import { ActivityComponent } from './activity.component';
import { HomeService } from './home.service';

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
  #service = inject(HomeService);
  activities = signal<Activity[]>([]);

  constructor() {
    this.#service.getActivities().subscribe((result) => this.activities.set(result));
  }
}
