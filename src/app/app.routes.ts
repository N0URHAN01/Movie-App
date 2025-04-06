import {Routes} from '@angular/router';
import { TvShowDetailsComponent } from './tv-show-details/tv-show-details.component';

import { NotFoundComponent } from './not-found/not-found.component';
import { TvShowComponent } from './tv-show/tv-show.component';
import { HomeComponent } from './components/home/home.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

//routing configs

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'tv-shows', component: TvShowComponent, title: "tv-shows" },
    { path: 'tv-shows/:id', component: TvShowDetailsComponent, title: "tv-shows-details" },
    {
      path: 'wishlist',
      component: WishlistComponent
    },  // Added comma here
    { path: '**', component: NotFoundComponent, title: "Error 404 not found" }
];

