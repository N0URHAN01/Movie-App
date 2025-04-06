import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [MovieService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movies: any[] = [];
  currentSlide = 0;
  private slideInterval: any;

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.loadMovies();
    this.startSlideShow();
  }

  ngOnDestroy() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  startSlideShow() {
    this.slideInterval = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % 3;
    }, 5000);
  }

  setCurrentSlide(index: number) {
    this.currentSlide = index;
    // Reset the interval when manually changing slides
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
      this.startSlideShow();
    }
  }

  loadMovies(): void {
    this.movieService.getNowPlayingMovies().subscribe({
      next: (response) => {
        this.movies = response.results;
      },
      error: (error) => {
        console.error('Error fetching movies:', error);
      }
    });
  }

  getImageUrl(path: string): string {
    return this.movieService.getImageUrl(path);
  }
}
