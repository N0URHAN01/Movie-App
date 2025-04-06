import {Routes} from '@angular/router';
import { TvShowDetailsComponent } from './tv-show-details/tv-show-details.component';

import { NotFoundComponent } from './not-found/not-found.component';
import { TvShowComponent } from './tv-show/tv-show.component';

//routing configs

export const routes: Routes = [
    { path: '', redirectTo: 'tv-shows', pathMatch: "full" },
    { path: 'movies', component: TvShowComponent, title: "movies" },

    { path: 'tv-shows', component: TvShowComponent, title: "tv-shows" },
    { path: 'tv-shows/:id', component: TvShowDetailsComponent, title: "tv-shows-details" },

    { path: '**', component: NotFoundComponent, title: "Error 404 not found" }
];