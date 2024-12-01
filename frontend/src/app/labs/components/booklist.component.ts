import {
  Component,
  ChangeDetectionStrategy,
  Injectable,
  inject,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
//import handlers from '../../../mocks/books.handler';
//import { handlers } from '../../../mocks/books.handler';

@Component({
  selector: 'app-booklist',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: ` <div>
    <pre>{{ books() }}</pre>
  </div>`,
  styles: ``,
})
@Injectable()
export class BookListComponent {
  httpClient = inject(HttpClient);

  books = toSignal(
    this.httpClient
      .get<{
        data: { id: string; title: string; author: string; year: number }[];
      }>('/api/books')
      .pipe(map((res) => res.data))
  );
}
