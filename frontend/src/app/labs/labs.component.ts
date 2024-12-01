import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-labs',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <h2>Labs</h2>
    <div class="flex flex-col">
      <a [routerLink]="'counter'" routerLinkActive="active">Counter</a>
      <a [routerLink]="'prefs'" routerLinkActive="active">PREFS</a>
      <a [routerLink]="'books'" routerLinkActive="active">Books</a>
    </div>
    <router-outlet />
  `,
  styles: `.active { text-decoration: underline; color: #FF865B }`,
})
export class LabsComponent {}
