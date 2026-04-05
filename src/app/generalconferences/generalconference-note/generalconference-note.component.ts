import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Generalconference } from '../generalconference.model';
import { GeneralconferenceService } from '../generalconference.service';
import { WindowRefService } from '../../window-ref.service';

@Component({
  selector: 'app-generalconference-note',
  templateUrl: './generalconference-note.component.html',
  styleUrl: './generalconference-note.component.css'
})
export class GeneralconferenceNoteComponent implements OnInit {
  // The value of the selectedGeneralconference variable now needs to be passed down to the 
  // GeneralconferenceNoteComponent as an input.
  generalconference!: Generalconference;
  id!: string;
  safeUrl!: SafeResourceUrl;
  nativeWindow: any;
  safeYoutubeUrl!: SafeResourceUrl;
  autoplay: boolean = localStorage.getItem('autoplay') === 'true';
  loadFullScreen: boolean = localStorage.getItem('loadFullScreen') === 'true';
  isFullScreen: boolean = false;

  constructor(private generalconferenceService: GeneralconferenceService,
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
          this.generalconference = this.generalconferenceService.getGeneralconference(this.id)!;
          if (this.generalconference) {
            this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.generalconference.generalconferenceReadLink);
            let youtubeEmbedUrl = this.getYoutubeEmbedUrl(
              this.generalconference.generalconferenceYoutubeLink,
              this.generalconference.youtubeStartTimeInSec,
              this.generalconference.youtubeEndTimeInSec
            );
            this.safeYoutubeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(youtubeEmbedUrl);
          }
        }
      );   
      this.nativeWindow = this.windowRefService.getNativeWindow();
      this.isFullScreen = this.loadFullScreen;
  }

  getYoutubeEmbedUrl(url: string | undefined, startTime?: string, endTime?: string): string {
    if (!url) return '';

    // handles these format:
    // https://www.youtube.com/watch?v=[youtubeId]
    // https://youtu.be/[youtubeId]
    // https://www.youtube.com/embed/[youtubeId]
    // (?:...) - non-capturing group because I don't use match[0]
    // 
    const match = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );

    if (!match) return '';

    let embedUrl = `https://www.youtube.com/embed/${match[1]}`;

    const params = [];
    if (startTime) params.push(`start=${startTime}`);
    if (endTime) params.push(`end=${endTime}`);
    if (this.autoplay) params.push('autoplay=1');
    if (params.length > 0) embedUrl += '?' + params.join('&');

    return embedUrl;
  }

  updateAutoplay() {
    localStorage.setItem('autoplay', this.autoplay.toString());
    let youtubeEmbedUrl = this.getYoutubeEmbedUrl(
      this.generalconference.generalconferenceYoutubeLink,
      this.generalconference.youtubeStartTimeInSec,
      this.generalconference.youtubeEndTimeInSec
    );
    this.safeYoutubeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(youtubeEmbedUrl);
  }

  loadFullscreen() {
    localStorage.setItem('loadFullScreen', this.loadFullScreen.toString());
    this.isFullScreen = this.loadFullScreen;
  }

  exitFullScreen() {
    this.isFullScreen = false;
  }

  onView() {
    if (this.generalconference.generalconferenceReadLink) {
      this.nativeWindow.open(this.generalconference.generalconferenceReadLink);
    }
  }  

  onDelete() {
    this.generalconferenceService.deleteGeneralconference(this.generalconference);
    this.router.navigateByUrl('/general-conference');
  }
}
