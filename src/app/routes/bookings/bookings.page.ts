import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  WritableSignal,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { toSignalMap } from '@api/signal.functions';
import { getNextActivityStatus } from '@domain/activity.functions';
import { Activity, ActivityStatus } from '@domain/activity.type';
import { Booking } from '@domain/booking.type';
import { ActivityHeaderComponent } from './activity-header.component';
import { BookingFormComponent } from './booking-form.component';
import { BookingsService } from './bookings.service';
import { ParticipantsComponent } from './participants.component';

@Component({
  selector: 'lab-bookings',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: ``,
  imports: [ActivityHeaderComponent, ParticipantsComponent, BookingFormComponent],
  template: `
    @if (activity(); as activity) {
      <article>
        <header>
          <lab-activity-header [activity]="activity" [activityStatus]="activityStatus()" />
        </header>
        <main>
          <lab-participants
            [activity]="activity"
            [alreadyParticipants]="alreadyParticipants()"
            [remainingPlaces]="remainingPlaces()"
            [newParticipants]="newParticipants()"
            [totalParticipants]="totalParticipants()"
          />
        </main>
        <footer>
          @if (isBookable()) {
            <lab-booking-form
              [activity]="activity"
              [alreadyParticipants]="alreadyParticipants()"
              [remainingPlaces]="remainingPlaces()"
              [bookingSaved]="bookingSaved()"
              (changeParticipants)="onChangeParticipants($event)"
              (saveBooking)="onSaveBooking($event)"
            />
          }
        </footer>
      </article>
    }
  `,
})
export default class BookingsPage {
  // * Injected services division

  // The service to activities and bookings api
  #service = inject(BookingsService);
  // The title service to update the title
  #title = inject(Title);
  // The meta service to update the meta tags
  #meta = inject(Meta);

  #route = inject(ActivatedRoute);

  // * Input signals division

  /** The slug of the activity that comes from the router */
  slug: Signal<string | undefined> = input<string>();

  // * Signals division

  bookingSaved: WritableSignal<boolean> = signal(false);
  newParticipants: WritableSignal<number> = signal(0);

  // * Computed signals division

  #resolvedActivity: Activity = this.#route.snapshot.data['activity'];
  activity: Signal<Activity> = signal(this.#resolvedActivity);

  /** The bookings of the activity that comes from the API based on the activity signal */
  activityBookings: Signal<Booking[]> = toSignalMap(
    this.activity,
    (activity) => this.#service.getBookingsByActivityId$(activity.id),
    [],
  );

  /** The sum of participants of the bookings of the activity */
  alreadyParticipants: Signal<number> = computed(() =>
    this.activityBookings().reduce((acc, booking) => acc + booking.participants, 0),
  );

  /** Already booked plus new participants */
  totalParticipants: Signal<number> = computed(
    () => this.alreadyParticipants() + this.newParticipants(),
  );

  /** Activity status computed from current activity and total participants */
  activityStatus: Signal<ActivityStatus> = computed(() =>
    getNextActivityStatus(this.activity(), this.totalParticipants()),
  );

  /** If the activity has an status bookable */
  isBookable: Signal<boolean> = computed(() =>
    ['published', 'confirmed'].includes(this.activity().status),
  );

  /** Remaining places to book */
  remainingPlaces: Signal<number> = computed(
    () => this.activity().maxParticipants - this.totalParticipants(),
  );

  constructor() {
    effect(() => {
      const activity = this.activity();
      this.#title.setTitle(activity.name);
      const description = `${activity.name} at ${activity.location} on ${activity.date} for ${activity.price}€`;
      this.#meta.updateTag({ name: 'description', content: description });
    });
  }

  // * Events division

  /** Set the new participants signal when the participants change */
  onChangeParticipants(newParticipants: number) {
    this.newParticipants.set(newParticipants);
  }

  /** Post a new booking to the API and update the activity status if it is necessary */
  onSaveBooking(newBooking: Booking) {
    this.#service.postBooking$(newBooking).subscribe({
      next: () => {
        this.bookingSaved.set(true);
        this.#service.updateActivityStatus$(this.activity(), this.activityStatus()).subscribe();
      },
      error: (error) => console.error('Error creating booking', error),
    });
  }
}
