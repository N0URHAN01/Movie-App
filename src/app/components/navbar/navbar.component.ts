import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { WishlistService } from '../../services/wishlist.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  wishlistCount$: Observable<number>;
  currentLang: string = 'en';
  languages: string[] = ['en', 'es', 'fr'];

  constructor(
    private wishlistService: WishlistService,
    private languageService: LanguageService
  ) {
    this.wishlistCount$ = this.wishlistService.wishlist$.pipe(
      map(items => items.length)
    );
    this.languageService.currentLanguage$.subscribe(
      lang => this.currentLang = lang
    );
  }

  changeLanguage(lang: string) {
    this.languageService.setLanguage(lang);
  }
}
