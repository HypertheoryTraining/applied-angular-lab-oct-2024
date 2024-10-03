import { Routes } from '@angular/router';
import { BookHomeComponent } from './components/home.component';
import { BookDetailComponent } from './components/book-detail.component';

export const BOOKS_ROUTES: Routes = [
  {
    path: '',
    component: BookHomeComponent,
    children: [
      {
        path: ':id',
        component: BookDetailComponent
      }
    ]
  },

];
