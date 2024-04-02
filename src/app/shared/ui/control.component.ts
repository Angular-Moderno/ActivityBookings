import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'lab-control',
  standalone: true,
  imports: [JsonPipe],
  template: `
    <label [for]="controlName()">
      <span>{{ labelDisplay() }}</span>
      @if (errors()) {
        <small>{{ errors() | json }}</small>
      }
      <ng-content />
    </label>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlComponent {
  controlName = input.required<string>();
  labelDisplay = input.required<string>();
  errors = input<unknown>();
}
