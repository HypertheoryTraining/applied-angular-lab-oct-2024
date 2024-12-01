import userHandler from './user.handler';
import houseHandler from './house.handler';
import booksHandler from './books.handler';
export const handlers = [...userHandler, ...houseHandler, ...booksHandler];
