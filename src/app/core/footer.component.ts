import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lab-footer',
  standalone: true,
  imports: [],
  template: `
    <footer>
      <nav>
        <a [href]="author.homepage" target="_blank"> © {{ year }} {{ author.name }} </a>
        <button (click)="onCookiesAccepted()">Accept Cookies</button>
      </nav>
    </footer>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  author = {
    name: 'Alberto Basalo.',
    homepage: 'https://albertobasalo.dev',
  };

  year = new Date().getFullYear();

  onCookiesAccepted() {
    console.log('Cookies accepted');
  }
}
