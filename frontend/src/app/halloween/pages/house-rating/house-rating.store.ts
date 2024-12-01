import { updateState, withDevtools } from '@angular-architects/ngrx-toolkit';
import { computed, inject } from '@angular/core';
import {
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { HouseListStore } from '../../stores/house-list.store';
import { HouseRatingEntry } from './types';
import { getTotalScore } from './utils';
const initialState: HouseRatingEntry = {
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
        key: keyof Omit<HouseRatingEntry, 'hasAmbiance' | 'hasFullSizeCandy'>,
        value: unknown
      ) {
        updateState(store, `changed ${key}`, { [key]: value });
      },
      toggle(
        key: keyof Pick<HouseRatingEntry, 'hasAmbiance' | 'hasFullSizeCandy'>
      ) {
        updateState(store, `toggled ${key}`, { [key]: !store[key]() });
      },
      addEdit(id: string) {
        const h2 = getObjFromSignal(store as unknown as HouseRatingStore);
        houseListStore.add(h2);
        if(id === '0'){
          updateState(store, 'added house', initialState);          
        }else{
          updateState(store, 'update house', initialState); // need to update this initialState with form values to update
        }        
      },
      loadById(id: string) {        
        houseListStore.loadById(id);
      }
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
      // minTotalScore: computed(() => {
      //   const obj = getObjFromSignal(store as unknown as HouseRatingStore);
      //   return Math.min(getTotalScore(obj));
      // }),      
      // maxTotalScore: computed(() => {
      //   const obj = getObjFromSignal(store as unknown as HouseRatingStore);
      //   return Math.max(getMaxTotalScore(obj));
      // }),
    };
  })
);

type HouseRatingStore = InstanceType<typeof HouseRatingStore>;
function getObjFromSignal(store: HouseRatingStore) {
  const houseToSend: HouseRatingEntry = {
    address: store.address(),
    hasAmbiance: store.hasAmbiance(),
    hasFullSizeCandy: store.hasFullSizeCandy(),
    qualityRating: store.qualityRating(),
    quantityRating: store.quantityRating(),
  };
  return houseToSend;
}
