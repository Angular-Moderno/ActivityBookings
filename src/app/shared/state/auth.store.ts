import { Injectable, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { NULL_USER_ACCESS_TOKEN, UserAccessToken } from '@domain/userAccessToken.type';
import { LocalRepository } from '@services/local.repository';

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  #localRepository: LocalRepository = inject(LocalRepository);

  #state: WritableSignal<UserAccessToken> = signal<UserAccessToken>(
    this.#localRepository.load('userAccessToken', NULL_USER_ACCESS_TOKEN),
  );

  isAuthenticated: Signal<boolean> = computed(() => this.#state().accessToken !== '');
  isAnonymous: Signal<boolean> = computed(() => this.#state().accessToken === '');
  userId: Signal<number> = computed(() => this.#state().user.id);
  accessToken: Signal<string> = computed(() => this.#state().accessToken);

  setState(userAccessToken: UserAccessToken): void {
    this.#state.set(userAccessToken);
    this.#localRepository.save('userAccessToken', userAccessToken);
  }
}
