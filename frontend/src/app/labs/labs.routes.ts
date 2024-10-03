import { Routes } from '@angular/router';
import { LabsComponent } from './labs.component';
import { CounterComponent } from './pages/counter/counter.component';

export const LABS_ROUTES: Routes = [
  {
    path: 'labs',
    component: LabsComponent,
    children: [
      {
        path: 'counter',
        component: CounterComponent,
      }
    ]
  },
];
