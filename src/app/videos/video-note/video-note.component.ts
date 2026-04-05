import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Video } from '../video.model';
import { VideoService } from '../video.service';
import { WindowRefService } from '../../window-ref.service';

@Component({
  selector: 'app-video-note',
  templateUrl: './video-note.component.html',
  styleUrl: './video-note.component.css'
})
export class VideoNoteComponent implements OnInit {
  // The value of the selectedVideo variable now needs to be passed down to the 
  // VideoNoteComponent as an input.
  video!: Video;
  id!: string;
  nativeWindow: any;
  safeYoutubeUrl!: SafeResourceUrl;
  autoplay: boolean = localStorage.getItem('autoplay') === 'true';
  loadFullScreen: boolean = localStorage.getItem('loadFullScreen') === 'true';
  isFullScreen: boolean = false;
  editMode: boolean = false;

  constructor(private videoService: VideoService,
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
          this.video = this.videoService.getVideo(this.id)!;
          if (this.video) {
            let youtubeEmbedUrl = this.getYoutubeEmbedUrl(
              this.video.videoYoutubeLink,
              this.video.youtubeStartTimeInSec,
              this.video.youtubeEndTimeInSec
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
      this.video.videoYoutubeLink,
      this.video.youtubeStartTimeInSec,
      this.video.youtubeEndTimeInSec
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
 
  onDelete() {
    this.videoService.deleteVideo(this.video);
    this.router.navigateByUrl('/videos');
  }
}
