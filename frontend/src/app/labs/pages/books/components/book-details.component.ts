import { Location } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  input,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { Book } from '../types';

@Component({
  selector: 'app-book-details',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <dialog open id="my_modal_3" #modal class="modal">
      <div class="modal-box w-full h-full">
        <form method="dialog">
          <button
            (click)="close()"
            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
          <pre>book</pre>
        </form>
        <h3 class="text-lg font-bold">Edit the House</h3>
        <p class="py-4">You could edit house {{ item().id }} here.</p>
      </div>
    </dialog>
  `,
  styles: ``,
})
export class BookDetailsComponent {
  item = input.required<Book>();
  @ViewChild('modal') modal!: ElementRef;
  location = inject(Location);
  close() {
    this.modal.nativeElement.close();
    this.location.back();
  }
}
