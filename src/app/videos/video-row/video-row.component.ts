import { Component, Input, OnInit } from '@angular/core';
import { Video } from '../video.model';
import { WindowRefService } from '../../window-ref.service';
import { VideoService } from '../video.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-row',
  templateUrl: './video-row.component.html',
  styleUrl: './video-row.component.css'
})
export class VideoRowComponent implements OnInit {
  @Input() video!: Video;
  nativeWindow: any;

  constructor(
    private windowRefService: WindowRefService,
    private videoService: VideoService,
    private router: Router
  ) { }

  ngOnInit(){
    this.nativeWindow = this.windowRefService.getNativeWindow();
  }

  onDelete() {
    this.videoService.deleteVideo(this.video);
    this.router.navigateByUrl('/videos');
  }
}
