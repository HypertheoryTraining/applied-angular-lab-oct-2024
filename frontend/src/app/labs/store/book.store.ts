import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
} from '@ngrx/signals';
import { Book, BooksService } from '../services/books.service';
import {
  setError,
  setFulfilled,
  setPending,
  withRequestStatus,
} from '@shared/request-status.feature';
import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { setEntities, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, tap, mergeMap } from 'rxjs';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { BookFilterStore } from './filter.store';
import { BookLimitStore } from './limit.store';

export const BookStore = signalStore(
  { providedIn: 'root' },
  withDevtools('books'),
  withEntities<Book>(),
  withRequestStatus(),
  withComputed(
    (
      { entities },
      filter = inject(BookFilterStore).filter,
      limit = inject(BookLimitStore).limit
    ) => ({
      books: computed(() =>
        entities()
          .filter((book) => FilterBy(book, filter()))
          .slice(0, limit())
      ),
    })
  ),
  withMethods((store, service = inject(BooksService)) => ({
    _load: rxMethod<void>(
      pipe(
        tap(() => patchState(store, setPending())),
        mergeMap(() =>
          service.get().pipe(
            tapResponse(
              (books) => patchState(store, setEntities(books)),
              () =>
                patchState(
                  store,
                  setError('Error Getting Books - Server Returned Bad Data')
                ),
              () => patchState(store, setFulfilled)
            )
          )
        )
      )
    ),
  })),
  withHooks({
    onInit(store) {
      store._load();
    },
  })
);

function FilterBy(book: Book, filter: string) {
  return (
    book.author.toLowerCase().includes(filter.toLowerCase()) ||
    book.title.toLowerCase().includes(filter.toLowerCase())
  );
}
