import { updateState, withDevtools } from '@angular-architects/ngrx-toolkit';
import { HttpErrorResponse } from '@angular/common/http';
import { computed, inject, Signal } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  getState,
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
} from '@ngrx/signals';
import {
  addEntity,
  removeEntity,
  setEntities,
  setEntity,
  updateEntity,
  withEntities,
} from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import {
  setError,
  setFulfilled,
  setPending,
  withRequestStatus,
} from '@shared/request-status.feature';
import { map, mergeMap, Observable, pipe, tap, withLatestFrom } from 'rxjs';
import {
  HouseListEntity,
  HouseRatingEntry,
  HouseRatingListItem,
} from '../pages/house-rating/types';
import { RatingsService } from '../services/ratings.service';
import { getTotalScore } from '../pages/house-rating/utils';
import { HousePendingStore } from './house-pending.store';
import { HouseSortAndFilterStore } from './sort-and-filter.store';
import { HouseRatingStore } from '../pages/house-rating/house-rating.store';
import { toObservable } from '@angular/core/rxjs-interop';
import { boolean } from 'zod';

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
          ...store
            .entities()
            .filter(
              (h) =>
                !pendingStore.getHouseListModel().some((ph) => ph.id === h.id)
            ),
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
      add: rxMethod<HouseListEntity>(
        pipe(
          map((h) => {
            const tempId = crypto.randomUUID();
            return [h, tempId] as [HouseListEntity, string];
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
                error: (e: HttpErrorResponse) => {
                  pendingStore.removeHouse(h.id);
                  patchState(
                    store,
                    setError(`Error - couldn't add house ${e.error}`)
                  );
                },
              })
            )
          )
        )
      ),
      renovate: rxMethod<HouseListEntity>(
        pipe(
          tap((h) => patchState(store, setPending())),
          tap((h) => {
            pendingStore.addHouse(h);
          }),
          mergeMap((h) =>
            service.renovateHouse(h).pipe(
              tapResponse({
                next: (h) => {
                  updateState(
                    store,
                    'renovating from api',
                    updateEntity({ id: h.id, changes: () => h }),
                    setFulfilled()
                  );
                  pendingStore.removeHouse(h.id);
                },
                error: (e: HttpErrorResponse) => {
                  pendingStore.removeHouse(h.id);
                  patchState(
                    store,
                    setError(`Error - couldn't renovate house ${e.error}`)
                  );
                },
              })
            )
          )
        )
      ),
      delete: rxMethod<string>(
        pipe(
          tap(() => patchState(store, setPending())),
          mergeMap((id) =>
            service.deleteHouse(id).pipe(
              tapResponse({
                next: (h) => {
                  updateState(
                    store,
                    'deleting from api',
                    removeEntity(id),
                    setFulfilled()
                  );
                },
                error: (e: HttpErrorResponse) =>
                  patchState(
                    store,
                    setError(`Error - couldn't renovate house ${e.error}`)
                  ),
              })
            )
          )
        )
      ),
    };
  }),
  withHooks({
    onInit(store) {
      store._load();
    },
  })
);
