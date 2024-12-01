import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { parseResponse } from '@shared/type-utils';
import { Book } from './types';
import z from 'zod';
import { map } from 'rxjs';

// {
// author: 'Chinua Achebe',
// country: 'Nigeria',
// imageLink: 'images/things-fall-apart.jpg',
// language: 'English',
// link: 'https://en.wikipedia.org/wiki/Things_Fall_Apart
// ',
// pages: 209,
// title: 'Things Fall Apart',
// year: 1958,
// id: '1',
// },

const BookSchema = z.object({
  author: z.string(),
  country: z.string(),
  imageLink: z.string(),
  language: z.string(),
  link: z.string(),
  pages: z.number(),
  title: z.string(),
  year: z.number(),
  id: z.string(),
});

const BookResponseSchema = z.array(BookSchema);

@Injectable()
export class BookService {
  //books = signal<Book[]>([]);
  #client = inject(HttpClient);

  getBookList() {
    return this.#client.get<{ data: Book[] }>('/api/books').pipe(
      map((r) => r.data),
      parseResponse(BookResponseSchema)
    );
  }

  //books = computed(() => this.#books);
}
