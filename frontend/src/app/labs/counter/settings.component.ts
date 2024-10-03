import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-setting',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div>
      <div>
        <button
          class="btn btn-sm btn-circle bg-red-400"
          (click)="setIncrementValue(1)"
        >
          1
        </button>
        <button
          class="btn btn-sm btn-circle bg-red-400"
          (click)="setIncrementValue(3)"
        >
          3
        </button>
        <button
          class="btn btn-sm btn-circle bg-red-400"
          (click)="setIncrementValue(5)"
        >
          5
        </button>
      </div>
    </div>
  `,
  styles: ``,
})
export class SettingsComponent {
  incrementValue = 1;

  setIncrementValue(value: number) {
    this.incrementValue = value;
  }
}
