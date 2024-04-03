import { Injectable, Signal, WritableSignal, computed, signal } from '@angular/core';
import { Notification } from '@domain/notification.type';

@Injectable({
  providedIn: 'root',
})
export class NotificationsStore {
  #state: WritableSignal<Notification[]> = signal<Notification[]>([]);

  notifications: Signal<Notification[]> = this.#state.asReadonly();

  count: Signal<number> = computed(() => this.#state().length);

  addNotification(notification: Notification): void {
    this.#state.update((current) => [...current, notification]);
  }

  clearNotifications(): void {
    this.#state.set([]);
  }
}
