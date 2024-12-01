import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-labs',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterOutlet],
  template: ` 
    <h2>Labs</h2>
    <div>
      <a class="btn btn-link" routerLink="counter">Count with ME</a>
    </div>
    <div>
        <div>
          <div>
            <div>
            </div>
          </div>
        </div>
      </div>
    <div>
      <router-outlet/>
    </div>
  `,
  styles: ``,
})
export class LabsComponent {}
