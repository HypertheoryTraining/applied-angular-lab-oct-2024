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
import { HouseFormComponent } from "../house-list/components/house-form";

@Component({
  selector: 'app-house-rating',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, HouseFormComponent],
  providers: [HouseRatingStore],
  template: `
    @if(false) {
    <p>We are saving your new house rating!</p>
    } @else {
 <!-- To DO - Move this as a component to reuse in both add and edit -->
   <app-house-form />

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
      this.store.addEdit('0');
      this.form.reset();
    }
  }
}
