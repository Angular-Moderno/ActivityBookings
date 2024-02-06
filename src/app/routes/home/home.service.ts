import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Activity } from '../../domain/activity.type';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  #httpClient$: HttpClient = inject(HttpClient);
  #apiUrl = 'http://localhost:3000/activities';

  getActivities() {
    return this.#httpClient$.get<Activity[]>(this.#apiUrl);
  }
}
