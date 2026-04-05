import { Component, OnInit } from '@angular/core';

import { Video } from './video.model';
import { VideoService } from './video.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.css'
})
export class VideosComponent implements OnInit {
  selectedVideo!: Video;

  constructor(private videoService: VideoService) {}

  ngOnInit() {
    this.videoService.videoSelectedEvent
      .subscribe(
        (video: Video) => {
          this.selectedVideo = video;
        }
      );
  }
}
