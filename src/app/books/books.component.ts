import { Component, OnInit } from '@angular/core';
import { Book } from './book.model';
import { BookService } from './book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit {
  selectedBook!: Book;

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookService.bookSelectedEvent
      .subscribe(
        (book: Book) => {
          this.selectedBook = book;
        }
      );
  }
}
