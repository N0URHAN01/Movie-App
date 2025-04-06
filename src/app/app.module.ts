import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tv-shows', component: HomeComponent },
  { path: 'wishlist', component: HomeComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HttpClientModule,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    NavbarComponent  // Import the standalone component here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
