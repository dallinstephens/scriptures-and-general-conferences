import { Subject } from 'rxjs';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Book } from './book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  bookListChangedEvent = new Subject<Book[]>();
  books: Book[] = [];
  bookSelectedEvent = new EventEmitter<Book>();
  bookChangedEvent = new EventEmitter<Book[]>();
  maxBookId!: number;

  constructor(private http: HttpClient) { }

  sortAndSend() {
    this.books.sort((a, b) => {
      if (a.bookName < b.bookName ) return -1;
      if (a.bookName < b.bookName ) return 1;
      return 0;
    });
    this.bookListChangedEvent.next(this.books.slice());
  }  

  getBooks(): void {
    // return this.books.slice();
    this.http
      .get<{ message: string, books: Book[] }>(
        'http://localhost:3000/books'
        // 'https://dlscms-default-rtdb.firebaseio.com/books.json'
      )
      .subscribe({ 
        next: (responses) => {
        // next: (books: Book[]) => {
          this.books = responses.books || [];
          // this.books = books || [];
          this.maxBookId = this.getMaxId();
          // Reference for javascript sort array: https://www.w3schools.com/js/js_array_sort.asp
          this.books.sort((a, b) => { 
            if (a.bookName < b.bookName) {
              return -1;
            } else if (a.bookName > b.bookName) {
              return 1;
            } else {
              return 0;
            }
          });
          let booksListClone = this.books.slice();
          this.bookListChangedEvent.next(booksListClone);          
        },
        error: (error: any) => {
          console.log(error);
        }        
      })
  }

  getBook(id: string): Book | null {
    for (let book of this.books) {
      if (book.id === id) {
        return book;
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;

    for (let book of this.books) {
      let currentId = +book.id;
      if (currentId > maxId) {
        maxId = currentId;        
      }
    } 
    
    return maxId;
  }

  addBook(book: Book) {
    if (!book) {
      return;
    }

    // make sure id of new book is empty
    book.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.http
      .post<{ message: string, book: Book }>(
        'http://localhost:3000/books', 
        book,
        { headers: headers }
      )
      .subscribe(
        (responseData) => {
          // add new books to books
          this.books.push(responseData.book);
          this.sortAndSend();
        }
      );
  }  

  updateBook(originalBook: Book, newBook: Book) {
    if (!originalBook || !newBook) {
      return;
    }
    
    const pos = this.books.findIndex(d => d.id === originalBook.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Book to the id of the old book
    newBook.id = originalBook.id;
    newBook._id = originalBook._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // update database
    this.http
      .put(
        'http://localhost:3000/books/' + originalBook.id,
        newBook,
        { headers: headers }
      )
      .subscribe(
        () => {
          this.books[pos] = newBook;
          this.sortAndSend();
        }
      );
  }

  deleteBook(book: Book) {
    if (!book) {
      return;
    }

    const pos = this.books.findIndex(d => d.id === book.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http
      .delete('http://localhost:3000/books/' + book.id)
      .subscribe(
        () => {
          this.books.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }
}
