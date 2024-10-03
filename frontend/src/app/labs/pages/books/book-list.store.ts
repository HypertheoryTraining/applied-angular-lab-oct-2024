import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { patchState, signalStore, withHooks, withMethods } from '@ngrx/signals';
import { setEntities, withEntities } from '@ngrx/signals/entities';
import { BookService } from './books.service';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { mergeMap, pipe } from 'rxjs';
import { setError, withRequestStatus } from '@shared/request-status.feature';
import { tapResponse } from '@ngrx/operators';
import { Book } from './types';

export const BookListStore = signalStore(
  withDevtools('book-list'),
  withRequestStatus(),
  withEntities<Book>(),
  withMethods((store) => {
    const service = inject(BookService);
    return {
      _load: rxMethod<void>(
        pipe(
          //tap(() => patchState(store, setPending())),
          mergeMap(() =>
            service.getBookList().pipe(
              tapResponse({
                next: (d) => patchState(store, setEntities(d)),
                error: () =>
                  patchState(
                    store,
                    setError('Error Getting Book List - Server Request Failed')
                  ),
              })
            )
          )
        )
      ),
    };
  }),
  withHooks({
    onInit(store) {
      store._load();
    },
  })
);
