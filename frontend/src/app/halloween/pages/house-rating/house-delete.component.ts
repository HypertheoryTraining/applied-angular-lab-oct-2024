import {
  Component,
  ChangeDetectionStrategy,
  inject,
  ElementRef,
  ViewChild,
  input,
} from '@angular/core';
import { Location } from '@angular/common';
import { HouseListStore } from '../../stores/house-list.store';

@Component({
  selector: 'app-house-delete',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <dialog open id="my_modal_1" #modal class="modal">
      <div class="modal-box">
        <h3 class="text-lg font-bold">Delete House</h3>
        <p class="py-4">
          Are you sure you want to delete House {{ this.id() }}?
        </p>
        <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn btn-error" (click)="deleteHouse()">
              Yes, Delete
            </button>
            <button class="btn" (click)="cancel()">Cancel</button>
          </form>
        </div>
      </div>
    </dialog>
  `,
  styles: ``,
})
export class HouseDeleteComponent {
  @ViewChild('modal') modal!: ElementRef;
  id = input.required<string>();
  location = inject(Location);
  listStore = inject(HouseListStore);

  deleteHouse() {
    this.listStore.delete(this.id());
    this.modal.nativeElement.close();
    this.location.back();
  }
  cancel() {
    this.modal.nativeElement.close();
    this.location.back();
  }
}
