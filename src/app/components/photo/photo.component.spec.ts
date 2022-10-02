import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Photo } from 'src/app/models/photo';

import { PhotoComponent } from './photo.component';

describe('PhotoComponent', () => {
  const mockPhoto: Photo = {
    author: "Alejandro Escamilla",
    download_url: "https://picsum.photos/id/1/5616/3744",
    height: 3744,
    id: "1",
    url: "https://unsplash.com/photos/LNRyGwIJr5c",
    width: 5616
  };
  let component: PhotoComponent;
  let fixture: ComponentFixture<PhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('clickOnPhoto()', () => {
    component.photoObj = mockPhoto;
    spyOn(component.clickOnPhotoEventEmitter, 'emit');
    component.clickOnPhoto();

    expect(component.clickOnPhotoEventEmitter.emit).toHaveBeenCalledWith(mockPhoto);
  });

  it('clickOnFavorite()', () => {
    component.photoObj = mockPhoto;
    spyOn(component.clickOnFavoriteEventEmitter, 'emit');
    component.clickOnFavorite();

    expect(component.clickOnFavoriteEventEmitter.emit).toHaveBeenCalledWith(mockPhoto);
  });
});
