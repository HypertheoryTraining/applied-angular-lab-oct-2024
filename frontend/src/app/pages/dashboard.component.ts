import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { GolfStore } from '@shared/golf.store';
import { UserStore } from '@shared/user.store';
import { HouseListStore } from '../halloween/stores/house-list.store';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    @if(userStore.userLoggedIn()) {
    <p>The Dashboard Stuff Goes Here For Realz!</p>
    <div>
      <p>By The Way, Your Total Golf Score is: {{ golfStore.totalScore() }}</p>
    </div>
    } @else {
    <div class="flex w-52 flex-col gap-4">
      <div class="skeleton h-8 w-full"></div>
      <div class="skeleton h-4 w-28"></div>
      <div class="skeleton h-4 w-full"></div>
      <div class="skeleton h-4 w-full"></div>
    </div>
    }
  `,
  styles: ``,
})
export class DashboardComponent {
  golfStore = inject(GolfStore);
  userStore = inject(UserStore);
  houseListStore = inject(HouseListStore);
}
