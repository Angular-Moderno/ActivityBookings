import { ChangeDetectionStrategy, Component, OutputEmitterRef, output } from '@angular/core';

type Acceptance = 'essentials' | 'all';

@Component({
  selector: 'lab-cookies',
  standalone: true,
  imports: [],
  template: `
    <dialog open>
      <article>
        <header>
          <h2>We use cookies</h2>
          <p>To ensure you get the best experience on our website.</p>
        </header>
        <section>
          <p>To be compliant with the EU GDPR law, we need your consent to set the cookies.</p>
        </section>
        <footer>
          <button class="contrast outline" (click)="cancel.emit()">Cancel</button>
          <button class="secondary outline" (click)="accept.emit('essentials')">
            Accept only essentials
          </button>
          <button class="primary outline" (click)="accept.emit('all')">Accept all</button>
        </footer>
      </article>
    </dialog>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CookiesComponent {
  cancel: OutputEmitterRef<void> = output();
  accept: OutputEmitterRef<Acceptance> = output();
}
