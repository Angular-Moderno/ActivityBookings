import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Activity } from '../domain/activity.type';

@Component({
  standalone: true,
  imports: [CurrencyPipe, DatePipe, UpperCasePipe, FormsModule],
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
        <div>
          @for (participant of participants(); track participant.id) {
            <span [attr.data-tooltip]="participant.id">🏃</span>
          } @empty {
            <span>No participants yet</span>
          }
        </div>
        <ul>
          <li>New Participants: {{ newParticipants() }}</li>
          <li>Total participants: {{ totalParticipants() }}</li>
          <li>Remaining places: {{ remainingPlaces() }}</li>
        </ul>
      </main>
      <footer>
        <h4>New Bookings</h4>
        @if (remainingPlaces() > 0) {
          <label for="newParticipants">How many participants want to book?</label>
          <input
            type="number"
            [ngModel]="newParticipants()"
            (ngModelChange)="onNewParticipantsChange($event)"
            min="0"
            [max]="maxNewParticipants"
          />
        } @else {
          <button class="secondary outline" (click)="onNewParticipantsChange(0)">Reset</button>
          <span>Sorry, no more places available!</span>
        }
        <button [disabled]="canNotBook()" (click)="onBookClick()">
          Book now for {{ bookingAmount() | currency }}!
        </button>
        {{ booked() ? 'Booked!' : '' }}
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
  readonly maxNewParticipants = this.activity.maxParticipants - this.alreadyParticipants;

  readonly participants = signal<{ id: number }[]>([{ id: 1 }, { id: 2 }, { id: 3 }]);

  readonly totalParticipants = computed(() => this.alreadyParticipants + this.newParticipants());
  readonly remainingPlaces = computed(
    () => this.activity.maxParticipants - this.totalParticipants(),
  );
  readonly canNotBook = computed(() => this.booked() || this.newParticipants() === 0);
  readonly bookingAmount = computed(() => this.newParticipants() * this.activity.price);

  readonly newParticipants = signal(0);
  readonly booked = signal(false);

  constructor() {
    effect(() => {
      const totalParticipants = this.totalParticipants();
      const activity = this.activity;
      if (totalParticipants >= activity.maxParticipants) {
        activity.status = 'sold-out';
      } else if (totalParticipants >= activity.minParticipants) {
        activity.status = 'confirmed';
      } else {
        activity.status = 'published';
      }
    });
  }

  onNewParticipantsChange(newParticipants: number) {
    if (newParticipants > this.maxNewParticipants) {
      newParticipants = this.maxNewParticipants;
    }
    this.newParticipants.set(newParticipants);
    this.participants.update((participants) => {
      participants = participants.slice(0, this.alreadyParticipants);
      for (let i = 0; i < newParticipants; i++) {
        participants.push({ id: participants.length + 1 });
      }
      return participants;
    });
  }

  onBookClick() {
    this.booked.set(true);
  }
}
