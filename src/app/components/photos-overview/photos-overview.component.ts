import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Photo } from 'src/app/models/photo';
import { PhotosService } from 'src/app/services/photos.service';
import { DEFAULT_PAGE } from '../../services/photo-utils';
@Component({
  selector: 'photos-overview',
  templateUrl: './photos-overview.component.html',
  styleUrls: ['./photos-overview.component.scss']
})
export class PhotosOverviewComponent implements OnInit {
  private currentPhotosPage: number =  DEFAULT_PAGE;
  contentLoaded: boolean = false;
  isLoading: boolean = false;
  photos: Photo[] = [];

  constructor(private photosService: PhotosService, private router: Router) { }
  
  ngOnInit(): void {
    console.log('ngOnInit()');
    this.photosService.setCurrentSelectedView('photos');
    this.getPhotos();
  }

  getPhotos() {
    this.isLoading = true;
    setTimeout(() => {
      this.photosService.getPhotos(this.currentPhotosPage).subscribe(newPhotos => {
        this.isLoading = false;
        this.photos = [...this.photos, ...newPhotos];
        
        if (this.currentPhotosPage === 1) {
          this.contentLoaded = true;
        }
        
        this.currentPhotosPage += 1;
      });
      // emulate delay. 300ms
    }, 300);
    
  }

  addToFavorites(photo: Photo) {
    this.photosService.addToFavorites(photo);
    alert('Photo has been added to favorites!');
  }

  onScroll() {
    if (window.innerHeight + window.scrollY === document.body.scrollHeight) {
      if (this.isLoading) {
        return;
      }
      this.getPhotos();
    }
  }

}
