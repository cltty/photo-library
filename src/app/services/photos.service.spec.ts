import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Photo } from '../models/photo';

import { PhotosService } from './photos.service';

describe('PhotosService', () => {
  // Storage Mock
  function mockLocalStorage() {
    let storage: any = {};

    return {
      setItem: function(key: any, value: any) {
        storage[key] = value || '';
      },
      getItem: function(key: any) {
        return key in storage ? storage[key] : null;
      },
      removeItem: function(key: any) {
        delete storage[key];
      },
      get length() {
        return Object.keys(storage).length;
      },
      key: function(i: any) {
        const keys = Object.keys(storage);
        return keys[i] || null;
      },
      clear: function() {
        storage = {};
      }
    };
  }

  let service: PhotosService;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  const mockPhotos: Photo[] = [
    {
      author: "Alejandro Escamilla",
      download_url: "https://picsum.photos/id/1/5616/3744",
      height: 3744,
      id: "1",
      url: "https://unsplash.com/photos/LNRyGwIJr5c",
      width: 5616
    }
  ];
  const mockPhoto: Photo = {
    author: "Alejandro Escamilla",
    download_url: "https://picsum.photos/id/1/5616/3744",
    height: 3744,
    id: "1",
    url: "https://unsplash.com/photos/LNRyGwIJr5c",
    width: 5616
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(PhotosService);
    injector = getTestBed();
    httpMock = injector.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setCurrentSelectedView()', () => {
    it('->photos', () => {
      spyOn((service as any).currentSelectedView$, 'next');
      service.setCurrentSelectedView('photos');
  
      expect((service as any).currentSelectedView$.next).toHaveBeenCalledWith('photos');
    });

    it('->favorites', () => {
      spyOn((service as any).currentSelectedView$, 'next');
      service.setCurrentSelectedView('favorites');
  
      expect((service as any).currentSelectedView$.next).toHaveBeenCalledWith('favorites');
    });
  });

  describe('getCurrentSelectedView$', () => {
    it('->photos', (done: DoneFn) => {
      service.setCurrentSelectedView('photos');
      service.getCurrentSelectedView$().subscribe(currentSelectedView => {
        expect(currentSelectedView).toBe('photos');
        done();
      });
    });

    it('->favorites', (done: DoneFn) => {
      service.setCurrentSelectedView('favorites');
      service.getCurrentSelectedView$().subscribe(currentSelectedView => {
        expect(currentSelectedView).toBe('favorites');
        done();
      });
    });
  });

  it('getPhotos', () => {
    service.getPhotos().subscribe(photos => {
      expect(photos).toEqual(mockPhotos);
    });
    const req = httpMock.expectOne('https://picsum.photos/v2/list?page=1&limit=6');
    expect(req.request.method).toBe('GET');
    req.flush(mockPhotos);
  });

  describe('addToFavorites()', () => {
    it('should setItem', () => {
      localStorage.clear();
      spyOn((service as any), 'isFavoriteAlready');
      spyOn((service as any), 'getFavoritesFromLocalStorage');
      spyOn(localStorage, 'setItem');
      service.addToFavorites(mockPhoto);
  
      expect((service as any).getFavoritesFromLocalStorage).toHaveBeenCalled();
      expect((service as any).isFavoriteAlready).toHaveBeenCalled();
      expect(localStorage.setItem).toHaveBeenCalled();
    });

    it('should not setItem', () => {
      service.addToFavorites(mockPhoto);
      spyOn(localStorage, 'setItem');
      service.addToFavorites(mockPhoto);
  
      
      expect(localStorage.setItem).not.toHaveBeenCalled();
    });
  });

});
