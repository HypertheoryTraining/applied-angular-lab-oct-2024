import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  DecrementButtonDirective,
  IncrementButtonDirective,
} from '@shared/increment-button.directive';
import { CounterStore } from '../../../shared/counter.store';

@Component({
  selector: 'app-counter',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [],
  imports: [IncrementButtonDirective, DecrementButtonDirective],
  template: `
    <div>
      <div>
        <button appDecrementButton (click)="service.decrement()">-</button>
        <span>{{ service.currentNumber() }}</span>
        <button appIncrementButton (click)="service.increment()">+</button>
      </div>

      <p>Counter: {{ service.totalNumber() }}</p>
      
  `,
  styles: ``,
  
})
export class CounterComponent {
  service = inject(CounterStore);

    // #currentScore = signal(0);
  
    // constructor() {
    //   effect(() => {
    //     // put code here to save the stuff to local storage, like in the onInit of the Store version.
    //   });
    // }
    // increment() {
    //   this.#currentScore.update((s) => s + 1);
    // }
    // decrement() {
    //   this.#currentScore.update((s) => s - 1);
    // }
}
