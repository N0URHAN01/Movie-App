import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { WishlistService } from '../services/wishlist.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  movie: any = null;
  recommendations: any[] = [];
  reviews: any[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.loadMovieDetails(id);
      this.loadRecommendations(id);
      this.loadReviews(id);
    });
  }

  loadMovieDetails(id: number): void {
    this.isLoading = true;
    this.movieService.getMovieDetails(id).subscribe({
      next: (data) => {
        this.movie = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load movie details.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  loadRecommendations(id: number): void {
    this.movieService.getMovieRecommendations(id).subscribe({
      next: (response) => {
        this.recommendations = response.results.slice(0, 6);
      },
      error: (err) => {
        console.error('Failed to load recommendations:', err);
      }
    });
  }

  loadReviews(id: number): void {
    this.movieService.getMovieReviews(id).subscribe({
      next: (response) => {
        this.reviews = response.results;
      },
      error: (err) => {
        console.error('Failed to load reviews:', err);
      }
    });
  }

  toggleFavorite(movie: any): void {
    if (this.isFavorite(movie.id)) {
      this.wishlistService.removeFromWishlist(movie.id);
    } else {
      this.wishlistService.addToWishlist(movie);
    }
  }

  isFavorite(movieId: number): boolean {
    return this.wishlistService.isInWishlist(movieId);
  }
}
