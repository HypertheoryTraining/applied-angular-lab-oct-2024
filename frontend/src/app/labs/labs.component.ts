import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-labs',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink],
  template: `
    <h2>Labs</h2>
    <ul>
      <li>
        <a class="link" routerLink="books">Books</a>
      </li>
    </ul>
    <section>
      <div class="flex">
        <router-outlet />
      </div>
    </section>
  `,
  styles: ``,
})
export class LabsComponent {}
