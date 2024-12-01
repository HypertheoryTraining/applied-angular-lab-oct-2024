import {
  patchState,
  signalStore,
  watchState,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';

interface CounterState {
  incrementBy: number;
  currentCount: number;
}

const initialState: CounterState = {
  incrementBy: 1,
  currentCount: 0,
};
export const CounterStore = signalStore(
  withState(initialState),
  withMethods((store) => {
    return {
      decrement() {
        patchState(store, {
          currentCount: store.currentCount() - store.incrementBy(),
        });
      },
      increment() {
        patchState(store, {
          currentCount: store.currentCount() + store.incrementBy(),
        });
      },
      setIncrement(incr: number) {
        patchState(store, { incrementBy: incr });
      },
    };
  }),
  withHooks({
    onInit(store) {
      const savedState = localStorage.getItem('current-count');
      if (savedState !== null) {
        const savedCount = JSON.parse(savedState) as unknown as CounterState;
        patchState(store, savedCount);
      }
      watchState(store, (state) => {
        localStorage.setItem('current-count', JSON.stringify(state));
      });
    },
  })
);
