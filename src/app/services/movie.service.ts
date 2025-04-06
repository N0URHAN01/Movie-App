import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = 'b60cc5a6ed1a2d116d141f342d9fb586';
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(
    private http: HttpClient,
    private languageService: LanguageService
  ) { }

  getNowPlayingMovies(): Observable<any> {
    return this.languageService.currentLanguage$.pipe(
      switchMap(language => {
        return this.http.get(`${this.baseUrl}/movie/now_playing?api_key=${this.apiKey}&language=${language}`);
      })
    );
  }

  getImageUrl(path: string): string {
    return `https://image.tmdb.org/t/p/w500${path}`;
  }
}
