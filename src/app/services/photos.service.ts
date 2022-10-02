import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DEFAULT_PAGE, DEFAULT_PAGE_LIMIT } from './photo-utils';
import { URL_PHOTOS_LIST } from './url-utils';
import { BehaviorSubject, Observable } from 'rxjs';
import { Photo } from '../models/photo';
import * as _ from 'lodash';

const FAVORITES_OBJ_KEY: string = 'favorites';

@Injectable({
  providedIn: 'root',
})
export class PhotosService {
  private currentSelectedView$: BehaviorSubject<'photos' | 'favorites'> =
    new BehaviorSubject<'photos' | 'favorites'>('photos');

  constructor(private httpClient: HttpClient) {}

  setCurrentSelectedView(currentSelectedView: 'photos' | 'favorites'): void {
    this.currentSelectedView$.next(currentSelectedView);
  }

  getCurrentSelectedView$(): Observable<'photos' | 'favorites'> {
    return this.currentSelectedView$.asObservable();
  }

  getPhotos(
    page: number = DEFAULT_PAGE,
    limit: number = DEFAULT_PAGE_LIMIT
  ): Observable<any> {
    return this.httpClient.get(URL_PHOTOS_LIST(page, limit));
  }

  private isFavoriteAlready(photo: Photo): boolean {
    const favsFromStorage = this.getFavoritesFromLocalStorage();
    if (favsFromStorage) {
      for (let index = favsFromStorage.length - 1; index >= 0; index--) {
        if (_.isEqual(photo, favsFromStorage[index])) {
          return true;
        }
      }
    }

    return false;
  }

  addToFavorites(photo: Photo) {
    if (this.isFavoriteAlready(photo)) return;

    const favsFromStorage = this.getFavoritesFromLocalStorage();
    const favsArray: Photo[] = favsFromStorage ?? [];

    favsArray.push(photo);
    localStorage.setItem(FAVORITES_OBJ_KEY, JSON.stringify(favsArray));
  }

  getFavoritesFromLocalStorage(): Photo[] | null {
    const x = localStorage.getItem(FAVORITES_OBJ_KEY);
    return x ? JSON.parse(x) : null;
  }

  getFavoritePhotoFromLocalStorageById(photoId: string): Photo | null {
    const favsFromStorage = this.getFavoritesFromLocalStorage();

    if (favsFromStorage) {
      for (let index = favsFromStorage.length - 1; index >= 0; index--) {
        if (photoId === favsFromStorage[index].id) {
          return favsFromStorage[index];
        }
      }
    }

    return null;
  }

  removeFavoritePhotoFromLocalStorageById(photoId: string): void {
    const favsFromStorage = this.getFavoritesFromLocalStorage();

    if (favsFromStorage) {
      for (let index = favsFromStorage.length - 1; index >= 0; index--) {
        if (photoId === favsFromStorage[index].id) {
          favsFromStorage.splice(index, 1);
          localStorage.setItem(
            FAVORITES_OBJ_KEY,
            JSON.stringify(favsFromStorage)
          );
          return;
        }
      }
    }
  }
}
