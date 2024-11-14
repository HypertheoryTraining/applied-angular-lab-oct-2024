import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BookStore } from '../store/book.store';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { ErroComponent } from '@shared/components/error.component';
import { BookFilterComponent } from './filter.component';
import { HighlightPipe } from '@shared/pipes/highlight.pipe';
import { BookFilterStore } from '../store/filter.store';
@Component({
  selector: 'app-book-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    DecimalPipe,
    ErroComponent,
    BookFilterComponent,
    HighlightPipe
  ],
  template: ` <h1 class="text-center">Discover The Best Books</h1>
    <app-book-filter class="p-8 flex flex-col" />
    @if(store.isPending()){
    <mat-spinner></mat-spinner>
    } @else if (store.error()) {
    <app-error [error]="store.error()" />
    } @else {
    <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      @for (book of store.books(); track book.id) {
      <a [routerLink]="[book.id]">
        <mat-card appearance="outlined" class="h-full">
          <mat-card-header>
            <mat-card-title [innerHTML]="book.title | highlight : filter()">
            </mat-card-title>
          </mat-card-header>
          <mat-card-content> </mat-card-content>
          <mat-card-actions class="mt-auto">
            <mat-icon>person</mat-icon>
            <span [innerHTML]="book.author | highlight : filter()"></span>
            <mat-icon class="ml-6">auto_stories</mat-icon>
            <span class="ml-1">{{ book.pages | number }}</span>
            <button class="ml-auto" mat-button>Read More</button>
          </mat-card-actions>
        </mat-card>
      </a>
      } @empty {
      <p>No books match that filter!</p>
      }
    </div>
    }`,
})
export class BookListComponent {
  store = inject(BookStore);
  filter = inject(BookFilterStore).filter;
}
