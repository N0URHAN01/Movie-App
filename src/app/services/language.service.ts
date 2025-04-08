import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguageSubject = new BehaviorSubject<string>('en');
  currentLanguage$ = this.currentLanguageSubject.asObservable();

  setLanguage(lang: string) {
    this.currentLanguageSubject.next(lang);
  }

  getCurrentLanguage(): string {
    return this.currentLanguageSubject.value;
  }
}
