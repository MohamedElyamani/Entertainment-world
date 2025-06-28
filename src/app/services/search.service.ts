import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { Observable } from 'rxjs';
import { IMediaList, IMediaListResponse } from '../interfaces/IMediaList';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

constructor(private http: HttpClient) { }

search(query: string): Observable<IMediaListResponse> {
  return this.http.get<IMediaListResponse>(`${environment.baseUrl}/search/multi?api_key=${environment.APIkey}&language=en-US&query=${query}`);
}
}
