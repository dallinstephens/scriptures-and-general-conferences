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
            return;
          }
          this.originalScripture = this.scriptureService.getScripture(this.id);
          if (this.originalScripture === undefined || this.originalScripture === null) {
            return;
          }
          this.editMode = true;
          this.scripture = JSON.parse(JSON.stringify(this.originalScripture));
          // if (this.scripture.keywords) {
          //   this.groupScriptures = JSON.parse(JSON.stringify(this.scripture.keywords));
          // }
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
      value.keywords,
      value?.scriptureImageLink,
      value?.questionOrTopic,
      value?.note
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
}
