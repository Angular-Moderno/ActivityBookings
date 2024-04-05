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
import { Notification } from '@domain/notification.type';
import { LocalRepository } from '@services/local.repository';
import { NotificationsStore } from '@state/notifications.store';
import { NotificationsComponent } from '@ui/notifications.component';
import { CookiesComponent } from './cookies.component';

type CookiesStatus = 'pending' | 'rejected' | 'essentials' | 'all';

@Component({
  selector: 'lab-footer',
  standalone: true,
  imports: [CookiesComponent, NotificationsComponent],
  template: `
    <footer>
      <nav>
        <span>
          <a [href]="author.homepage" target="_blank"> © {{ getYear() }} {{ author.name }} </a>
        </span>
        @if (hasNotifications()) {
          <button
            [attr.data-tooltip]="notificationsCount()"
            class="outline"
            (click)="toggleNotifications()"
          >
            🔥
          </button>
        }
        <span>
          @switch (cookiesStatus()) {
            @case ('pending') {
              <lab-cookies
                (cancel)="cookiesStatus.set('rejected')"
                (accept)="cookiesStatus.set($event)"
              />
            }
            @case ('rejected') {
              <small>🍪 ❌</small>
            }
            @case ('essentials') {
              <small>🍪 ✅</small>
            }
            @case ('all') {
              <small>🍪 ✅ ✅</small>
            }
          }
        </span>
      </nav>
    </footer>
    @if (showNotification()) {
      <lab-notifications [notifications]="notifications()" (close)="onNotificationsClose()" />
    }
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterWidget {
  localRepository: LocalRepository = inject(LocalRepository);
  // Properties division

  #notificationsStore: NotificationsStore = inject(NotificationsStore);
  notifications: Signal<Notification[]> = this.#notificationsStore.notifications;
  notificationsCount: Signal<number> = this.#notificationsStore.count;
  hasNotifications: Signal<boolean> = computed(() => this.notificationsCount() > 0);

  showNotification: WritableSignal<boolean> = signal<boolean>(false);

  readonly author = {
    name: 'Alberto Basalo',
    homepage: 'https://albertobasalo.dev',
  };

  // Mutable signals division

  cookiesStatus: WritableSignal<CookiesStatus> = signal<CookiesStatus>(
    this.localRepository.load('cookies', { status: 'pending' }).status as CookiesStatus,
  );

  onCookiesAccepted = effect(() =>
    this.localRepository.save('cookies', { status: this.cookiesStatus() }),
  );

  // Public methods division

  getYear(): number {
    // ! Do not abuse (they are called on every change detection cycle)
    return new Date().getFullYear();
  }

  toggleNotifications(): void {
    this.showNotification.update((current) => !current);
  }

  onNotificationsClose(): void {
    this.showNotification.set(false);
    this.#notificationsStore.clearNotifications();
  }
}
