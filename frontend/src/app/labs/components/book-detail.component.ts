import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  ViewChild,
} from '@angular/core';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<dialog open id="my_modal_3" #modal class="modal">
    <div class="modal-box w-full h-full">
      <form method="dialog">
        <button
          (click)="close()"
          class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
      </form>
      <h3 class="text-lg font-bold">Book Detail</h3>
      <p class="py-4">See all the details TODO</p>
    </div>
  </dialog>`,
})
export class BookDetailComponent {
  id = input();
  @ViewChild('modal') modal!: ElementRef;
  location = inject(Location);

  close() {
    this.modal.nativeElement.close();
    this.location.back();
  }
}
