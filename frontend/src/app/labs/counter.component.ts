import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { LabsService } from './labs.service';

@Component({
  selector: 'app-counter',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <p>Counter: {{ counter() }}</p>
    <div class="flex flex-col">
      <div class="flex gap-4">
        <button
          class="btn btn-warning"
          (click)="onDecrement()"
          [disabled]="counter() === 0"
        >
          -
        </button>
        <button class="btn btn-primary" (click)="onIncrement()">+</button>
      </div>
      <div>
        <p [hidden]="isFizz()">Fizz</p>
        <p [hidden]="isBuzz()">Buzz</p>
        <p [hidden]="isFizzBuzz()">FizzBuzz</p>
      </div>
    </div>
  `,
  styles: ``,
})
export class CounterComponent {
  counter = signal(4);
  labService = inject(LabsService);

  onDecrement() {
    this.counter.update((val) => val - this.labService.getCounterValue);
  }

  onIncrement() {
    this.counter.update((val) => val + this.labService.getCounterValue);
  }

  isFizz = computed(() => this.counter() % 3 !== 0);
  isBuzz = computed(() => this.counter() % 5 !== 0);
  isFizzBuzz = computed(
    () => this.counter() % 3 !== 0 || this.counter() % 5 !== 0
  );
}
