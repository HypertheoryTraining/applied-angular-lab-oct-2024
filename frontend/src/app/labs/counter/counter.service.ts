import { computed, effect, Injectable, signal } from '@angular/core';
export interface GolfHole {
  holeNumber: number;
  score: number;
}

@Injectable({
  providedIn: 'root',
})
export class CountService {
  #currentHole = signal(1);
  #currentScore = signal(0);

  #holes = signal<GolfHole[]>([]);

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

  totalScore = computed(() => {
    const finalScore = this.#holes() // this holes signal is still referring to the same value.
      .map((s) => s.score) // score
      .reduce((a, b) => a + b, 0);
    return finalScore;
  });
  sunk() {
    const record: GolfHole = {
      holeNumber: this.#currentHole(),
      score: this.#currentScore(),
    };

    this.#holes.set([record, ...this.#holes()]); // reassigning this to a new list
    this.#currentHole.update((h) => (h += 1));
    this.#currentScore.set(0);
  }

  currentScore = computed(() => this.#currentScore);
  currentHole = computed(() => this.#currentHole);
  holes = computed(() => this.#holes);
}
