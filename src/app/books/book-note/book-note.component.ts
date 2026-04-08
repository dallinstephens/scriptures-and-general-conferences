import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Book } from '../book.model';
import { BookService } from '../book.service';
import { WindowRefService } from '../../window-ref.service';

@Component({
  selector: 'app-book-note',
  templateUrl: './book-note.component.html',
  styleUrl: './book-note.component.css'
})
export class BookNoteComponent implements OnInit {
  // The value of the selectedBook variable now needs to be passed down to the 
  // BookNoteComponent as an input.
  book!: Book;
  id!: string;
  safeUrl!: SafeResourceUrl;
  nativeWindow: any;
  editMode: boolean = false;

  constructor(private bookService: BookService,
              private router: Router,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer,
              private windowRefService: WindowRefService
  ) {}

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.book = this.bookService.getBook(this.id)!;
          if (this.book) {
            this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.book.bookLink);
          }
        }
      );     
      this.nativeWindow = this.windowRefService.getNativeWindow();
  }

  onView() {
    if (this.book.bookLink) {
      this.nativeWindow.open(this.book.bookLink);
    }
  }
  
  toggleEdit() {
    this.editMode = !this.editMode;
    if (this.editMode) {
      // documentElement targets the html tag
      document.documentElement.classList.add('show-scrollbar');
      document.documentElement.classList.remove('hide-scrollbar');
    } else {
      document.documentElement.classList.add('hide-scrollbar');
      document.documentElement.classList.remove('show-scrollbar');      
    }
  }  

  saveKeywordsAndNotes(bookUpdated: Book) {
    this.book = bookUpdated;
    this.toggleEdit();
  }

  onDelete() {
    this.bookService.deleteBook(this.book);
    this.router.navigateByUrl('/books');
  }
}
