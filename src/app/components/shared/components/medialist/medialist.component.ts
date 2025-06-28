import { Component, OnDestroy, OnInit } from '@angular/core';
import { IMediaList } from '../../../../interfaces/IMediaList';
import { MedialistService } from '../../../../services/medialist.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environment';
import {MatPaginatorIntl, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-medialist',
  templateUrl: './medialist.component.html',
  styleUrls: ['./medialist.component.css'],
  standalone: true,
  imports: [MatPaginatorModule, CommonModule],
  providers: [{provide: MatPaginatorIntl}],
})
export class MedialistComponent implements OnInit, OnDestroy {
  results: IMediaList[] = [];
  imgPath : string = environment.imgPath
  type : string = '';
  category: string = '';
  isTrending: boolean = false;
  page: number = 1;
  //total_pages : number = 0
 private destroy$ = new Subject<void>()
  constructor(private medialist:MedialistService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private toastr: ToastrService
  ) { }

   ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.type = params.get('type')!;
      this.category = params.get('category') || '';
      this.isTrending = this.activatedRoute.snapshot.data['isTrending'] || false;

      if (this.isTrending) {
        this.getTrending(this.type, this.page);
        this.category = 'trending';
      } else {
        const apiCategory = this.category.replace('-', '_');
        this.getMediaList(this.type, apiCategory, this.page);
      }
    });
  }

  getMediaList(type: string, category: string, page: number){
    this.medialist.mediaList(type, category, page)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: res => this.results = res.results,
      error: err => console.error(err)
    })
    
  }
getTrending(type: string, page: number) {
    this.medialist.trending(type, page)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: res => this.results = res.results,
      error: err => console.error(err)
    });
  }
  goToDetails(id: number): void {
    const routeType = this.activatedRoute.snapshot.params['type'];
    this.route.navigate([`/details/${routeType}/${id}`]);
  }

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return `Page 1 of 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return `Page ${page + 1} of ${amountPages}`;
  }

  onPageChange(page: PageEvent){
    this.page = page.pageIndex + 1;
    this.getMediaList(this.type, this.category, this.page);
    this.getTrending(this.type, this.page);
  }

  addToWatchList(item: IMediaList): void {
    const watchList = JSON.parse(localStorage.getItem('watchList') || '[]');
    const existingItem = watchList.find((w: IMediaList) => w.id === item.id);
    
    if (!existingItem) {
      //const newItem = { ...item, media_type: this.type };
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

