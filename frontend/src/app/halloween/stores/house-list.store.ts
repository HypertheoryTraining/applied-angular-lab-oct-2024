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
  withState,
} from '@ngrx/signals';
import {
  addEntity,
  removeEntity,
  setEntities,
  withEntities,
} from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import {
  setError,
  setFulfilled,
  setPending,
  withRequestStatus,
} from '@shared/request-status.feature';
import { map, mergeMap, pipe, tap } from 'rxjs';
import {
  HouseListEntity,
  HouseRatingEntry,
  HouseRatingListItem,
} from '../pages/house-rating/types';
import { HouseManagementService } from '../services/house-management.service';
import { getTotalScore } from '../pages/house-rating/utils';
import { HousePendingStore } from './house-pending.store';
import { HouseSortAndFilterStore } from './sort-and-filter.store';

export const HouseListStore = signalStore(
  withDevtools('house-list'),
  withRequestStatus(),
  withEntities<HouseListEntity>(),
  withState<{ selectedHouse: string | undefined }>({
    selectedHouse: undefined,
  }),
  withComputed((store) => {
    const pendingStore = inject(HousePendingStore);
    const sortStore = inject(HouseSortAndFilterStore);
    return {
      getSelectedHouse: computed(() => {
        const selectedId = store.selectedHouse();
        if (selectedId) {
          return store.entityMap()[selectedId];
        } else {
          return undefined;
        }
      }),
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
    const service = inject(HouseManagementService);
    const pendingStore = inject(HousePendingStore);
    return {
      setCurrent: (id: string) => patchState(store, { selectedHouse: id }),
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
      delete: rxMethod<string>(
        pipe(
          tap(() => patchState(store, setPending())),
          mergeMap((id) =>
            service.deleteHouseFromList(id).pipe(
              tapResponse({
                next: (deletedId) => {
                  updateState(
                    store,
                    'deleting from api',
                    removeEntity(deletedId),
                    setFulfilled()
                  );
                },
                error: (e: HttpErrorResponse) =>
                  patchState(
                    store,
                    setError(`Error - couldn't delete house ${e.error}`)
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
