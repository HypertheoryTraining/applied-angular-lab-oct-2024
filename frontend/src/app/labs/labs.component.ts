import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CounterStore } from '../shared/counter.store';
import { CounterComponent } from './pages/counter/counter.component';

@Component({
  selector: 'app-counter',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, CounterComponent],
  template: `
  <h2>Labs</h2> 
    <p>Lab Stuff Goes Here</p>
      <a [routerLink]="['/labs/counter']">Go to Counter Component</a>
      <router-outlet></router-outlet> <!-- Ensure there's a router outlet to render child routes -->
    <ul>
      <li><a class="link" routerLink="counter">Counter</a></li>
    </ul>
    <div>
      <p>Counter: {{ counterService.totalNumber() }}</p>
    </div>
    <section>
      <div class="flex">
        <router-outlet />
      </div>
    </section>
  `,
  styles: ``,
})
export class LabsComponent {
  counterService = inject(CounterStore);
}
