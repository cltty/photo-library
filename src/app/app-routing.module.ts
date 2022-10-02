import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritePhotosOverviewComponent } from './components/favorite-photos-overview/favorite-photos-overview.component';
import { PhotosOverviewComponent } from './components/photos-overview/photos-overview.component';
import { SinglePhotoComponent } from './components/single-photo/single-photo.component';

const routes: Routes = [
  {  
    path: '',
    component: PhotosOverviewComponent
  },
  {
    path: 'favorites',
    component: FavoritePhotosOverviewComponent
  },
  {
    path: 'photos/:id',
    component: SinglePhotoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
