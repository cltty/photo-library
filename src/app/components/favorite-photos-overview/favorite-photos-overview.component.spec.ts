import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritePhotosOverviewComponent } from './favorite-photos-overview.component';

describe('FavoritePhotosOverviewComponent', () => {
  let component: FavoritePhotosOverviewComponent;
  let fixture: ComponentFixture<FavoritePhotosOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoritePhotosOverviewComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritePhotosOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
