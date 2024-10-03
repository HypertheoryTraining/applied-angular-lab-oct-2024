import { Routes } from '@angular/router';
import { LabsComponent } from './labs.component';
import { BooksComponent } from './pages/books/books.component';
import { BookService } from './pages/books/books.service';
import { BookListStore } from './pages/books/book-list.store';
import { BookDetailsComponent } from './pages/books/components/book-details.component';

export const LABS_ROUTES: Routes = [
  {
    path: '',
    component: LabsComponent,
    providers: [BookService, BookListStore],
    children: [
      {
        path: 'books',
        component: BooksComponent,
        children: [
          {
            path: 'details/:id',
            component: BookDetailsComponent,
          },
        ],
      },
    ],
  },
];
