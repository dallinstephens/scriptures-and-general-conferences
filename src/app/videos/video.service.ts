import { Subject } from 'rxjs';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Video } from './video.model';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  videoListChangedEvent = new Subject<Video[]>();
  videos: Video[] = [];
  videoSelectedEvent = new EventEmitter<Video>();
  videoChangedEvent = new EventEmitter<Video[]>();
  maxVideoId!: number;

  constructor(private http: HttpClient) { }

  sortAndSend() {
    this.videos.sort((a, b) => {
      if (a.videoTitle < b.videoTitle ) return -1;
      if (a.videoTitle < b.videoTitle ) return 1;
      return 0;
    });
    this.videoListChangedEvent.next(this.videos.slice());
  }  

  getVideos(): void {
    // return this.videos.slice();
    this.http
      .get<{ message: string, videos: Video[] }>(
        'http://localhost:3000/videos'
        // 'https://dlscms-default-rtdb.firebaseio.com/videos.json'
      )
      .subscribe({ 
        next: (responses) => {
        // next: (videos: Video[]) => {
          this.videos = responses.videos || [];
          // this.videos = videos || [];
          this.maxVideoId = this.getMaxId();
          // Reference for javascript sort array: https://www.w3schools.com/js/js_array_sort.asp
          this.videos.sort((a, b) => { 
            if (a.videoTitle < b.videoTitle) {
              return -1;
            } else if (a.videoTitle > b.videoTitle) {
              return 1;
            } else {
              return 0;
            }
          });
          let videosListClone = this.videos.slice();
          this.videoListChangedEvent.next(videosListClone);          
        },
        error: (error: any) => {
          console.log(error);
        }        
      })
  }

  getVideo(id: string): Video | null {
    for (let video of this.videos) {
      if (video.id === id) {
        return video;
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;

    for (let video of this.videos) {
      let currentId = +video.id;
      if (currentId > maxId) {
        maxId = currentId;        
      }
    } 
    
    return maxId;
  }

  addVideo(video: Video) {
    if (!video) {
      return;
    }

    // make sure id of new video is empty
    video.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.http
      .post<{ message: string, video: Video }>(
        'http://localhost:3000/videos', 
        video,
        { headers: headers }
      )
      .subscribe(
        (responseData) => {
          // add new videos to videos
          this.videos.push(responseData.video);
          this.sortAndSend();
        }
      );
  }  

  updateVideo(originalVideo: Video, newVideo: Video) {
    if (!originalVideo || !newVideo) {
      return;
    }
    
    const pos = this.videos.findIndex(d => d.id === originalVideo.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Video to the id of the old video
    newVideo.id = originalVideo.id;
    newVideo._id = originalVideo._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // update database
    this.http
      .put(
        'http://localhost:3000/videos/' + originalVideo.id,
        newVideo,
        { headers: headers }
      )
      .subscribe(
        () => {
          this.videos[pos] = newVideo;
          this.sortAndSend();
        }
      );
  }

  deleteVideo(video: Video) {
    if (!video) {
      return;
    }

    const pos = this.videos.findIndex(d => d.id === video.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http
      .delete('http://localhost:3000/videos/' + video.id)
      .subscribe(
        () => {
          this.videos.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }
}
