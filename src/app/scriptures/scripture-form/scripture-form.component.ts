import { Component, OnInit } from '@angular/core';
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
  originalScripture: Scripture;
  scripture: Scripture;
  groupScriptures: Scripture[] = [];
  editMode: boolean = false;
  id: string;

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
          this.originalScripture = this.scriptureService.getScripture(this.id);
          if (this.originalScripture === undefined || this.originalScripture === null) {
            return;
          }
          this.editMode = true;
          this.scripture = JSON.parse(JSON.stringify(this.originalScripture));
        }
      );
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const value = form.value; // gets values from form's fields
    let newScripture = new Scripture(
      '', // id
      value.scripturePassage,
      value.scriptureLink,
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

    this.router.navigate(['/scriptures']);
  }

  onCancel() {
    this.router.navigate(['/scriptures']);
  }

  addKeywords() {
    this.scripture.keywords.push('');
  }

  removeKeywords(i: number) {
    this.scripture.keywords.splice(i, 1);
  }

  addBlock() {
    this.scripture.questionsOrTopics.push('');
    this.scripture.notes.push('');
  }

  removeBlock(i: number) {
    this.scripture.questionsOrTopics.splice(i, 1);
    this.scripture.notes.splice(i, 1);
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }
}
