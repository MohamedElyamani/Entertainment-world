import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { IMediaList } from '../../interfaces/IMediaList';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { environment } from '../../environment';
import { CommonModule } from '@angular/common';
import { NgClass } from '@angular/common';
import { DetailsService } from '../../services/details.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  standalone: true,
  imports: [CommonModule, NgClass]
})
export class SearchComponent implements OnInit {
  results: IMediaList[] = [];
  query: string = '';
  imgPath: string = environment.imgPath;
  private destroy$ = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private searchService: SearchService,
    private detail: DetailsService,
    private route: Router,
    
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.query = params['query'];
      this.search(this.query);
    });
  }

  search(query: string): void {
    this.searchService.search(query).subscribe({
      next: (res) => {
        this.results = res.results || [];
      },
      error: (err) => {
        console.error('Error searching:', err);
      }
    });
  }

  goToDetails(id: number): void {
    const item = this.results.find(w => w.id === id);
    if (item) {
      this.detail.getDetails(id, item.media_type)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => this.route.navigate([`details/${item.media_type}/${id}`]),
        error: err => console.error('Error fetching details:', err)
      });
    }
  }

  isFavorite(item: any): boolean {
    const watchList = JSON.parse(localStorage.getItem('watchList') || '[]');
    return watchList.some((w: any) => w.id === item.id);
  }

  addToWatchList(item: IMediaList): void {
    const watchList = JSON.parse(localStorage.getItem('watchList') || '[]');
    const existingItem = watchList.find((w: IMediaList) => w.id === item.id);
    
    if (!existingItem) {
      const newItem = { ...item, mediaType: item.media_type || 'movie' };
      watchList.push(newItem);
      localStorage.setItem('watchList', JSON.stringify(watchList));
    }
  }
}
