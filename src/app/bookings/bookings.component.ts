import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Activity } from '../domain/activity.type';

@Component({
  selector: 'lab-bookings',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, UpperCasePipe],
  styles: `
    .draft {
      color: aqua;
      font-style: italic;
    }
    .published {
      color: navy;
    }
    .confirmed {
      color: green;
    }
    .sold-out {
      color: teal;
      font-style: italic;
    }
    .done {
      color: olive;
      font-style: italic;
    }
    .cancelled {
      color: maroon;
      font-style: italic;
    }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article>
      <header>
        <h2>{{ activity.name }}</h2>
        <div [class]="activity.status">
          <span>{{ activity.location }}</span>
          <span>{{ activity.price | currency }}</span>
          <span>{{ activity.date | date: 'dd-MMM-yyyy' }}</span>
          <span>{{ activity.status | uppercase }}</span>
        </div>
      </header>
      <main>
        <h4>Participants</h4>
        <div>Already Participants: {{ alreadyParticipants }}</div>
      </main>
      <footer>
        <h4>New Bookings</h4>
        <button>Book now!</button>
      </footer>
    </article>
  `,
})
export class BookingsComponent {
  readonly activity: Activity = {
    name: 'Paddle surf',
    location: 'Lake Leman at Lausanne',
    price: 125,
    date: new Date(2025, 7, 15),
    minParticipants: 5,
    maxParticipants: 9,
    status: 'published',
    id: 1,
    slug: 'paddle-surf',
    duration: 2,
    userId: 1,
  };
  readonly alreadyParticipants = 3;
}
