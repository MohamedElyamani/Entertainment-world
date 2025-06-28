import { MovieComponent } from './components/movie/movie.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { Routes } from '@angular/router';
import { TvComponent } from './components/tv/tv.component';
import { DetailsComponent } from './components/details/details.component';
import { MedialistComponent } from './components/shared/components/medialist/medialist.component';
import { WatchlistComponent } from './components/watch-list/watch-list.component';
import { SearchComponent } from './components/search/search.component';


export const routes: Routes = [
    { path: '', redirectTo: 'movie', pathMatch: 'full' },
    { path: 'movie', component: MovieComponent,data: { type: 'movie' }},
    {path: 'tv', component: TvComponent , data: { type: 'tv' }},
    { path: 'watchlist', component: WatchlistComponent },
    { path: 'search/:query', component: SearchComponent },
    { path: ':type/:category', component: MedialistComponent },
    { path: 'trending/:type/week', component: MedialistComponent, data: { isTrending: true, category: 'trending' } },

    //  {path: 'trending/:type/week', component:TrendingComponent},
    
    {path: `details/:routeType/:id`, component: DetailsComponent},
    { path:'**', component: NotFoundComponent }
];
