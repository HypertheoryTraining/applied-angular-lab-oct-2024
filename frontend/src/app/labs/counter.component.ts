import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

@Component({
    selector: 'app-counter',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [],
    template: `
        
        <div>
            <p> {{ theCounter() }} </p>
            <div>
                <button (click)="incrementCounter()">+</button>
                &nbsp;&nbsp;&nbsp;
                <button (click)="decrementCounter()" [disabled]="theCounter() <= 0">-</button>
            </div>
        </div>
    `,
    styles: ``
})
export class CounterComponent {
    theCounter = signal(0);

    incrementCounter() {
        this.theCounter.update(val => val+1);
    }

    decrementCounter() {
        if(this.theCounter() > 0) {
            this.theCounter.update(val => val-1);
        }
    }

}