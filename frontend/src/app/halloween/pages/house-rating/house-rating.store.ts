import { updateState, withDevtools } from '@angular-architects/ngrx-toolkit';
import { computed, inject } from '@angular/core';
import {
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { HouseListStore } from '../../stores/house-list.store';
import { HouseListEntity, HouseRatingEntry } from './types';
import { getTotalScore } from './utils';
const initialState: HouseListEntity = {
  id: '0',
  address: '',
  qualityRating: 0,
  quantityRating: 0,
  hasAmbiance: false,
  hasFullSizeCandy: false,
};
export const HouseRatingStore = signalStore(
  withDevtools('house-rating-entry'),
  withState(initialState),
  withMethods((store) => {
    const houseListStore = inject(HouseListStore);
    return {
      set(
        key: keyof Omit<HouseListEntity, 'hasAmbiance' | 'hasFullSizeCandy'>,
        value: unknown
      ) {
        updateState(store, `changed ${key}`, { [key]: value });
      },
      toggle(
        key: keyof Pick<HouseListEntity, 'hasAmbiance' | 'hasFullSizeCandy'>
      ) {
        updateState(store, `toggled ${key}`, { [key]: !store[key]() });
      },
      add() {
        const h2 = getObjFromSignal(store as unknown as HouseRatingStore);
        houseListStore.add(h2);
        updateState(store, 'added house', initialState);
      },
      renovate() {
        const h2 = getObjFromSignal(store as unknown as HouseRatingStore);
        houseListStore.renovate(h2);
        console.log({ ...h2 });
        updateState(store, 'renovated house', initialState);
      },
    };
  }),
  withComputed((store) => {
    const listStore = inject(HouseListStore);
    return {
      addPending: computed(() => listStore.isPending()),
      totalScore: computed(() => {
        const obj = getObjFromSignal(store as unknown as HouseRatingStore);
        return getTotalScore(obj);
      }),
    };
  })
);

type HouseRatingStore = InstanceType<typeof HouseRatingStore>;
function getObjFromSignal(store: HouseRatingStore) {
  const houseToSend: HouseListEntity = {
    id: store.id(),
    address: store.address(),
    hasAmbiance: store.hasAmbiance(),
    hasFullSizeCandy: store.hasFullSizeCandy(),
    qualityRating: store.qualityRating(),
    quantityRating: store.quantityRating(),
  };
  return houseToSend;
}
