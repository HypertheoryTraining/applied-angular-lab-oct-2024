import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BookFilterStore } from '../store/filter.store';
import { toSignal } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, debounceTime, tap } from 'rxjs';
import { BookLimitStore } from '../store/limit.store';
import { BookPaginatorComponent } from './paginator.component';

@Component({
  selector: 'app-book-filter',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    BookPaginatorComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex justify-between">
      <mat-form-field class="w-1/2">
        <mat-label>Search</mat-label>
        <input matInput [formControl]="filterControl" />
        <mat-icon matSuffix>search</mat-icon>
      </mat-form-field>
      <app-book-paginator />
    </div>
  `,
})
export class BookFilterComponent {
  filterStore = inject(BookFilterStore);
  limitStore = inject(BookLimitStore);
  filterControl = new FormControl(this.filterStore.filter() ?? '', {
    nonNullable: true,
  });

  filter = toSignal(
    this.filterControl.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(500),
      tap((input) => this.filterStore.setFilter(input ?? ''))
    )
  );
}
