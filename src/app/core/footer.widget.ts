import {
  ChangeDetectionStrategy,
  Component,
  WritableSignal,
  effect,
  inject,
  signal,
} from '@angular/core';
import { LocalRepository } from '@services/local.repository';
import { CookiesComponent } from './cookies.component';

type CookiesStatus = 'pending' | 'rejected' | 'essentials' | 'all';

@Component({
  selector: 'lab-footer',
  standalone: true,
  imports: [CookiesComponent],
  template: `
    <footer>
      <nav>
        <span>
          <a [href]="author.homepage" target="_blank"> © {{ getYear() }} {{ author.name }} </a>
        </span>
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
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterWidget {
  localRepository: LocalRepository = inject(LocalRepository);
  // Properties division

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
}
