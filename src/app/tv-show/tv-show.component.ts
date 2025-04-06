import { Component, OnInit } from '@angular/core';
import { TvService } from '../services/tv.service';
import { TVshow } from '../tv';
import { TvShowCardComponent } from '../tv-show-card/tv-show-card.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tv-show',
  standalone: true, // Add this
  imports: [TvShowCardComponent, HttpClientModule, CommonModule], // Add these
  templateUrl: './tv-show.component.html',
  styleUrls: ['./tv-show.component.css']
})
export class TvShowComponent implements OnInit {
  tvshows: TVshow[] = [];
  isLoading = false;
  errorMessage = '';
  currentPage = 1;

  constructor(private tvService: TvService) {}

  ngOnInit(): void {
    this.loadTvShows();
  }

  loadTvShows(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.tvService.getPopularTvShows(1).subscribe({
      next: (response) => {
        this.tvshows = response.results;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load TV shows. Please try again later.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  loadMore(): void {
    this.currentPage++;
    this.isLoading = true;
    
    this.tvService.getPopularTvShows(this.currentPage).subscribe({
      next: (response) => {
        this.tvshows = [...this.tvshows, ...response.results];
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load more TV shows.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

}