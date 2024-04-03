import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Login } from '@domain/login.type';
import { UserAccessToken } from '@domain/userAccessToken.type';
import { Observable } from 'rxjs';
import { Register } from 'src/app/routes/auth/register.form';

@Injectable({
  providedIn: 'root',
})
export class AuthRepository {
  #apiUrl = 'http://localhost:3000';
  #http = inject(HttpClient);

  postRegister$(register: Register): Observable<UserAccessToken> {
    return this.#http.post<UserAccessToken>(`${this.#apiUrl}/register`, register);
  }

  postLogin$(login: Login): Observable<UserAccessToken> {
    return this.#http.post<UserAccessToken>(`${this.#apiUrl}/login`, login);
  }
}
