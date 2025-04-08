import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LanguageService } from '../../services/language.service';
import { SearchComponent } from '../search/search.component';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterModule, 
    CommonModule,
    SearchComponent  // Added SearchComponent to imports
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  wishlistCount$: Observable<number>;
  languages = ['en', 'ar', 'fr', 'zh'];
  currentLang = 'en';

  constructor(
    private languageService: LanguageService,
    private wishlistService: WishlistService
  ) {
    this.wishlistCount$ = this.wishlistService.wishlist$.pipe(
      map(items => items.length)
    );
  }

  ngOnInit() {
    this.languageService.currentLanguage$.subscribe(
      lang => {
        this.currentLang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
      }
    );
  }

  changeLanguage(lang: string): void {
    this.languageService.setLanguage(lang);
  }

  getLanguageName(code: string): string {
    const names: { [key: string]: string } = {
      'en': 'English',
      'ar': 'العربية',
      'fr': 'Français',
      'zh': '中文'
    };
    return names[code] || code;
  }
}
