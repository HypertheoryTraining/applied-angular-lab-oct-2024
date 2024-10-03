import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Book } from '../types';

@Component({
  selector: 'app-book-details',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: ` <pre>item</pre> `,
  styles: ``,
})
export class BookDetailsComponent {
  item = input.required<Book>();
}
