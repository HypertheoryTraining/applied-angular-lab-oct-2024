import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HouseRatingStore } from '../../house-rating/house-rating.store';

@Component({
  selector: 'app-house-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  providers: [HouseRatingStore],
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
      <!-- reusable component -->
      <div class="flex flex-row min-h-screen justify-center ">
      <form [formGroup]="form" (ngSubmit)="edit()">
        <p class="text-3xl font-black">House Rating</p>
        <div class="form-control">
          <label for="Address" class="label">
            <span class="pr-4">Address</span>
            <input
              type="text"
              class="input input-bordered"
              formControlName="address"
            />
            @let address = this.form.controls.address; @if(address.invalid &&
            (address.dirty || address.touched)) {
            <p class="text-error">Address is required</p>
            }
          </label>
        </div>
        <div>
          <p>Quality Rating</p>
          <div class="rating rating-lg">
            @for(rating of [0,1,2,3,4]; track rating) {
            <input
              type="radio"
              (change)="store.set('qualityRating', rating)"
              [checked]="store.qualityRating() === rating"
              name="quality"
              class="mask mask-star-2 bg-orange-400"
            />
            }
            <span class="indicator-item badge badge-secondary">
              {{ store.qualityRating() + 1 }}
            </span>
          </div>
        </div>
        <p>Quantity Rating</p>
        <div class="rating rating-lg">
          @for(rating of [0,1,2,3,4]; track rating) {
          <input
            type="radio"
            (change)="store.set('quantityRating', rating)"
            [checked]="store.quantityRating() === rating"
            name="quantity"
            class="mask mask-star-2 bg-orange-400"
          />
          }
          <span class="indicator-item badge badge-secondary">
            {{ store.quantityRating() + 1 }}
          </span>
        </div>
        <div class="form-control">
          <label class="cursor-pointer label">
            <span class="label-text">Had Good Ambiance</span>
            <input
              type="checkbox"
              [checked]="store.hasAmbiance()"
              (change)="store.toggle('hasAmbiance')"
              class="checkbox
          checkbox-error"
            />
          </label>
        </div>
        <div class="form-control">
          <label class="cursor-pointer label">
            <span class="label-text">Gave Full Size Candybars</span>
            <input
              type="checkbox"
              [checked]="store.hasFullSizeCandy()"
              (change)="store.toggle('hasFullSizeCandy')"
              class="checkbox checkbox-error"
            />
          </label>
        </div>
        <div class="stats shadow">
          <div class="stat">
            <div class="stat-title">Total Score</div>
            <div class="stat-value text-primary">{{ store.totalScore() }}</div>
          </div>
        </div>
        <div >
        @if(id) {
          <button type="submit" class="btn btn-primary">Update This House Info</button>
        }@else {
            <button type="submit" class="btn btn-primary">Add This House</button>
        }
        </div>
      </form>
    </div>

    </div>
  </dialog>`,
  styles: ``,
})
export class HouseFormComponent implements OnInit {
  @Input() id = '';
  @ViewChild('modal') modal!: ElementRef;
  store = inject(HouseRatingStore);
  location = inject(Location);
  form = new FormGroup({
    address: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });
  
  ngOnInit() {
    console.log('Editing house with id:', this.id);
    this.store.loadById(this.id);
  }

  edit() {
    if (this.form.valid) {      
      this.store.addEdit(this.id);
      this.form.reset();
    }
  }
  close() {
    this.modal.nativeElement.close();
    this.location.back();
  }

  add() {
    if (this.form.valid) {
      this.store.addEdit('0');
      this.form.reset();
    }
  }
}
