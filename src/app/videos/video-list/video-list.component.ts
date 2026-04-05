import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Video } from '../video.model';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrl: './video-list.component.css'
})
export class VideoListComponent implements OnInit, OnDestroy {
  videos: Video[] = [];
  private subscription!: Subscription;
  term: string = '';

  constructor(private videoService: VideoService) {}

  ngOnInit() {
    this.videoService.getVideos();

    this.videoService.videoChangedEvent
      .subscribe(
        (videos: Video[]) => {
          this.videos = videos;
        }
      );
    this.subscription = this.videoService.videoListChangedEvent
      .subscribe(
        (videos: Video[]) => {
          this.videos = videos;
        }
      );
  }

  search(value: string) {
    this.term = value;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
