import {
  Component,
  ChangeDetectionStrategy,
  inject,
  effect,
} from '@angular/core';
import { LabsService } from '../labs.service';

@Component({
  selector: 'app-prefs',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: ` <div class="join">
    <input
      [checked]="labService.getCounterValue === 1"
      class="join-item btn"
      type="radio"
      name="options"
      aria-label="1"
      [value]="1"
      (click)="onChange($event.target)"
    />
    <input
      [checked]="labService.getCounterValue === 3"
      class="join-item btn"
      type="radio"
      name="options"
      aria-label="3"
      [value]="3"
      (click)="onChange($event.target)"
    />
    <input
      [checked]="labService.getCounterValue === 5"
      class="join-item btn"
      type="radio"
      name="options"
      aria-label="5"
      [value]="5"
      (click)="onChange($event.target)"
    />
  </div>`,
  styles: ``,
})
export class PrefsComponent {
  labService = inject(LabsService);

  constructor() {
    effect(() => console.log(this.labService.getCounterValue));
  }

  onChange(tgt: EventTarget | null) {
    const e = tgt as HTMLInputElement;
    this.labService.setCounterValue(Number(e.value));
  }
}
