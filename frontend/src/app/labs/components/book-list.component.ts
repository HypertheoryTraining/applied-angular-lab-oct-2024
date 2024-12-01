import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { BookList } from '../types/book';

@Component({
  selector: 'app-book-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Author</th>
          <th>Year</th>
        </tr>
      </thead>
      <tbody>
        @for (book of books(); track book.id) {
        <tr>
          <th>{{ book.id }}</th>
          <td>{{ book.title }}</td>
          <td>{{ book.author }}</td>
          <td>{{ book.year }}</td>
        </tr>
        }
      </tbody>
    </table>
  `,
  styles: ``,
})
export class BookListComponent {
  books = input.required<BookList>();
}
