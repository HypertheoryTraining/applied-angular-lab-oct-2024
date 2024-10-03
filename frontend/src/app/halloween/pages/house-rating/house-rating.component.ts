import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HouseRatingStore } from './house-rating.store';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime, filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-house-rating',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  providers: [],
  template: `
    @if(false) {
    <p>We are saving your new house rating!</p>
    } @else {

    <div class="flex flex-row min-h-screen justify-center ">
      <form [formGroup]="form" (ngSubmit)="add()">
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
        <div>
          <button type="submit" class="btn btn-primary">Add This House</button>
        </div>
      </form>
    </div>
    }
  `,
  styles: ``,
})
export class HouseRatingComponent {
  store = inject(HouseRatingStore);

  constructor() {
    this.form.controls.address.valueChanges
      .pipe(
        debounceTime(300),
        filter(() => this.form.controls.address.valid),
        takeUntilDestroyed()
      )
      .subscribe((value) => {
        this.store.set('address', value);
      });
  }
  form = new FormGroup({
    address: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  add() {
    if (this.form.valid) {
      this.store.add();
      this.form.reset();
    }
  }
}
