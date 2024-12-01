import { Routes } from '@angular/router';
import { HalloweenComponent } from './halloween.component';
import { HouseListStore } from './stores/house-list.store';
import { HouseListComponent } from './pages/house-list/house-list.component';
import { HouseRatingComponent } from './pages/house-rating/house-rating.component';
import { RatingsService } from './services/ratings.service';
import { HousePendingStore } from './stores/house-pending.store';
import { HouseRenovateComponent } from './pages/house-rating/house-renovate.component';
import { HouseSortAndFilterStore } from './stores/sort-and-filter.store';
import { HouseRatingStore } from './pages/house-rating/house-rating.store';
import { HouseDeleteComponent } from './pages/house-rating/house-delete.component';

export const HALLOWEEN_ROUTES: Routes = [
  {
    path: '',
    providers: [
      HouseListStore,
      RatingsService,
      HousePendingStore,
      HouseSortAndFilterStore,
      HouseRatingStore,
    ],
    component: HalloweenComponent,
    children: [
      {
        path: 'house-list',
        component: HouseListComponent,
        children: [
          {
            path: 'renovate/:id',
            component: HouseRenovateComponent,
          },
          {
            path: 'delete/:id',
            component: HouseDeleteComponent,
          },
        ],
      },
      {
        path: 'house-entry',
        component: HouseRatingComponent,
      },
    ],
  },
];
