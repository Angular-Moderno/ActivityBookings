import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Login } from '@domain/login.type';
import { Register } from '@domain/register.type';
import { UserAccessToken } from '@domain/userAccessToken.type';
import { AuthStore } from '@state/auth.store';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthRepository {
  #apiUrl = 'http://localhost:3000';
  #http = inject(HttpClient);
  #authStore = inject(AuthStore);

  postRegister$(register: Register): Observable<UserAccessToken> {
    return this.#http
      .post<UserAccessToken>(`${this.#apiUrl}/users`, register)
      .pipe(tap((userAccessToken) => this.#authStore.setState(userAccessToken)));
  }

  postLogin$(login: Login): Observable<UserAccessToken> {
    return this.#http
      .post<UserAccessToken>(`${this.#apiUrl}/login`, login)
      .pipe(tap((userAccessToken) => this.#authStore.setState(userAccessToken)));
  }
}
