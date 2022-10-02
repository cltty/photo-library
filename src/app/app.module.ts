import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { HeaderComponent } from './components/header/header.component';
import { PhotosOverviewComponent } from './components/photos-overview/photos-overview.component';
import { FavoritePhotosOverviewComponent } from './components/favorite-photos-overview/favorite-photos-overview.component';
import { MaterialModule } from './modules/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { PhotoComponent } from './components/photo/photo.component';
import { SinglePhotoComponent } from './components/single-photo/single-photo.component';
import { PhotosListComponent } from './components/photos-list/photos-list.component';
import { ActivatedRouteSnapshot } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HeaderComponent,
    PhotosOverviewComponent,
    FavoritePhotosOverviewComponent,
    PhotoComponent,
    SinglePhotoComponent,
    PhotosListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
