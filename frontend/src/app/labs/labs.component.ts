import { Component, ChangeDetectionStrategy } from '@angular/core';
//import { CounterComponent } from './pages/counter/components/counter/counter.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CounterUiComponent } from './pages/counter/components/counter/counter.ui.component';

@Component({
  selector: 'app-labs',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, CounterUiComponent],
  template: ` <h2>Labs</h2> 
    <a class="link" routerLink="counter">Counter labs</a>
    <section>
      <div class="flex">
        <router-outlet />
      </div>
    </section>
  `,
  styles: ``,
})
export class LabsComponent {}
