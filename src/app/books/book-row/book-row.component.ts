import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../book.model';
import { WindowRefService } from '../../window-ref.service';
import { BookService } from '../book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-row',
  templateUrl: './book-row.component.html',
  styleUrl: './book-row.component.css'
})
export class BookRowComponent implements OnInit {
  @Input() book!: Book;
  nativeWindow: any;

  constructor(
    private windowRefService: WindowRefService,
    private bookService: BookService,
    private router: Router
  ) { }

  ngOnInit(){
    this.nativeWindow = this.windowRefService.getNativeWindow();
  }

  onView() {
    if (this.book.bookLink) {
      this.nativeWindow.open(this.book.bookLink);
    }
  }

  onDelete() {
    this.bookService.deleteBook(this.book);
    this.router.navigateByUrl('/books');
  }
}
