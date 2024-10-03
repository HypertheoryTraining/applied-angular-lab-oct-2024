import { Component, effect, signal } from '@angular/core';
export interface Counter {
    counter: number;
    score: number;
}

@Component({
  selector: 'app-counter',
  template: `
    <div>
      <h1>Counter: {{counter()}</h1>
      <button (click)="increment()">Increment</button>
      <button (click)="decrement()">Decrement</button>
    </div>
  `
})
export class CounterComponent {
    #currentScore = signal(0);
  
    constructor() {
      effect(() => {
        // put code here to save the stuff to local storage, like in the onInit of the Store version.
      });
    }
    increment() {
      this.#currentScore.update((s) => s + 1);
    }
    decrement() {
      this.#currentScore.update((s) => s - 1);
    }
}