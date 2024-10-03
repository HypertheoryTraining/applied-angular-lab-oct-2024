import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';

@Component({
    selector: 'app-counter',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [],
    template: `
        <span>{{current()}}</span>
    `,
    styles: ``
})
export class CounterComponent {
    current = signal(0);
    isFizz = computed(() => this.current() % 3 === 0)
}