import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export type Book = {
  author: string;
  country: string;
  imageLink: string;
  language: string;
  link: string;
  pages: number;
  title: string;
  year: number;
  id: string;
};

@Injectable({ providedIn: 'root' })
export class BooksService {
  #client = inject(HttpClient);
  #route = 'api/books';

  get() {
    return this.#client.get<Book[]>(`${environment.urlBase}/${this.#route}`);
  }
}
