import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { WishlistService } from '../../services/wishlist.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  providers: [MovieService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  movies: any[] = [];
  currentSlide = 0;
  currentPage = 1;
  totalPages = 0;
  isLoading = false;
  private slideInterval: any;
  private wishlistSubscription: Subscription;
  wishlistMovies = new Set<number>();

  constructor(
    private movieService: MovieService,
    private wishlistService: WishlistService,
    private cd: ChangeDetectorRef
  ) {
    // Initialize wishlist state
    this.wishlistSubscription = this.wishlistService.wishlist$.subscribe({
      next: (movies) => {
        this.wishlistMovies = new Set(movies.map(m => m.id));
        this.cd.detectChanges();
      }
    });
  }

  ngOnInit() {
    this.loadMovies();
    this.startSlideShow();
  }

  ngOnDestroy() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
    if (this.wishlistSubscription) {
      this.wishlistSubscription.unsubscribe();
    }
  }

  async toggleWishlist(movie: any) {
    try {
      if (this.isInWishlist(movie.id)) {
        await this.wishlistService.removeFromWishlist(movie.id);
      } else {
        await this.wishlistService.addToWishlist(movie);
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  }

  isInWishlist(movieId: number): boolean {
    return this.wishlistMovies.has(movieId);
  }

  startSlideShow() {
    this.slideInterval = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % 3;
    }, 5000);
  }

  setCurrentSlide(index: number) {
    this.currentSlide = index;
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
      this.startSlideShow();
    }
  }

  loadMovies(page: number = 1): void {
    this.isLoading = true;
    this.movieService.getNowPlayingMovies(page).subscribe({
      next: (response) => {
        this.movies = response.results;
        this.currentPage = response.page;
        this.totalPages = response.total_pages;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching movies:', error);
        this.isLoading = false;
      }
    });
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.loadMovies(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  getImageUrl(path: string): string {
    return this.movieService.getImageUrl(path);
  }
}
