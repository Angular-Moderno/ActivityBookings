import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Activity } from '@domain/activity.type';
import { BookingsService } from './bookings.service';

export const activityResolver: ResolveFn<Activity> = (route) => {
  const slug: string = route.paramMap.get('slug') || '';
  const bookingsService = inject(BookingsService);
  return bookingsService.getActivityBySlug$(slug);
};
