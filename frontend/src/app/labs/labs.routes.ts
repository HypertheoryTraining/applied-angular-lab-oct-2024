import { Routes } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { LabsComponent } from './labs.component';
import { CounterStore } from './counter/counter.store';
import { SettingsComponent } from './counter/settings.component';

export const LABS_ROUTES: Routes = [
  {
    path: '',
    providers: [CounterStore],
    component: LabsComponent,
    children: [
      {
        path: 'counter',

        component: CounterComponent,
      },
      {
        path: 'settings',

        component: SettingsComponent,
      },
    ],
  },
];
