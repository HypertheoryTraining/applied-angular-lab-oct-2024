import { Routes } from '@angular/router';
import { HalloweenComponent } from './halloween.component';
import { HouseListStore } from './stores/house-list.store';
import { HouseListComponent } from './pages/house-list/house-list.component';
import { HouseRatingComponent } from './pages/house-rating/house-rating.component';
import { HouseManagementService } from './services/house-management.service';
import { HousePendingStore } from './stores/house-pending.store';
import { HouseEditComponent } from './pages/house-rating/house-edit.component';
import { HouseSortAndFilterStore } from './stores/sort-and-filter.store';

export const HALLOWEEN_ROUTES: Routes = [
  {
    path: '',
    providers: [
      HouseListStore,
      HouseManagementService,
      HousePendingStore,
      HouseSortAndFilterStore,
    ],
    component: HalloweenComponent,
    children: [
      {
        path: 'house-list',
        component: HouseListComponent,
        children: [
          {
            path: 'edit/:id',
            component: HouseEditComponent,
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
