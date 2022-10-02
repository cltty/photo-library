import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Photo } from 'src/app/models/photo';
import {
  DEFAULT_PHOTO_GRID_HEIGHT,
  DEFAULT_PHOTO_GRID_WIDTH,
  DEFAULT_PHOTO_HEIGHT,
  DEFAULT_PHOTO_WIDTH,
} from 'src/app/services/photo-utils';

@Component({
  selector: 'photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
})
export class PhotoComponent implements OnInit {
  @Input()
  photoObj: Photo | undefined;

  @Input()
  useGridSize: boolean = true;

  @Input()
  isFavorite: boolean = false;

  @Input()
  useFavoriteIcon: boolean = false;

  @Input()
  showTitle: boolean = false;

  @Output()
  clickOnPhotoEventEmitter: EventEmitter<Photo> = new EventEmitter();

  @Output()
  clickOnFavoriteEventEmitter: EventEmitter<Photo> = new EventEmitter();

  photoUrl: string | undefined;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes[photoObj].firstChange > ', changes['photoObj']);
    if (changes['photoObj'].firstChange) {
      this.photoUrl = this.buildUrlWithDesiredSizes(
        this.photoObj?.download_url,
        this.useGridSize
      );
    }
  }

  private buildUrlWithDesiredSizes(
    receivedUrl: string | undefined,
    gridSize: boolean
  ): string | undefined {
    if (receivedUrl) {
      const desiredWidth = gridSize
        ? DEFAULT_PHOTO_GRID_WIDTH
        : DEFAULT_PHOTO_WIDTH;
      const desiredHeight = gridSize
        ? DEFAULT_PHOTO_GRID_HEIGHT
        : DEFAULT_PHOTO_HEIGHT;
      const url = new URL(receivedUrl);
      const splittedPathName = url.pathname.split('/');

      return `${url.origin}/${splittedPathName[1]}/${splittedPathName[2]}/${desiredWidth}/${desiredHeight}`;
    }

    return undefined;
  }

  clickOnPhoto() {
    this.clickOnPhotoEventEmitter.emit(this.photoObj);
  }

  clickOnFavorite() {
    this.clickOnFavoriteEventEmitter.emit(this.photoObj);
  }

}
