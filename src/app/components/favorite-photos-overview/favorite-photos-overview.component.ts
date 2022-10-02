import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Photo } from 'src/app/models/photo';
import { PhotosService } from 'src/app/services/photos.service';

@Component({
  selector: 'favorite-photos-overview',
  templateUrl: './favorite-photos-overview.component.html',
  styleUrls: ['./favorite-photos-overview.component.scss'],
})
export class FavoritePhotosOverviewComponent implements OnInit {
  favoritePhotos: Photo[] = [];
  contentLoaded: boolean = false;

  constructor(private photosService: PhotosService, private router: Router) {}

  ngOnInit(): void {
    this.photosService.setCurrentSelectedView('favorites');
    this.getFavoritesPhotos();
  }

  private getFavoritesPhotos(): void {
    setTimeout(() => {
      this.favoritePhotos =
      this.photosService.getFavoritesFromLocalStorage() ?? [];
      this.contentLoaded = true;
      // emulate delay. 300ms
    }, 300);
  }

  navigateToSpecificPhoto(photo: any) {
    this.router.navigate([`/photos/${photo.id}`]);
  }
}
