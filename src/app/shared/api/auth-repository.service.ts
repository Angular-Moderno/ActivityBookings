import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Register } from 'src/app/routes/auth/register.form';

@Injectable({
  providedIn: 'root',
})
export class AuthRepositoryService {
  #apiUrl = 'http://localhost:3000';
  #http = inject(HttpClient);

  postRegister$(register: Register): Observable<UserAccessToken> {
    return this.#http.post<UserAccessToken>(`${this.#apiUrl}/register`, register);
  }
}

export type UserAccessToken = {
  user: User;
  accessToken: string;
};

export type User = {
  id: number;
  username: string;
  email: string;
  terms: boolean;
};
