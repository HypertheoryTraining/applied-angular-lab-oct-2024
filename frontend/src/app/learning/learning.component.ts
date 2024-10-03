import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { GolfStore } from '../shared/golf.store';
import { GolfComponent } from './pages/golf/golf.component';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, GolfComponent],
  template: `
    <ul>
      <li><a class="link" routerLink="golf">Golf Score Thing</a></li>
    </ul>
    <div>
      <p>Your Current Golf Score is: {{ golfService.totalScore() }}</p>
    </div>
    <section>
      <div class="flex">
        <router-outlet />
      </div>
    </section>
  `,
  styles: ``,
})
export class LearningComponent {
  golfService = inject(GolfStore);
}
