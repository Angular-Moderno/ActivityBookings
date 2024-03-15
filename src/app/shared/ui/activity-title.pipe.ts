import { Pipe, PipeTransform } from '@angular/core';
import { Activity } from '@domain/activity.type';

@Pipe({
  name: 'activityTitle',
  standalone: true,
})
export class ActivityTitlePipe implements PipeTransform {
  transform(value: Activity): string {
    return `${value.name} at ${value.location}`;
  }
}
