import { Pipe, PipeTransform } from '@angular/core';
import { Book } from './book.model';

@Pipe({
  name: 'booksFilter'
})
export class BooksFilterPipe implements PipeTransform {
  transform(books: Book[], term: string): any {
    let filteredBooks: Book[] = [];

    if (term && term.length > 0) {
      filteredBooks = books.filter(
        (book: Book) => {
          return book.bookName.toLowerCase().includes(term.toLowerCase()) ||
          book.keywords.some(keyword => keyword.toLowerCase().includes(term.toLowerCase()));
        }
      );
    }

    if (filteredBooks.length < 1) {
      return books;
    }

    return filteredBooks;
  }
}
