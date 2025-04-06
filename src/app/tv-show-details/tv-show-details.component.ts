
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TvService } from '../services/tv.service';
import { TVshow } from '../tv';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-tv-show-details',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './tv-show-details.component.html',
  styleUrls: ['./tv-show-details.component.css']
})
export class TvShowDetailsComponent implements OnInit {
  tvshow: TVshow | null = null;
  recommendations: any[] = [];
  isLoading = false;
  isLoadingRecs = false;
  errorMessage = '';
  errorRecsMessage = '';

  constructor(
    private route: ActivatedRoute,
    private tvService: TvService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.loadTvShowDetails(id);
      this.loadRecommendations(id);
    });
  }

  loadTvShowDetails(id: number): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.tvshow = null;

    this.tvService.getTvShowDetails(id).subscribe({
      next: (data) => {
        this.tvshow = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load TV show details. Please try again later.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  loadRecommendations(id: number): void {
    this.isLoadingRecs = true;
    this.errorRecsMessage = '';
    this.recommendations = [];

    this.tvService.getTvShowRecommendations(id).subscribe({
      next: (response) => {
        this.recommendations = response.results.slice(0, 6); // Get first 6 recommendations
        this.isLoadingRecs = false;
      },
      error: (err) => {
        this.errorRecsMessage = 'Failed to load recommendations.';
        this.isLoadingRecs = false;
        console.error(err);
      }
    });
  }

  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'https://via.placeholder.com/500x750?text=No+Poster';
  }

  handleCreatorImageError(event: Event, creator: any): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.style.display = 'none';
    // imgElement.parentElement!.querySelector('.creator-placeholder')!.style.display = 'flex';
  }
}