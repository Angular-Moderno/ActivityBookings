import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Login } from '@domain/login.type';
import { LoginForm } from './login.form';

@Component({
  standalone: true,
  imports: [RouterLink, LoginForm],
  template: `
    <article>
      <header>
        <h2>Login</h2>
      </header>
      <main>
        <lab-login (login)="onLogin($event)" />
      </main>
      <footer>
        <a [routerLink]="['/auth', 'register']">Register if don't have an account</a>
      </footer>
    </article>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginPage {
  onLogin(login: Login) {
    console.log(login);
  }
}
