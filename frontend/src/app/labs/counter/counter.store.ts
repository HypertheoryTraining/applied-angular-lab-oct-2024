import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';

export const CounterStore = signalStore(
  withState({ current: 0 }),
  withMethods((store) => {
    return {
      increment: () => patchState(store, { current: store.current() + 1 }),
      decrement: () => patchState(store, { current: store.current() - 1 }),
    };
  }),
  withComputed((store) => ({
    decrementShouldBeDisabled: computed(() => store.current() === 0),
  }))
);
