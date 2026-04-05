import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Scripture } from '../scripture.model';
import { NgForm } from '@angular/forms';
import { ScriptureService } from '../scripture.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-scripture-form',
  templateUrl: './scripture-form.component.html',
  styleUrl: './scripture-form.component.css'
})
export class ScriptureFormComponent implements OnInit {
  originalScripture!: Scripture;
  scripture!: Scripture;
  groupScriptures: Scripture[] = [];
  editMode: boolean = false;
  id!: string;
  @Input() showKeywordsAndNotesBlockOnly: boolean = false;
  @Output() keywordsAndNotesSaved = new EventEmitter<void>();  

  constructor(
    private scriptureService: ScriptureService,
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
            // initialize the scripture object
            this.scripture = {
              id: '',
              scripturePassage: '',
              scriptureLink: '',
              keywords: [''],
              scriptureImageLink: '',
              questionsOrTopics: [''],
              notes: [''],
              attribution: 'Source: ChurchOfJesusChrist.org'        
            };
            return;
          }
          this.originalScripture = this.scriptureService.getScripture(this.id)!;
          if (this.originalScripture === undefined || this.originalScripture === null) {
            return;
          }
          this.editMode = true;
          this.scripture = JSON.parse(JSON.stringify(this.originalScripture));
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
    let previousParagraphLink = this.getPreviousParagraphLink(value.scriptureLink);

    let newScripture = new Scripture(
      '', // id
      value.scripturePassage,
      previousParagraphLink,
      this.scripture.keywords,
      value?.scriptureImageLink,
      this.scripture.questionsOrTopics,
      this.scripture.notes
    );

    if (this.editMode === true) {
      this.scriptureService.updateScripture(this.originalScripture, newScripture);
    } else {
      this.scriptureService.addScripture(newScripture);
    }

    if (this.showKeywordsAndNotesBlockOnly) {
      this.keywordsAndNotesSaved.emit();
    } else {
      this.router.navigate(['/scriptures']);
    }
  }

  onCancel() {
    if (this.showKeywordsAndNotesBlockOnly) {
      this.keywordsAndNotesSaved.emit();
    } else {
      this.router.navigate(['/scriptures']);
    }
  }

  addKeywords() {
    this.scripture.keywords.push('');
  }

  removeKeywords(i: number) {
    this.scripture.keywords.splice(i, 1);
  }

  addBlock() {
    this.scripture.questionsOrTopics?.push('');
    this.scripture.notes?.push('');
  }

  removeBlock(i: number) {
    this.scripture.questionsOrTopics?.splice(i, 1);
    this.scripture.notes?.splice(i, 1);
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }
}
