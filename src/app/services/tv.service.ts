import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TVshow } from '../tv';


@Injectable({
  providedIn: 'root'
})
export class TvService {
  private apiKey = 'b60cc5a6ed1a2d116d141f342d9fb586'; 
  private baseUrl = 'https://api.themoviedb.org/3';
  private langcode ='en'
  constructor(private http: HttpClient) { }

  getPopularTvShows(page: number = 1): Observable<any> {
    return this.http.get(`${this.baseUrl}/discover/tv?api_key=${this.apiKey}&sort_by=popularity.desc&include_adult=false&with_original_language=en&certification_country=US&certification.lte=TV-14&page=${page}`);

  }

  getTvShowDetails(id: number): Observable<TVshow> {
    return this.http.get<TVshow>(`${this.baseUrl}/tv/${id}?api_key=${this.apiKey}
`);
  }
  // In your tv.service.ts
getTvShowRecommendations(id: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/tv/${id}/recommendations?api_key=${this.apiKey}&sort_by=popularity.desc&include_adult=false&with_original_language=en&certification_country=US&certification.lte=TV-14`);
}
}