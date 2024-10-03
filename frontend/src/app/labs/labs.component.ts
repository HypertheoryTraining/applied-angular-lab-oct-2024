import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-labs',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterOutlet],
  template: `
    <h2>Labs</h2>
    <div><a class="btn btn-link" routerLink="counter">Counter</a></div>
    <div><a class="btn btn-link" routerLink="prefs">Preferences</a></div>
    <router-outlet></router-outlet>
  `,
  styles: ``,
})
export class LabsComponent {}
