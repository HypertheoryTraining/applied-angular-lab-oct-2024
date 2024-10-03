import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CountStore } from '../stores/count.store';

@Component({
  selector: 'app-prefs',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, ReactiveFormsModule],
  template: ` <span>Select preferred increment amount:</span>
    @for(amount of [1, 3, 5]; track amount) {
    <label>
      <input
        type="radio"
        (change)="store.setIncrement(amount)"
        [checked]="store.preferredAmount() === amount"
      />
      {{ amount }}
    </label>
    }
    <br />
    <button (click)="store.default()">Reset Default</button>
    <router-outlet></router-outlet>`,
  styles: ``,
})
export class PrefsComponent {
  store = inject(CountStore);
}
