import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HouseListStore } from '../../stores/house-list.store';
import { HouseRatingStore } from './house-rating.store';
import { HouseListEntity } from './types';
import { debounceTime, filter, first } from 'rxjs';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-house-edit',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
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
      <h3 class="text-lg font-bold mb-6">Renovate this House</h3>
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
              <div class="stat-value text-primary">
                {{ store.totalScore() }}
              </div>
            </div>
          </div>
          <div>
            <button type="submit" class="btn btn-primary">
              Renovate This Old House
            </button>
          </div>
        </form>
      </div>
    </div>
  </dialog>`,
  styles: ``,
})
export class HouseRenovateComponent implements OnInit {
  id = input.required<string>();
  @ViewChild('modal') modal!: ElementRef;

  store = inject(HouseRatingStore);
  listStore = inject(HouseListStore);
  location = inject(Location);

  computedHouse = computed(() => {
    const entities = this.listStore.entities();
    console.log('getting house with id');
    const h: HouseListEntity = entities.find((e) => e.id === this.id()) ?? {
      id: '0',
      address: '',
      qualityRating: 0,
      quantityRating: 0,
      hasAmbiance: false,
      hasFullSizeCandy: false,
    };
    this.form.controls.address.setValue(h.address);
    return h;
  });

  form = new FormGroup({
    address: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

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

    toObservable(this.listStore.isPending)
      .pipe(first((isPending: boolean) => !isPending))
      .subscribe(() => {
        this.store.set('address', this.computedHouse().address);
        this.store.set('qualityRating', this.computedHouse().qualityRating);
        this.store.set('quantityRating', this.computedHouse().quantityRating);
        if (this.store.hasAmbiance() !== this.computedHouse().hasAmbiance) {
          this.store.toggle('hasAmbiance');
        }
        if (
          this.store.hasFullSizeCandy() !==
          this.computedHouse().hasFullSizeCandy
        ) {
          this.store.toggle('hasFullSizeCandy');
        }
      });
  }

  edit() {
    if (this.form.valid) {
      this.store.renovate();
      this.modal.nativeElement.close();
      this.location.back();
    }
  }

  ngOnInit() {
    this.store.set('id', this.id());
    console.log('Renovating house with id:', this.id());
  }

  close() {
    this.modal.nativeElement.close();
    this.location.back();
  }
}
