import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from '../book.model';
import { NgForm } from '@angular/forms';
import { BookService } from '../book.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css'
})
export class BookFormComponent implements OnInit {
  originalBook!: Book;
  book!: Book;
  groupBooks: Book[] = [];
  editMode: boolean = false;
  id!: string;
  @Input() showKeywordsAndNotesBlockOnly: boolean = false;
  @Output() keywordsAndNotesSaved = new EventEmitter<Book>();

  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          if (this.id === undefined || this.id === null) {
            this.editMode = false;
            // initialize the book object
            this.book = {
              id: '',
              bookName: '',
              bookLink: '',
              keywords: [''],
              bookImageLink: '',
              questionsOrTopics: [''],
              notes: [''],
              attribution: 'Source: ChurchOfJesusChrist.org'        
            };
            return;
          }
          this.originalBook = this.bookService.getBook(this.id)!;
          if (this.originalBook === undefined || this.originalBook === null) {
            return;
          }
          this.editMode = true;
          this.book = JSON.parse(JSON.stringify(this.originalBook));
        }
      );
  }

  getPreviousParagraphLink(link: string): string {
    if (!link) return link;

    const match = link.match(/#p(\d+)$/);
    if (!match) return link;

    // match[0] returns the full match: #p12
    // match[1] returns the first capture group: 12
    const paragraphNumber = parseInt(match[1]);

    if (paragraphNumber === 1) {
      return link.replace(/#p1$/, '#study_summary1');
    } else {
      return link.replace(/#p(\d+)$/, `#p${paragraphNumber -1}`);
    }
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const value = form.value; // gets values from form's fields
    let previousParagraphLink = this.getPreviousParagraphLink(value.bookLink);

    let newBook = new Book(
      '', // id
      value.bookName || this.originalBook?.bookName,
      previousParagraphLink || this.getPreviousParagraphLink(this.originalBook?.bookLink),
      this.book.keywords,
      value?.bookImageLink || this.originalBook?.bookImageLink,
      this.book.questionsOrTopics,
      this.book.notes
    );

    if (this.editMode === true) {
      this.bookService.updateBook(this.originalBook, newBook);
    } else {
      this.bookService.addBook(newBook);
    }

    if (this.showKeywordsAndNotesBlockOnly) {
      this.keywordsAndNotesSaved.emit(newBook);
    } else {
      this.router.navigate(['/books']);
    }
  }

  onCancel() {
    if (this.showKeywordsAndNotesBlockOnly) {
      this.keywordsAndNotesSaved.emit();
    } else {
      this.router.navigate(['/books']);
    }
  }

  addKeywords() {
    this.book.keywords.push('');
  }

  removeKeywords(i: number) {
    this.book.keywords.splice(i, 1);
  }

  addBlock() {
    this.book.questionsOrTopics?.push('');
    this.book.notes?.push('');
  }

  removeBlock(i: number) {
    this.book.questionsOrTopics?.splice(i, 1);
    this.book.notes?.splice(i, 1);
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }
}
