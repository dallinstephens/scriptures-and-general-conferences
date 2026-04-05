import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Video } from '../video.model';
import { NgForm } from '@angular/forms';
import { VideoService } from '../video.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-video-form',
  templateUrl: './video-form.component.html',
  styleUrl: './video-form.component.css'
})
export class VideoFormComponent implements OnInit {
  originalVideo!: Video;
  video!: Video;
  groupVideos: Video[] = [];
  editMode: boolean = false;
  id!: string;
  @Input() showKeywordsAndNotesBlockOnly: boolean = false;
  @Output() keywordsAndNotesSaved = new EventEmitter<void>();  

  constructor(
    private videoService: VideoService,
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
            // initialize the video object
            this.video = {
              id: '',
              videoTitle: '',
              keywords: [''],
              videoYoutubeLink: '',
              youtubeStartTimeInSec: '',
              youtubeEndTimeInSec: '',
              videoSpeaker: '',
              videoImageLink: '',
              questionsOrTopics: [''],
              notes: [''],
              attribution: 'Source: ChurchOfJesusChrist.org'        
            };
            return;
          }
          this.originalVideo = this.videoService.getVideo(this.id)!;
          if (this.originalVideo === undefined || this.originalVideo === null) {
            return;
          }
          this.editMode = true;
          this.video = JSON.parse(JSON.stringify(this.originalVideo));
        }
      );
  }

  getPreviousParagraphLink(paragraphToJumpToLink: string, videoReadLink: string): string {
    if (!paragraphToJumpToLink || !videoReadLink) return videoReadLink;

    // Extract the fragment (#...) from paragraphToJumpToLink
    const match = paragraphToJumpToLink.match(/#.*$/);
    if (!match) return videoReadLink;

    // match[0] returns the full match: #...
    // match[1] returns the first capture group, but there is none in this case
    const fragment = match[0];

    return videoReadLink.replace(/#.*$/, fragment);
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const value = form.value; // gets values from form's fields

    let newVideo = new Video(
      '', // id
      value.videoTitle,
      this.video.keywords,
      value?.videoYoutubeLink,
      value?.youtubeStartTimeInSec,
      value?.youtubeEndTimeInSec,
      value?.videoSpeaker,
      value?.videoImageLink,
      this.video.questionsOrTopics,
      this.video.notes
    );

    if (this.editMode === true) {
      this.videoService.updateVideo(this.originalVideo, newVideo);
    } else {
      this.videoService.addVideo(newVideo);
    }

    if (this.showKeywordsAndNotesBlockOnly) {
      this.keywordsAndNotesSaved.emit();
    } else {
      this.router.navigate(['/videos']);
    }
  }

  onCancel() {
    if (this.showKeywordsAndNotesBlockOnly) {
      this.keywordsAndNotesSaved.emit();
    } else {
      this.router.navigate(['/videos']);
    }
  }

  addKeywords() {
    this.video.keywords.push('');
  }

  removeKeywords(i: number) {
    this.video.keywords.splice(i, 1);
  }

  addBlock() {
    this.video.questionsOrTopics?.push('');
    this.video.notes?.push('');
  }

  removeBlock(i: number) {
    this.video.questionsOrTopics?.splice(i, 1);
    this.video.notes?.splice(i, 1);
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }
}
