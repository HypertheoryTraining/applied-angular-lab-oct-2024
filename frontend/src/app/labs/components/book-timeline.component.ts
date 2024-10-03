import {
  Component,
  ChangeDetectionStrategy,
  input,
  computed,
} from '@angular/core';
import { BookList } from '../types/book';

@Component({
  selector: 'app-book-timeline',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <ul class="timeline">
      @for (century of centuryList(); track $index) {
      <li>
        <hr />
        <div class="timeline-start">Century: {{ century }}</div>
        <div class="timeline-middle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="white"
            class="h-5 w-5"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="timeline-end timeline-box">
          {{ centuries()[century] }} books
        </div>
        <hr />
      </li>
      }
    </ul>
  `,
  styles: ``,
})
export class BookTimelineComponent {
  books = input.required<BookList>();

  centuries = computed(() => {
    const books = this.books();
    const centuryCount: Record<string, number> = {};

    books?.forEach((book) => {
      const century = Math.floor(book.year / 100) + 1;
      const centuryLabel = century;

      if (!centuryCount[centuryLabel]) {
        centuryCount[centuryLabel] = 1;
      } else {
        centuryCount[centuryLabel]++;
      }
    });

    return centuryCount;
  });

  centuryList = computed(() =>
    Object.keys(this.centuries())
      .sort((cenA, cenB) => (parseInt(cenA) > parseInt(cenB) ? 1 : -1))
      .map((key) => key.toString())
  );
}
