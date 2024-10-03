import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CountStore } from '../stores/count.store';

@Component({
  selector: 'app-counter',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet],
  template: `<h2>Counter: {{ store.currentCount() }}</h2>
    <button (click)="store.decrease(); store.checkFizzBuzz()">-</button>
    <button (click)="store.increase(); store.checkFizzBuzz()">+</button>
    @if(store.fizz()){<span>Fizz</span>}@if(store.buzz()){<span>Buzz</span>}
    <router-outlet></router-outlet>`,
  styles: ``,
})
export class CounterComponent {
  store = inject(CountStore);
}
