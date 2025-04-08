import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-movie-reviews',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './movie-reviews.component.html',
  styleUrls: ['./movie-reviews.component.css']
})
export class MovieReviewsComponent implements OnInit {
  reviews: any[] = [];
  movieTitle: string = '';
  isLoading = false;
  errorMessage = '';

  constructor(private route: ActivatedRoute, private movieService: MovieService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const movieId = +params['id'];
      this.loadReviews(movieId);
    });
  }

  loadReviews(movieId: number): void {
    this.isLoading = true;
    this.movieService.getMovieDetails(movieId).subscribe({
      next: (movie) => {
        this.movieTitle = movie.title;
        this.movieService.getMovieReviews(movieId).subscribe({
          next: (response) => {
            this.reviews = response.results;
            this.isLoading = false;
          },
          error: (err) => {
            this.errorMessage = 'Failed to load reviews.';
            this.isLoading = false;
            console.error(err);
          }
        });
      },
      error: (err) => {
        this.errorMessage = 'Failed to load movie details.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }
}
