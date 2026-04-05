import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Book } from '../book.model';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit, OnDestroy {
  books: Book[] = [];
  private subscription!: Subscription;
  term: string = '';

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookService.getBooks();

    this.bookService.bookChangedEvent
      .subscribe(
        (books: Book[]) => {
          this.books = books;
        }
      );
    this.subscription = this.bookService.bookListChangedEvent
      .subscribe(
        (books: Book[]) => {
          this.books = books;
        }
      );
  }

  search(value: string) {
    this.term = value;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
