import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Register, RegisterForm } from './register.form';

@Component({
  standalone: true,
  imports: [RouterLink, RegisterForm],
  template: `
    <article>
      <header>
        <h2>Register</h2>
      </header>
      <main>
        <lab-register (register)="onRegister($event)" />
      </main>
      <footer>
        <a [routerLink]="['/auth', 'login']">Login if already have an account</a>
      </footer>
    </article>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegisterPage {
  onRegister(register: Register) {
    console.log('Register', register);
  }
}
