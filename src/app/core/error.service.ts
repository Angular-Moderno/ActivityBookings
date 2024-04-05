import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, inject } from '@angular/core';
import { Notification } from '@domain/notification.type';
import { NotificationsStore } from '@state/notifications.store';

export class ErrorService implements ErrorHandler {
  #notificationsStore: NotificationsStore = inject(NotificationsStore);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleError(error: any): void {
    const notification: Notification = { message: 'An error occurred', type: 'error' };
    if (error instanceof HttpErrorResponse) {
      notification.message = error.message;
    } else {
      notification.message = error.toString();
    }
    this.#notificationsStore.addNotification(notification);
  }
}
