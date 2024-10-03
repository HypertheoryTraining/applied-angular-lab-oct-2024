import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { withDevtools } from '@angular-architects/ngrx-toolkit';

type Limit = {
  limit: number
};
export const BookLimitStore = signalStore(
  { providedIn: 'root' },
  withState<Limit>({
    limit: 15
  }),
  withDevtools('book-limit'),
  withMethods((store) => ({
    setLimit: (limit: number) => {
      patchState(store, { limit });
    },
  }))
);
