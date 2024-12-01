import {
  patchState,
  signalStore,
  watchState,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';

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
      reset() {
        patchState(store, {
          currentCount: 0,
        });
      },
      default() {
        patchState(store, {
          preferredAmount: 1,
        });
      },
    };
  }),
  withHooks({
    onInit(store) {
      const savedCount = localStorage.getItem('counter-info');
      if (savedCount) {
        const loadedCount = JSON.parse(savedCount) as CountStatus;
        patchState(store, loadedCount);
      }
      watchState(store, (status) => {
        localStorage.setItem('counter-info', JSON.stringify(status));
      });
    },
  })
);
