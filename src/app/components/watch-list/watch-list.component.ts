import { Component, OnInit, OnDestroy } from '@angular/core';
import { IMediaList } from '../../interfaces/IMediaList';
import { environment } from '../../environment';
import { Router } from '@angular/router';
import { DetailsService } from '../../services/details.service';
import { ToastrService } from 'ngx-toastr';
import { BannerComponent } from '../shared/components/banner/banner.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.css'],
  standalone: true,
  imports: [BannerComponent]
})
export class WatchlistComponent implements OnInit, OnDestroy {
  watchList: IMediaList[] = [];
  imgPath: string = environment.imgPath;
  watchListBanner: string = './assets/watchlist.jpg';
  private destroy$ = new Subject<void>();
  constructor( private detail: DetailsService, 
    private route: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadWatchList();
  }

  loadWatchList(): void {
    const watchList = JSON.parse(localStorage.getItem('watchList') || '[]');
    this.watchList = watchList;
  }
  goToDetails(id: number): void {
    const item = this.watchList.find(w => w.id === id);
    if (item) {
      this.detail.getDetails(id, item.media_type)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => this.route.navigate([`details/${item.media_type}/${id}`]),
        error: err => console.error('Error fetching details:', err)
      })
    }
  }
  removeFromWatchList(item: IMediaList): void {
    const watchList = JSON.parse(localStorage.getItem('watchList') || '[]');
    const updatedList = watchList.filter((w: IMediaList) => w.id !== item.id);
    localStorage.setItem('watchList', JSON.stringify(updatedList));
    this.loadWatchList();
    this.toastr.success('Removed from watch list');
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
