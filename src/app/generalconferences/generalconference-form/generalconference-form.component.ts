import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Generalconference } from '../generalconference.model';
import { NgForm } from '@angular/forms';
import { GeneralconferenceService } from '../generalconference.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { provideProtractorTestingSupport } from '@angular/platform-browser';

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
  @Input() showKeywordsAndNotesBlockOnly: boolean = false;
  @Output() keywordsAndNotesSaved = new EventEmitter<Generalconference>();

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

  getYoutubeThumbnailImageUrl(youtubeLink: string | undefined) {
    if (!youtubeLink) return '';

    // handles these format:
    // https://www.youtube.com/watch?v=[youtubeId]
    // https://youtu.be/[youtubeId]
    // https://www.youtube.com/embed/[youtubeId]
    // (?:...) - non-capturing group because I don't use match[0]
    // 
    const match = youtubeLink.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );

    // match[0] returns the full match: #...
    // match[1] returns the first capture group, but there is none in this case
    return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : '';
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const value = form.value; // gets values from form's fields
    let previousParagraphLink = this.getPreviousParagraphLink(value.paragraphToJumpToLink, value.generalconferenceReadLink);

    let speakerImageLink = value?.generalconferenceSpeakerImageLink;
    if (!speakerImageLink && value?.generalconferenceYoutubeLink) {
      speakerImageLink = this.getYoutubeThumbnailImageUrl(value.generalconferenceYoutubeLink);
    }

    let newGeneralconference = new Generalconference(
      '', // id
      value.generalconferenceSpeaker || this.originalGeneralconference?.generalconferenceSpeaker,
      previousParagraphLink || this.getPreviousParagraphLink(this.originalGeneralconference?.paragraphToJumpToLink, this.originalGeneralconference?.generalconferenceReadLink),
      value.paragraphToJumpToLink || this.originalGeneralconference?.paragraphToJumpToLink,
      this.generalconference.keywords,
      value?.generalconferenceYoutubeLink || this.originalGeneralconference?.generalconferenceYoutubeLink,
      value?.youtubeStartTimeInSec|| this.originalGeneralconference?.youtubeStartTimeInSec,
      value?.youtubeEndTimeInSec || this.originalGeneralconference?.youtubeEndTimeInSec,
      value?.generalconferenceMonthYear || this.originalGeneralconference?.generalconferenceMonthYear,
      value?.generalconferenceTalkTitle || this.originalGeneralconference?.generalconferenceTalkTitle,
      speakerImageLink || this.originalGeneralconference?.generalconferenceSpeakerImageLink,
      this.generalconference.questionsOrTopics,
      this.generalconference.notes
    );

    if (this.editMode === true) {
      this.generalconferenceService.updateGeneralconference(this.originalGeneralconference, newGeneralconference);
    } else {
      this.generalconferenceService.addGeneralconference(newGeneralconference);
    }

    if (this.showKeywordsAndNotesBlockOnly) {
      this.keywordsAndNotesSaved.emit(newGeneralconference);
    } else {
      this.router.navigate(['/general-conferences']);
    }
  }

  onCancel() {
    if (this.showKeywordsAndNotesBlockOnly) {
      this.keywordsAndNotesSaved.emit();
    } else {
      this.router.navigate(['/general-conferences']);
    }
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
