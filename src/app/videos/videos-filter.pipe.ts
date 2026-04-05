import { Pipe, PipeTransform } from '@angular/core';
import { Video } from './video.model';


@Pipe({
  name: 'videosFilter'
})
export class VideosFilterPipe implements PipeTransform {
  transform(videos: Video[], term: string): any {
    let filteredVideos: Video[] = [];

    if (term && term.length > 0) {
      filteredVideos = videos.filter(
        (video: Video) => {
          return video.videoTitle.toLowerCase().includes(term.toLowerCase()) ||
          video.keywords.some(keyword => keyword.toLowerCase().includes(term.toLowerCase()));
        }
      );
    }

    if (filteredVideos.length < 1) {
      return videos;
    }

    return filteredVideos;
  }
}
