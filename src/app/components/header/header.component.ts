import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { PhotosService } from 'src/app/services/photos.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private componentDestroyed$: Subject<void> = new Subject<void>();

  currentActive: 'photos' | 'favorites' = 'photos';

  constructor(private photosService: PhotosService, private router: Router) {}

  ngOnInit() {
    this.getCurrentSelectedView();
  }

  clickOnPhoto() {
    this.currentActive = 'photos';
    this.router.navigate(['/']);
  }

  clickOnFavorite() {
    this.currentActive = 'favorites';
    this.router.navigate(['/favorites']);
  }

  private getCurrentSelectedView() {
    this.photosService
      .getCurrentSelectedView$()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((currentSelectedView) => {
        this.currentActive = currentSelectedView;
      });
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }
}
