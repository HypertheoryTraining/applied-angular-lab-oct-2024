import { Routes } from '@angular/router';
import { LabsComponent } from './labs.component';
import { CounterComponent } from './counter.component';
import { PrefsComponent } from './prefs.component';
import { LabsService } from './labs.service';

export const LABS_ROUTES: Routes = [
  {
    path: '',
    providers: [LabsService],
    component: LabsComponent,
    children: [
      {
        path: 'counter',
        component: CounterComponent,
      },
      {
        path: 'prefs',
        component: PrefsComponent,
      },
    ],
  },
];
