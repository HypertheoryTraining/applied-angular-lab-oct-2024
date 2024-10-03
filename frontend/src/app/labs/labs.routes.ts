import { Routes } from '@angular/router';
import { LabsComponent } from './labs.component';
import { CounterComponent } from './components/counter.component';
import { PrefsComponent } from './components/prefs.component';
import { LabsService } from './labs.service';
import { BooksComponent } from './components/books.component';

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
      {
        path: 'books',
        component: BooksComponent,
      },
    ],
  },
];
