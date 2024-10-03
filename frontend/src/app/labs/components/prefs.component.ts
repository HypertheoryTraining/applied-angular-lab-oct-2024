import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CounterStore } from '../../shared/counter.store';

@Component({
  selector: 'app-prefs',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div>
      <button appPreferenceButton class="btn" (click)="service.setIncrement(1)">
        1
      </button>
      <button appPreferenceButton class="btn" (click)="service.setIncrement(3)">
        3
      </button>
      <button appPreferenceButton class="btn" (click)="service.setIncrement(5)">
        5
      </button>
    </div>
  `,
  styles: ``,
})
export class PrefsComponent {
  service = inject(CounterStore);
}
