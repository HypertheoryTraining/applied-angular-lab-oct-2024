import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { withDevtools } from '@angular-architects/ngrx-toolkit';

type Filter = {
  filter: string;
};
export const BookFilterStore = signalStore(
  { providedIn: 'root' },
  withState<Filter>({
    filter: '',
  }),
  withDevtools('book-filter'),
  withMethods((store) => ({
    setFilter: (filter: string) => {
      patchState(store, { filter });
    },
  }))
);
