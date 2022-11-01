import { Pipe, PipeTransform } from '@angular/core';
import { catchError, map, Observable, of, startWith } from 'rxjs';

export interface ILoadingObservable<T> {
  loading: boolean;
  error: Error;
  value: T;
}

export type PartialObservableLoader<T> = Partial<ILoadingObservable<T>>;

@Pipe({
  name: 'loadingObservable',
})
export class LoadingObservablePipe implements PipeTransform {
  transform<T>(
    observable$: Observable<T>
  ): Observable<PartialObservableLoader<T>> {
    return observable$.pipe(
      map((value: T) => ({ loading: false, value })),
      startWith({ loading: true }),
      catchError((error: Error) => of({ loading: false, error }))
    );
  }
}
