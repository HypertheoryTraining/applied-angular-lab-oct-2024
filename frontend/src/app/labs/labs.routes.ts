import { Routes } from '@angular/router';
import { LabsComponent } from './labs.component';
import { CounterComponent } from '../components/counter.component';

export const LABS_ROUTES: Routes = [
  {
    path: '',
    component: LabsComponent,
    children: [
      {
        path: 'counter',
        component: CounterComponent,
      }
    ]
  },
];
