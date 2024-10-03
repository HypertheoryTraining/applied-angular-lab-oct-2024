import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

interface CountStatus {
  currentCount: number;
  preferredAmount: number;
  fizz: boolean;
  buzz: boolean;
}

const initialStatus: CountStatus = {
  currentCount: 0,
  fizz: false,
  buzz: false,
  preferredAmount: 1,
};
export const CountStore = signalStore(
  withState(initialStatus),
  withMethods((store) => {
    return {
      decrease() {
        if (store.currentCount() - store.preferredAmount() < 0) {
          alert('How dare you attempt to go negative. SUBTRACTION DENIED.');
          return;
        }
        patchState(store, {
          currentCount: store.currentCount() - store.preferredAmount(),
        });
      },
      increase() {
        patchState(store, {
          currentCount: store.currentCount() + store.preferredAmount(),
        });
      },
      checkFizzBuzz() {
        patchState(store, {
          fizz: store.currentCount() % 3 == 0 && store.currentCount() != 0,
          buzz: store.currentCount() % 5 == 0 && store.currentCount() != 0,
        });
      },
      setIncrement(value: number) {
        patchState(store, { preferredAmount: value });
      },
    };
  })
);
