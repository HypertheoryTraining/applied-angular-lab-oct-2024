import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  ChangeDetectionStrategy,
  inject,
  Signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { TimelineComponent } from './timeline.component';
import { Book } from '../book.interface';

@Component({
  selector: 'app-books',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [JsonPipe, TimelineComponent],
  template: `
    <app-timeline [books]="books()" />

    <div class="overflow-x-auto">
      <table class="table">
        <!-- head -->
        <thead>
          <tr>
            <th></th>
            <th>Author</th>
            <th>Title</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          @for(book of books(); track book.id) {
          <tr class="hover">
            <th>{{ book.id }}</th>
            <td>{{ book.author }}</td>
            <td>{{ book.title }}</td>
            <td>{{ book.year }}</td>
          </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: ``,
})
export class BooksComponent {
  #http = inject(HttpClient);

  books: Signal<Book[]>;

  constructor() {
    this.books = toSignal(
      this.#http
        .get<{
          data: { id: string; title: string; author: string; year: number }[];
        }>('/api/books')
        .pipe(map((res) => res.data))
    ) as unknown as Signal<Book[]>;
  }
}
