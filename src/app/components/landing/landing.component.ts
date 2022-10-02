import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onPhotosClick() {
    this.router.navigate(['/']);
  }

  onFavoritesClick() {
    this.router.navigate(['/favorites']);
  }
}
