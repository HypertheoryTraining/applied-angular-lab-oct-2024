import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { BookStore } from '../store/book.store';
import { BookListComponent } from './book-list.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-book-home',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BookListComponent, RouterOutlet],
  template: `
    <app-book-list />
    <router-outlet></router-outlet>
  `,
  styles: ``,
})
export class BookHomeComponent {
  store = inject(BookStore);
}
