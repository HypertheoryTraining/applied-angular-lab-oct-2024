import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CounterComponent } from './counter.component';

@Component({
  selector: 'app-labs',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, CounterComponent, RouterOutlet],
  template: ` <h2>Labs</h2>
      <div>
      <a class="btn btn-link" routerLink="counter">Counter App</a>
    </div>
    <router-outlet></router-outlet>
    `,
  styles: ``,
})
export class LabsComponent {}
