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
  @Output() keywordsAndNotesSaved = new EventEmitter<Video>();  

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

    let videoImageLink = value?.videoImageLink;
    if (!videoImageLink && value?.videoYoutubeLink) {
      videoImageLink = this.getYoutubeThumbnailImageUrl(value.videoYoutubeLink);
    }    

    let newVideo = new Video(
      '', // id
      value.videoTitle || this.originalVideo?.videoTitle,
      this.video.keywords,
      value?.videoYoutubeLink || this.originalVideo?.videoYoutubeLink,
      value?.youtubeStartTimeInSec || this.originalVideo?.youtubeStartTimeInSec,
      value?.youtubeEndTimeInSec || this.originalVideo?.youtubeEndTimeInSec,
      value?.videoSpeaker || this.originalVideo?.videoSpeaker,
      videoImageLink || this.originalVideo?.videoImageLink,
      this.video.questionsOrTopics,
      this.video.notes
    );

    if (this.editMode === true) {
      this.videoService.updateVideo(this.originalVideo, newVideo);
    } else {
      this.videoService.addVideo(newVideo);
    }

    if (this.showKeywordsAndNotesBlockOnly) {
      this.keywordsAndNotesSaved.emit(newVideo);
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
