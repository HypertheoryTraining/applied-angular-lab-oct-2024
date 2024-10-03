import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CounterService {
  currentCount = signal(0);
  incrementBy = 1;

  increment() {
    this.currentCount.set(this.currentCount() + this.incrementBy);
  }
  decrement() {
    this.currentCount.set(this.currentCount() - this.incrementBy);
  }
  setIncrement(incr: number) {
    this.incrementBy = incr;
  }
}
