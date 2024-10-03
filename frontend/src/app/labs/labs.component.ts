import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CounterComponent } from './counter/counter.component';

@Component({
  selector: 'app-labs',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, CounterComponent],
  template: `
    <h2>Labs</h2>
    <p>Press buttons to start counting</p>
    <div>
      <a class="link" routerLink="counter">Counter </a>
      <a class="link" routerLink="settings"> Settings</a>
    </div>
    <section>
      <div class="flex">
        <router-outlet />
      </div>
    </section>
  `,
  styles: ``,
})
export class LabsComponent {}
