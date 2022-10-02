import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Photo } from 'src/app/models/photo';

import { PhotosListComponent } from './photos-list.component';

describe('PhotosListComponent', () => {
  const mockPhoto: Photo = {
    author: "Alejandro Escamilla",
    download_url: "https://picsum.photos/id/1/5616/3744",
    height: 3744,
    id: "1",
    url: "https://unsplash.com/photos/LNRyGwIJr5c",
    width: 5616
  };
  let component: PhotosListComponent;
  let fixture: ComponentFixture<PhotosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotosListComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('clickOnPhoto()', () => {
    spyOn(component.clickOnPhotoEventEmitter, 'emit');
    component.clickOnPhoto(mockPhoto);

    expect(component.clickOnPhotoEventEmitter.emit).toHaveBeenCalledWith(mockPhoto);
  });

  it('clickOnFavorite()', () => {
    spyOn(component.clickOnFavoriteEventEmitter, 'emit');
    component.clickOnFavorite(mockPhoto);

    expect(component.clickOnFavoriteEventEmitter.emit).toHaveBeenCalledWith(mockPhoto);
  });
});
