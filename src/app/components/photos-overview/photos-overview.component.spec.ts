import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { PhotosOverviewComponent } from './photos-overview.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PhotosService } from 'src/app/services/photos.service';
import { Photo } from 'src/app/models/photo';
import { of } from 'rxjs';

describe('PhotosOverviewComponent', () => {
  const mockPhoto: Photo = {
    author: "Alejandro Escamilla",
    download_url: "https://picsum.photos/id/1/5616/3744",
    height: 3744,
    id: "1",
    url: "https://unsplash.com/photos/LNRyGwIJr5c",
    width: 5616
  }
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
  let component: PhotosOverviewComponent;
  let fixture: ComponentFixture<PhotosOverviewComponent>;
  let photosService: PhotosService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotosOverviewComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();

    photosService = TestBed.inject(PhotosService);

    fixture = TestBed.createComponent(PhotosOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getPhotos()', fakeAsync(() => {
    const initialCurrentPhotosPage = (component as any).currentPhotosPage;  
    spyOn(photosService, 'getPhotos').and.returnValue(of(mockPhotos));
    component.getPhotos();
    tick(300);

    expect(component.isLoading).toEqual(false);
    expect(component.contentLoaded).toEqual(true);
    expect((component as any).currentPhotosPage).toEqual(initialCurrentPhotosPage + 1);
  }));

  it('addToFavorites()', () => {
    spyOn(photosService, 'addToFavorites');
    component.addToFavorites(mockPhoto);

    expect(photosService.addToFavorites).toHaveBeenCalledWith(mockPhoto);
  });
});
