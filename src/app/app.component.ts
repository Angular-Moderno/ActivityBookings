import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookingsComponent } from './bookings/bookings.component';
import { FooterComponent } from './core/footer.component';
import { HeaderComponent } from './core/header.component';

@Component({
  selector: 'lab-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FooterComponent, HeaderComponent, BookingsComponent],
  template: `
    <lab-header />
    <lab-bookings />

    <router-outlet></router-outlet>
    <lab-footer />
  `,
  styles: [],
})
export class AppComponent {}
