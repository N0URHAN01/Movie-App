import { Routes } from '@angular/router';
import { TvShowDetailsComponent } from './tv-show-details/tv-show-details.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TvShowComponent } from './tv-show/tv-show.component';
import { HomeComponent } from './components/home/home.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieReviewsComponent } from './movie-reviews/movie-reviews.component';

//routing configs

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'tv-shows', component: TvShowComponent, title: "tv-shows" },
    { path: 'tv-shows/:id', component: TvShowDetailsComponent, title: "tv-shows-details" },
    {
      path: 'wishlist',
      component: WishlistComponent,
      title: 'My Wishlist'
    },
    { path: 'movie/:id', component: MovieDetailsComponent, title: 'Movie Details' },
    { path: 'movie/:id/reviews', component: MovieReviewsComponent, title: 'Movie Reviews' },
    { 
      path: 'search-results',
      loadComponent: () => import('./components/search-results/search-results.component')
        .then(m => m.SearchResultsComponent)
    },  // Added comma here
    { path: '**', component: NotFoundComponent, title: "Error 404 not found" }
];

