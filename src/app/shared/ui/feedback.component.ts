import {
  ChangeDetectionStrategy,
  Component,
  InputSignal,
  Signal,
  computed,
  input,
} from '@angular/core';
import { Feedback, FeedbackStatus } from '@domain/feedback.type';

@Component({
  selector: 'lab-feedback',
  standalone: true,
  imports: [],
  template: `
    @switch (status()) {
      @case ('busy') {
        <fieldset role="group">
          <input disabled [value]="message()" />
          <button disabled aria-busy="true" class="outline">.</button>
        </fieldset>
      }
      @case ('success') {
        <input disabled aria-invalid="false" [value]="message()" />
      }
      @case ('error') {
        <input disabled aria-invalid="true" [value]="message()" />
      }
    }
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackComponent {
  feedback: InputSignal<Feedback> = input.required<Feedback>();

  status: Signal<FeedbackStatus> = computed(() => this.feedback().status);
  message: Signal<string> = computed(
    () => this.feedback().message || this.feedback().status.toUpperCase(),
  );
}
