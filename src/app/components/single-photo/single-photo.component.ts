import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Photo } from 'src/app/models/photo';
import { PhotosService } from 'src/app/services/photos.service';

@Component({
  selector: 'app-single-photo',
  templateUrl: './single-photo.component.html',
  styleUrls: ['./single-photo.component.scss'],
})
export class SinglePhotoComponent implements OnInit {
  photo: Photo | undefined;
  contentLoaded: boolean = false;

  constructor(
    private photosService: PhotosService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.photosService.setCurrentSelectedView('favorites');
    this.getCurrentSelectedPhoto();
  }

  private getCurrentSelectedPhoto() {
    setTimeout(() => {
      this.photo =
        this.photosService.getFavoritePhotoFromLocalStorageById(
          this.route.snapshot.params['id']
        ) ?? undefined;
        this.contentLoaded = true;
        // emulate delay. 300ms
    }, 300);
  }

  onRemove() {
    if (this.photo) {
      this.photosService.removeFavoritePhotoFromLocalStorageById(this.photo.id);
      this.router.navigate(['/favorites']);
    }
  }

}
