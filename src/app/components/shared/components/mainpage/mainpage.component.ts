import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IMediaList } from '../../../../interfaces/IMediaList';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { environment } from '../../../../environment';
import { MedialistService } from '../../../../services/medialist.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DetailsService } from '../../../../services/details.service';
import { CommonModule } from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations';
import {  ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css'],
  standalone: true,
  providers: [
    provideAnimations(), // required animations providers
  ],
  imports: [CarouselModule, RouterModule, CommonModule],
})
export class MainpageComponent implements OnInit {
  items: IMediaList[] = [];
  @Input() title : string='';
  @Input() category: string = ''; 
  private destroy$ = new Subject<void>();
  type : string = '';
  imgPath : string = environment.imgPath
  nowPlayingOptions: OwlOptions = {
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
    },
    576: {
      items: 2
    },
    768: {
      items: 3
    },
    992: {
      items: 4
    },
    1200: {
      items: 6
    }
  },
    nav: false
  }
  constructor(
    private mediaList : MedialistService,
    private activatedRoute: ActivatedRoute,
    private detail: DetailsService,
    private route: Router,
    private toastr: ToastrService
    ) { }


    ngOnInit(): void {
      this.type = this.activatedRoute.snapshot.data['type'];
      if (this.category === 'trending') {
        this.getTrending(this.type,1);
      } else {
        this.mediaListForPages(this.type, this.category, 1);
      }
    }

    mediaListForPages(type: string, category: string,page: number): void {
      this.mediaList.mediaList(type, category,page).subscribe({
        next: res => this.items = res.results,
        error: err => console.log(err)
      })
    }

    getTrending(type: string , page: number): void {
      this.mediaList.trending(type, page)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: res => this.items = res.results,
        error: err => console.log(err)
      })
    }

goToDetails(id : number) : void{
    const routeType  = this.activatedRoute.snapshot.data['type'];
    this.detail.getDetails(id, routeType)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: () => this.route.navigate([`details/${routeType}/${id}`]),
      error: (err) => console.log(err)
  })
  }

addToWatchList(item: IMediaList): void {
    const watchList = JSON.parse(localStorage.getItem('watchList') || '[]');
    const existingItem = watchList.find((w: IMediaList) => w.id === item.id);
    
    if (!existingItem) {
      const newItem = { ...item, media_type: this.type };
      watchList.push(newItem);
      localStorage.setItem('watchList', JSON.stringify(watchList));
      // Show success message
      this.toastr.success('Added to watch list');
    }
  }

  isFavorite(item: IMediaList): boolean {
    const watchList = JSON.parse(localStorage.getItem('watchList') || '[]');
    return watchList.some((w: IMediaList) => w.id === item.id);
  }

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }
}
