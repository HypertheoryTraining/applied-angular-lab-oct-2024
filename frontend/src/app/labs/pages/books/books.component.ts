import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { BookListStore } from './book-list.store';
import { BookDetailsComponent } from './components/book-details.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-books',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BookDetailsComponent, RouterOutlet],
  template: `
    <!--//
    {
    author: 'Chinua Achebe',
    country: 'Nigeria',
    imageLink: 'images/things-fall-apart.jpg',
    language: 'English',
    link: 'https://en.wikipedia.org/wiki/Things_Fall_Apart
',
    pages: 209,
    title: 'Things Fall Apart',
    year: 1958,
    id: '1',
  },
//-->
    <h2>books component</h2>
    <div class="overflow-x-auto">
      <table class="table">
        <!-- head -->
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          @for (book of store.entities(); track $index) {
          <tr>
            <td>{{ book.title }}</td>
            <td>{{ book.author }}</td>
            <td>
              <a routerLink="['details', book().id]" class="btn btn-link"
                >View Details</a
              >
            </td>
          </tr>
          } @empty {
          <tr>
            <td colspan="3">No Books Found</td>
          </tr>
          }
        </tbody>
      </table>
    </div>
    <router-outlet />
  `,
  styles: ``,
})
export class BooksComponent {
  store = inject(BookListStore);
}
