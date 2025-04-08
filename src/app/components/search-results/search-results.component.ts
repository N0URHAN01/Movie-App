import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  searchQuery: string = '';
  searchResults: any[] = [];
  wishlistMovies = new Set<number>();

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['query'];
      if (this.searchQuery) {
        this.searchService.searchMovies(this.searchQuery).subscribe(data => {
          this.searchResults = data.results;
        });
      }
    });

    this.wishlistService.wishlist$.subscribe(wishlist => {
      this.wishlistMovies = new Set(wishlist.map(movie => movie.id));
    });
  }

  toggleWishlist(movie: any): void {
    if (this.wishlistMovies.has(movie.id)) {
      this.wishlistService.removeFromWishlist(movie.id);
    } else {
      this.wishlistService.addToWishlist(movie);
    }
  }
}
