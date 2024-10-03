import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  DecrementButtonDirective,
  IncrementButtonDirective,
} from '@shared/increment-button.directive';
//import { CounterService } from './counter.service';
import { CounterStore } from '../../shared/counter.store';

@Component({
  selector: 'app-counter',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IncrementButtonDirective, DecrementButtonDirective],
  template: `
    <p>Click to Increment/Decrement</p>

    <div>
      <div>
        @if((service.currentCount() - service.incrementBy()) <= 0) {
        <button appDecrementButton (click)="service.decrement()">-</button>
        }
        <span>{{ service.currentCount() }}</span>
        <button appIncrementButton (click)="service.increment()">+</button>
      </div>
      @if(service.currentCount() % 3 === 0){
      <p>Fizz</p>
      } @if(service.currentCount() % 5 === 0){
      <p>Buzz</p>
      }
    </div>
  `,
  styles: ``,
})
export class CounterComponent {
  service = inject(CounterStore);
}
