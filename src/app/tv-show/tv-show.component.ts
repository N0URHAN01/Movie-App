import { Component, OnInit } from '@angular/core';
import { TvService } from '../services/tv.service';
import { TVshow } from '../tv';
import { TvShowCardComponent } from '../tv-show-card/tv-show-card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tv-show',
  standalone: true,
  imports: [
    TvShowCardComponent, 
    CommonModule, 
    FormsModule,
  ],
  templateUrl: './tv-show.component.html',
  styleUrls: ['./tv-show.component.css']
})
export class TvShowComponent implements OnInit {
  tvshows: TVshow[] = [];
  isLoading = false;
  errorMessage = '';
  currentPage = 1;
  searchQuery = '';
  isSearching = false;

  constructor(private tvService: TvService) {}

  ngOnInit(): void {
    this.loadPopularTvShows();
  }

  loadPopularTvShows(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.isSearching = false;
    
    this.tvService.getPopularTvShows(this.currentPage).subscribe({
      next: (response) => {
        if (this.currentPage === 1) {
          this.tvshows = response.results;
        } else {
          this.tvshows = [...this.tvshows, ...response.results];
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load TV shows. Please try again later.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  searchTvShows(): void {
    if (!this.searchQuery.trim()) {
      this.clearSearch();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.isSearching = true;
    this.currentPage = 1;

    this.tvService.searchTvShows(this.searchQuery, this.currentPage).subscribe({
      next: (response) => {
        this.tvshows = response.results;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to search TV shows. Please try again later.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  loadMore(): void {
    this.currentPage++;
    
    if (this.isSearching) {
      this.tvService.searchTvShows(this.searchQuery, this.currentPage).subscribe({
        next: (response) => {
          this.tvshows = [...this.tvshows, ...response.results];
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = 'Failed to load more results.';
          this.isLoading = false;
          console.error(err);
        }
      });
    } else {
      this.loadPopularTvShows();
    }
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.currentPage = 1;
    this.loadPopularTvShows();
  }
}