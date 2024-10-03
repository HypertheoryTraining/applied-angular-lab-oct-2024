import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { BookLimitStore } from '../store/limit.store';
@Component({
  selector: 'app-book-paginator',
  imports: [MatPaginatorModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<mat-paginator
    [length]="100"
    [pageSize]="15"
    [pageSizeOptions]="[15, 25, 50, 100]"
    aria-label="Select page"
    (page)="onPageChange($event)"
  >
  </mat-paginator>`,
})
export class BookPaginatorComponent {
    limitStore = inject(BookLimitStore);
    onPageChange(e: PageEvent){
        this.limitStore.setLimit(e.pageSize)
    }
}
