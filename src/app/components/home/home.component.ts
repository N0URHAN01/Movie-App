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
  currentPage = 1;
  totalPages = 0;
  isLoading = false;
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
