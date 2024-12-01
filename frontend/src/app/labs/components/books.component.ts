import { HttpClient } from '@angular/common/http';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { map } from 'rxjs';
import { BookResponse } from '../types/book';
import { BookListComponent } from './book-list.component';
import { BookTimelineComponent } from './book-timeline.component';

@Component({
  selector: 'app-books',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, BookListComponent, BookTimelineComponent],
  template: ` <app-book-timeline [books]="books()!"></app-book-timeline>
    <app-book-list [books]="books()!"></app-book-list>
    <router-outlet></router-outlet>`,
  styles: ``,
})
export class BooksComponent {
  client = inject(HttpClient);
  books = toSignal(
    this.client
      .get<BookResponse>('/api/books')
      .pipe(map((result) => result.data))
  );
}
