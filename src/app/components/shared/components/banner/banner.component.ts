import { IBanner } from './../../../../interfaces/IBanner';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { BannerService } from '../../../../services/banner.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DetailsService } from '../../../../services/details.service';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  standalone: true,
imports: [CarouselModule, CommonModule , RouterModule]
})
export class BannerComponent implements OnInit, OnDestroy{
  @Input() bannerImage: string = '';
  private destroy$ = new Subject<void>();
  bannerImages: IBanner[] = [];
  bannerOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: false,
  pullDrag: false,
  autoplay: true,
  autoplaySpeed: 1000,
  autoplayTimeout: 3000,
  dots: false,
  navSpeed: 2000,
  responsive: {
    0: {
      items: 1
    }
  },
  nav: false
}
  constructor(private banner:BannerService,
              private activatedRoute: ActivatedRoute,
              private detail: DetailsService,
              private route: Router
  ) { }

  ngOnInit() {
    this.getBannerData();
  }
  
getBannerData() : void{
  const routeType  = this.activatedRoute.snapshot.data['type'];
  this.banner.getBannerData(routeType )
  .pipe(takeUntil(this.destroy$))
  .subscribe({
    next: res => this.bannerImages = res.results.slice(0, 7),
    error: err => console.log(err)
  })
}

goToDetails(id : number) : void{
  const routeType  = this.activatedRoute.snapshot.data['type'];
  this.detail.getDetails(id, routeType)
  .pipe(takeUntil(this.destroy$))
  .subscribe({
    next: res => this.route.navigate([`details/${routeType}/${id}`]),
    error: err => console.log(err)
  })
}

ngOnDestroy(): void {
  this.destroy$.next();
  this.destroy$.complete();
}
}