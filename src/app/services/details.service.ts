import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { Observable } from 'rxjs';
import { IDetailsResponse } from '../interfaces/IDetails';
import { IWatchResponse } from '../interfaces/IWatch';
import { ICastResponse } from '../interfaces/ICast';
import { ISimilarResponse } from '../interfaces/ISimilar';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

constructor(private http:HttpClient) { }
getDetails(id:number , type:string) : Observable<IDetailsResponse>{
  return this.http.get<IDetailsResponse>(`${environment.baseUrl}/${type}/${id}?api_key=${environment.APIkey}&language=en-US`);
}
watchNow(id: number, type : string) : Observable<IWatchResponse>{
  return this.http.get<IWatchResponse>(`${environment.baseUrl}/${type}/${id}/videos?api_key=${environment.APIkey}&language=en-US`);
}

cast(id: number, type : string): Observable<ICastResponse>{
  return this.http.get<ICastResponse>(`${environment.baseUrl}/${type}/${id}/credits?api_key=${environment.APIkey}&language=en-US`);
}

similar(id: number, type : string) : Observable<ISimilarResponse>{
  return this.http.get<ISimilarResponse>(`${environment.baseUrl}/${type}/${id}/similar?api_key=${environment.APIkey}&language=en-US`);
}
collection(collectionId: number) : Observable<ISimilarResponse>{
  return this.http.get<ISimilarResponse>(`${environment.baseUrl}/collection/${collectionId}?api_key=${environment.APIkey}&language=en-US`);
}
}