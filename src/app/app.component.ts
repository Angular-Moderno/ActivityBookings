import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './core/footer.component';
import { HeaderComponent } from './core/header.component';

@Component({
  selector: 'lab-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, HeaderComponent],
  template: `
    <lab-header />
    <main>
      <router-outlet></router-outlet>
    </main>
    <lab-footer />
  `,
  styles: [
    `
      main {
        margin-top: 2rem;
        margin-bottom: 2rem;
      }
    `,
  ],
})
export class AppComponent {}
