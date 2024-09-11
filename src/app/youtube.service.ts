import { query } from '@angular/animations';
import { Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime, switchMap } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private apiKey: string = 'AIzaSyAOULgdgZBHQZAgGObDfqG0TTIy9ZPXT-Q';
  private searchQuery = new BehaviorSubject<string>('');

  constructor() { 
    this.searchQuery.pipe(
      debounceTime(300),//300 ms de espera
      switchMap(query => this.searchVideos(query))
    ).subscribe();
  }

  setSearchQuery(query: string){
    this.searchQuery.next(query);
  }

    async searchVideos(query: string){
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search',{
        params: {
          part:"snippet",
          q: query,
          key: this.apiKey,
          maxResults: 10
        }
      });
      return response.data.items;
    }
}
