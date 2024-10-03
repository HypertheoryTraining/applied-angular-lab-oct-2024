import { Routes } from '@angular/router';
import { LabsComponent } from './labs.component';
//import {CounterComponent} from './pages/counter/components/counter/counter.component';
import { CounterUiComponent } from './pages/counter/components/counter/counter.ui.component';
//import { CounterComponent } from './pages/counter/components/counter/counter.component';
import { CounterStore } from './pages/counter/components/counter/counter.store';

export const LABS_ROUTES: Routes = [
  {
    path: '',
    component: LabsComponent,
    providers: [CounterStore],
    children: [
      {
        path: 'counter',
        component: CounterUiComponent,
      },
    ],
  },
];
