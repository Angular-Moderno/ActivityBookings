import { ChangeDetectionStrategy, Component, InputSignal, input, output } from '@angular/core';
import { Notification } from '@domain/notification.type';
@Component({
  selector: 'lab-notifications',
  standalone: true,
  imports: [],
  template: `
    <dialog open>
      <article>
        <header>
          <h2>Notifications</h2>
        </header>
        @for (notification of notifications(); track notification) {
          @if (notification.type === 'error') {
            <input disabled aria-invalid="true" [value]="notification.message" />
          } @else {
            <input disabled aria-invalid="false" [value]="notification.message" />
          }
        }
        <footer>
          <button (click)="close.emit()">Close</button>
        </footer>
      </article>
    </dialog>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsComponent {
  notifications: InputSignal<Notification[]> = input<Notification[]>([]);
  close = output();
}
