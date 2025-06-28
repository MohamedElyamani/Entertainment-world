import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { Observable } from 'rxjs';
import { BannerResponse } from '../interfaces/IBanner';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

constructor(private http: HttpClient) { }

getBannerData(type:string) : Observable<BannerResponse>{
  return this.http.get<BannerResponse>(`${environment.baseUrl}/discover/${type}?api_key=${environment.APIkey}&language=en-US`);
}
}
