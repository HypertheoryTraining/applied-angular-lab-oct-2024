import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CounterStore } from './counter.store';

@Component({
    selector: 'app-counter-ui',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [],
    template: `
        <div class="join">
            <button class="btn" [disabled]="store.decrementDisabled()" (click)="store.decrement()">
            -
            </button>
            <span>{{store.current()}}</span>
            <button class="btn" (click)="store.increment()">
            +
            </button>
        </div>
        <span>{{store.fizzBuzz()}}</span>
    `,
    styles: ``
})
export class CounterUiComponent {
    store = inject(CounterStore);
}