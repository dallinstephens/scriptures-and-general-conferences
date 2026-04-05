import { Component, OnInit } from '@angular/core';
import { Generalconference } from '../generalconference.model';
import { NgForm } from '@angular/forms';
import { GeneralconferenceService } from '../generalconference.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-generalconference-form',
  templateUrl: './generalconference-form.component.html',
  styleUrl: './generalconference-form.component.css'
})
export class GeneralconferenceFormComponent implements OnInit {
  originalGeneralconference!: Generalconference;
  generalconference!: Generalconference;
  groupGeneralconferences: Generalconference[] = [];
  editMode: boolean = false;
  id!: string;

  constructor(
    private generalconferenceService: GeneralconferenceService,
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
            // initialize the generalconference object
            this.generalconference = {
              id: '',
              generalconferenceSpeaker: '',
              generalconferenceReadLink: '',
              paragraphToJumpToLink: '',
              keywords: [''],
              generalconferenceYoutubeLink: '',
              generalconferenceMonthYear: '',
              youtubeStartTimeInSec: '',
              youtubeEndTimeInSec: '',
              generalconferenceTalkTitle: '',
              generalconferenceSpeakerImageLink: '',
              questionsOrTopics: [''],
              notes: [''],
              attribution: 'Source: ChurchOfJesusChrist.org'        
            };
            return;
          }
          this.originalGeneralconference = this.generalconferenceService.getGeneralconference(this.id)!;
          if (this.originalGeneralconference === undefined || this.originalGeneralconference === null) {
            return;
          }
          this.editMode = true;
          this.generalconference = JSON.parse(JSON.stringify(this.originalGeneralconference));
        }
      );
  }

  getPreviousParagraphLink(paragraphToJumpToLink: string, generalconferenceReadLink: string): string {
    if (!paragraphToJumpToLink || !generalconferenceReadLink) return generalconferenceReadLink;

    // Extract the fragment (#...) from paragraphToJumpToLink
    const match = paragraphToJumpToLink.match(/#.*$/);
    if (!match) return generalconferenceReadLink;

    // match[0] returns the full match: #...
    // match[1] returns the first capture group, but there is none in this case
    const fragment = match[0];

    return generalconferenceReadLink.replace(/#.*$/, fragment);
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const value = form.value; // gets values from form's fields
    let previousParagraphLink = this.getPreviousParagraphLink(value.paragraphToJumpToLink, value.generalconferenceReadLink);

    let newGeneralconference = new Generalconference(
      '', // id
      value.generalconferenceSpeaker,
      previousParagraphLink,
      value.paragraphToJumpToLink,
      this.generalconference.keywords,
      value?.generalconferenceYoutubeLink,
      value?.youtubeStartTimeInSec,
      value?.youtubeEndTimeInSec,
      value?.generalconferenceMonthYear,
      value?.generalconferenceTalkTitle,
      value?.generalconferenceSpeakerImageLink,
      this.generalconference.questionsOrTopics,
      this.generalconference.notes
    );

    if (this.editMode === true) {
      this.generalconferenceService.updateGeneralconference(this.originalGeneralconference, newGeneralconference);
    } else {
      this.generalconferenceService.addGeneralconference(newGeneralconference);
    }

    this.router.navigate(['/general-conference']);
  }

  onCancel() {
    this.router.navigate(['/general-conference']);
  }

  addKeywords() {
    this.generalconference.keywords.push('');
  }

  removeKeywords(i: number) {
    this.generalconference.keywords.splice(i, 1);
  }

  addBlock() {
    this.generalconference.questionsOrTopics?.push('');
    this.generalconference.notes?.push('');
  }

  removeBlock(i: number) {
    this.generalconference.questionsOrTopics?.splice(i, 1);
    this.generalconference.notes?.splice(i, 1);
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }
}
