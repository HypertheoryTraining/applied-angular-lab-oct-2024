import { updateState, withDevtools } from '@angular-architects/ngrx-toolkit';
import { HttpErrorResponse } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
} from '@ngrx/signals';
import { addEntity, setEntities, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import {
  setError,
  setFulfilled,
  setPending,
  withRequestStatus,
} from '@shared/request-status.feature';
import { map, mergeMap, pipe, switchMap, tap } from 'rxjs';
import {
  HouseListEntity,
  HouseRatingEntry,
  HouseRatingListItem,
} from '../pages/house-rating/types';
import { RatingsService } from '../services/ratings.service';
import { getTotalScore } from '../pages/house-rating/utils';
import { HousePendingStore } from './house-pending.store';
import { HouseSortAndFilterStore } from './sort-and-filter.store';


export const HouseListStore = signalStore(
  withDevtools('house-list'),
  withRequestStatus(),
  withEntities<HouseListEntity>(),
  withComputed((store) => {
    const pendingStore = inject(HousePendingStore);
    const sortStore = inject(HouseSortAndFilterStore);
    return {
      getHouseListModel: computed(() => {
        const combined = [
          ...store.entities(),
          ...pendingStore.getHouseListModel(),
        ];
        let filtered = [
          ...combined
            .map(
              (e) =>
                ({ ...e, totalScore: getTotalScore(e) } as HouseRatingListItem)
            )
            .filter((e) => e.totalScore <= sortStore.scoreFilter()),
        ];

        if (sortStore.hasFullSize()) {
          filtered = filtered.filter((e) => e.hasFullSizeCandy);
        }
        if (sortStore.hasAmbiance()) {
          filtered = filtered.filter((e) => e.hasAmbiance);
        }
        const sortKey =
          sortStore.sortBy() === 'address' ? 'address' : 'totalScore';
        if (sortKey === 'address') {
          return [
            ...filtered.sort((a, b) => a.address.localeCompare(b.address)),
          ];
        } else {
          return [...filtered.sort((a, b) => b.totalScore - a.totalScore)];
        }
      }),
    };
  }),
  withMethods((store) => {
    const service = inject(RatingsService);
    const pendingStore = inject(HousePendingStore);
    return {
      _load: rxMethod<void>(
        pipe(
          tap(() => patchState(store, setPending())),
          mergeMap(() =>
            service.getHouseList().pipe(
              tapResponse({
                next: (d) => patchState(store, setEntities(d), setFulfilled()),
                error: () =>
                  patchState(
                    store,
                    setError('Error Getting List - Server Returned Bad Data')
                  ),
              })
            )
          )
        )
      ),
      add: rxMethod<HouseRatingEntry>(
        pipe(
          map((h) => {
            const tempId = crypto.randomUUID();
            return [h, tempId] as [HouseRatingEntry, string];
          }),
          tap(() => patchState(store, setPending())),
          tap(([h, id]) => {
            pendingStore.addHouse({ ...h, id });
          }),
          mergeMap(([h, id]) =>
            service.addHouseToList(h, id).pipe(
              tapResponse({
                next: ([h, tempId]) => {
                  updateState(
                    store,
                    'adding from api',
                    addEntity(h),
                    setFulfilled()
                  );
                  pendingStore.removeHouse(tempId);
                },
                error: (e: HttpErrorResponse) =>
                  patchState(
                    store,
                    setError(`Error - couldn't add house ${e.error}`)
                  ),
              })
            )
          )
        )
      ),
      update: rxMethod<HouseRatingEntry>(
        pipe(
          map((h) => {
            const tempId = '1'; //temp hardcode and bring real id here.
            return [h, tempId] as [HouseRatingEntry, string];
          }),
          tap(() => patchState(store, setPending())),
          tap(([h, id]) => {
            pendingStore.addHouse({ ...h, id });
          }),
          mergeMap(([h, id]) =>
            service.updateHouseToList(h, id).pipe(
              tapResponse({
                next: ([h, tempId]) => {
                  updateState(
                    store,
                    'updating from api',
                    addEntity(h),
                    setFulfilled()
                  );
                  pendingStore.removeHouse(tempId);
                },
                error: (e: HttpErrorResponse) =>
                  patchState(
                    store,
                    setError(`Error - couldn't update house ${e.error}`)
                  ),
              })
            )
          )
        )
      ),  
      loadById: rxMethod<string>(                
        pipe(          
          tap(() => patchState(store, setPending())),          
          switchMap(() =>            
            service.getHouseListById('1').pipe( //houseId - temp hardcode and bring real id here.
              tapResponse({
                next: (d) => patchState(store, setEntities(d), setFulfilled()),
                error: () =>
                  patchState(
                    store,
                    setError('Error Getting List - Server Returned Bad Data')
                  ),
              })
            )
          )
        )
      )
    };
  }),
  withHooks({
    onInit(store) {
      store._load();
    },
  })
);
