import { Component } from '@angular/core';
import { YoutubeService } from '../youtube.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-search',
  templateUrl: './video-search.component.html',
  styleUrl: './video-search.component.css'
})
export class VideoSearchComponent {
  videos: any[] = [];
  query: string = '';

  constructor(private youtubeService: YoutubeService,private sanitizer: DomSanitizer){ }

  search(){
    this.youtubeService.searchVideos(this.query).then((videos) =>{
      this.videos = videos;
    });
  }

  getSafeUrl(videoId: string): SafeResourceUrl{
    return this.sanitizer.bypassSecurityTrustResourceUrl
    (`http://www.youtube.com/embed/${videoId}`);
  }
}
