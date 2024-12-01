export type Book = { id: string; title: string; author: string; year: number };

export type BookList = Book[];

export type BookResponse = { data: Book[] };
