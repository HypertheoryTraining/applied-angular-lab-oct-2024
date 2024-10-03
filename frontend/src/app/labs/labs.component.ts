import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CounterComponent } from './counter.component';

@Component({
  selector: 'app-labs',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CounterComponent],
  template: `
    <h2>Labs</h2>
    <app-counter />
  `,
  styles: ``,
})
export class LabsComponent {}
