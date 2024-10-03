import {
    patchState,
    signalStore,
    withMethods,
    withState,
  } from '@ngrx/signals';
  
  interface CounterState {
    currentNumber: number;
    totalNumber: number;
  }
  
  const initialState: CounterState = {
    currentNumber: 1,
    totalNumber: 0,
  };
  export const CounterStore = signalStore(
    withState(initialState),
    withMethods((store) => {
      return {
        decrement() {
          patchState(store, { totalNumber: store.totalNumber() - 1 });
        },
        increment() {
          patchState(store, { totalNumber: store.totalNumber() + 1 });
        },
      };
    }),
  );
  