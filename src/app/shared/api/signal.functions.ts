import { Signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Observable, switchMap } from 'rxjs';


// ToDo: 🔥 Remove this unused code, bc is replaced by rxResource

type ApiTarget$<T, K> = (sourceValue: T) => Observable<K>;

/**
 * From a source signal, creates another with the result of a target observable
 * @param source The source signal to call the API target observable
 * @param apiTarget$ The API target observable called with the source value
 * @param initialValue An initial value for the returned signal
 * @returns A signal with the result of the API target observable
 */
function toSignalMap<T, K>(
  source: Signal<T>,
  apiTarget$: ApiTarget$<T, K>,
  initialValue: K,
): Signal<K> {
  const source$ = toObservable(source);
  const apiResult$ = source$.pipe(switchMap(apiTarget$));
  return toSignal(apiResult$, { initialValue });
}
