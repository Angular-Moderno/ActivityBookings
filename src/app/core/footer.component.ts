import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lab-footer',
  standalone: true,
  imports: [],
  template: `
    <footer>
      <nav>
        <span>
          <a [href]="author.homepage" target="_blank"> © {{ year }} {{ author.name }} </a>
        </span>
        <span>
          <button (click)="onCookiesAccepted()" class="secondary outline">Accept Cookies</button>
        </span>
      </nav>
    </footer>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  readonly author = {
    name: 'Alberto Basalo.',
    homepage: 'https://albertobasalo.dev',
  };

  readonly year = new Date().getFullYear();

  onCookiesAccepted() {
    console.log('Cookies accepted');
  }
}
