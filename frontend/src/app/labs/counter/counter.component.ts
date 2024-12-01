import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import {
  DecrementButtonDirective,
  IncrementButtonDirective,
} from '@shared/increment-button.directive';
import { CounterStore } from './counter.store';
import { SettingsComponent } from './settings.component';

@Component({
  selector: 'app-count',
  providers: [],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IncrementButtonDirective, DecrementButtonDirective],
  template: `
    <div>
      <div>
        <button
          [disabled]="store.decrementShouldBeDisabled()"
          appDecrementButton
          (click)="store.decrement()"
        >
          -
        </button>

        <span>{{ store.current() }}</span>
        <button appIncrementButton (click)="store.increment()">+</button>
      </div>
    </div>
  `,
  styles: ``,
})
export class CounterComponent {
  store = inject(CounterStore);
}
