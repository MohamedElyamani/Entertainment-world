import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { Observable } from 'rxjs';
import { IMediaListResponse } from '../interfaces/IMediaList';

@Injectable({
  providedIn: 'root'
})
export class MedialistService {
constructor(private http : HttpClient) { }

// shared for movie and tv
// popular / top-rated / now playing / upcoming
mediaList(type : string, category: string, page : number): Observable<IMediaListResponse>{
  return this.http.get<IMediaListResponse>(`${environment.baseUrl}/${type}/${category}?api_key=${environment.APIkey}&language=en-US&page=${page}`);
}

trending(type : string,page : number): Observable<IMediaListResponse>{
  return this.http.get<IMediaListResponse>(`${environment.baseUrl}/trending/${type}/week?api_key=${environment.APIkey}&language=en-US&page=${page}`);
}

// now playing and upcoming
// getMediaList(type : string, category: string): Observable<IMediaListResponse>{
//   return this.http.get<IMediaListResponse>(`https://api.themoviedb.org/3/${type}/${category}?api_key=${environment.APIkey}&language=en-US&page=1`);
// }
}
