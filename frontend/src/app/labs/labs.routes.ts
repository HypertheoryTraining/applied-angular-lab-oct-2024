import { Routes } from '@angular/router';
import { LabsComponent } from './labs.component';
import { CounterComponent } from './components/counter.component';
import { PrefsComponent } from './components/prefs.component';
import { CountStore } from './stores/count.store';

export const LABS_ROUTES: Routes = [
  {
    path: '',
    providers: [CountStore],
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
