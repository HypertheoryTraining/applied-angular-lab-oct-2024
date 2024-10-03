import { Routes } from '@angular/router';
import { LabsComponent } from './labs.component';
import { CounterComponent } from './components/counter.component';
import { PrefsComponent } from './components/prefs.component';
import { BookListComponent } from './components/booklist.component';

export const LABS_ROUTES: Routes = [
  {
    path: '',
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
      {
        path: 'booklist',
        component: BookListComponent,
      },
    ],
  },
];
