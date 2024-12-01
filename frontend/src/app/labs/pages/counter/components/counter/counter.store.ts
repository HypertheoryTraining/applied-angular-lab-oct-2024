import {
    patchState,
    signalStore,
    withComputed,
    withMethods,
    withState,
  } from '@ngrx/signals';
    import { computed } from '@angular/core';

  interface CounterState {
    current: number;
    by: number;
  }

  const initialState: CounterState = {
    current: 0,
    by:1
  };
  
export const CounterStore = signalStore(
    withState(initialState),
    withComputed((state) => {
      return {
       decrementDisabled: computed(() => {
            return state.current() === 0;
       }),
       fizzBuzz: computed(() => {
        if(state.current() % 3 === 0 && state.current() % 5 != 0)
            return "Fizz";
        else if(state.current() % 5 === 0 && state.current() % 3 != 0)
            return "Buzz";
        else if(state.current() % 3 === 0 && state.current() % 5 === 0)
            return "FizzBuzz";
        return "";
       })
      };
    }),
    withMethods((store) => {
      return {
        decrement() {
          patchState(store, { current: store.current() - store.by() });
        },
       increment() {
          patchState(store, { current: store.current() + store.by() });
        },
        setCountby(by: number) {
            patchState(store, {by: by});
        }
      };
    })
);