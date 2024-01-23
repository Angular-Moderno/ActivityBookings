import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./bookings/bookings.component').then((m) => m.BookingsComponent),
  },
];
