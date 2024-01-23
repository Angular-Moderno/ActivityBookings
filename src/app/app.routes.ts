import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./bookings/bookings.component').then((m) => m.BookingsComponent),
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./routes/auth/login.component'),
  },
];
