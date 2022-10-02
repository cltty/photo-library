import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Photo } from 'src/app/models/photo';

@Component({
  selector: 'photos-list',
  templateUrl: './photos-list.component.html',
  styleUrls: ['./photos-list.component.scss']
})
export class PhotosListComponent implements OnInit {
  @Input()
  photos: Photo[] | undefined;
  
  @Input()
  useFavoriteIcon: boolean = false;
  
  @Input()
  showTitle: boolean = false;

  @Output()
  clickOnPhotoEventEmitter: EventEmitter<Photo> = new EventEmitter();

  @Output()
  clickOnFavoriteEventEmitter: EventEmitter<Photo> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  clickOnPhoto(photo: Photo) {
    this.clickOnPhotoEventEmitter.emit(photo);
  }

  clickOnFavorite(photo: Photo) {
    this.clickOnFavoriteEventEmitter.emit(photo);
  }
}
