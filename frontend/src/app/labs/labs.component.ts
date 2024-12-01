import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-labs',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink],
  template: `
    <h2>Labs</h2>
    <ul>
      <li><a class="link" routerLink="counter">Simple Counter Exercise</a></li>

      <li><a class="link" routerLink="prefs">Increment preferences</a></li>

      <li><a class="link" routerLink="booklist">Library</a></li>
    </ul>
    <div class="flex">
      <router-outlet />
    </div>
  `,
  styles: ``,
})
export class LabsComponent {}
