import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <p>Counter: {{ counter() }}</p>
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
  `,
  styles: ``,
})
export class CounterComponent {
  counter = signal(4);

  onDecrement() {
    this.counter.update((val) => val - 1);
  }

  onIncrement() {
    this.counter.update((val) => val + 1);
  }
}
