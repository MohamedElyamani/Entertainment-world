import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailsService } from '../../services/details.service';
import { IDetailsResponse } from '../../interfaces/IDetails';
import { environment } from '../../environment';
import { IWatch } from '../../interfaces/IWatch';
import { animate, style, transition, trigger } from '@angular/animations';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ICast } from '../../interfaces/ICast';
import { ISimilar } from '../../interfaces/ISimilar';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  animations: [
    trigger('slideToggle', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('300ms ease-out', style({ height: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ height: 0, opacity: 0 }))
      ])
    ])
  ]
})
export class DetailsComponent implements OnInit {
  details : IDetailsResponse = {} as IDetailsResponse;
  watchObj: IWatch[] = [];
  cast : ICast[] = [];
  similarMovies : ISimilar[] = [];
  noDataFound : string = "No Data Found";
  watchKey : string = environment.watchKey;
  imgPath : string = environment.imgPath;
  safeTrailerUrl: SafeResourceUrl | null = null;
  showTrailer: boolean = false;
  trailerKey: string | null = null;
  constructor(private activatedRoute: ActivatedRoute,
    private detail: DetailsService,
    private sanitizer: DomSanitizer,
    private route: Router,
    private toastr: ToastrService) { }

  

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const id = +params['id'];
      const routeType = params['routeType'];
      this.getDetails(id, routeType);
    });
  }

getDetails(id: number, routeType: string) {
  this.detail.getDetails(id, routeType).subscribe({
    next: (res) => {
      this.details = res;
      const collectionId = res.belongs_to_collection?.id;
      this.getCast(id);
      if(collectionId){
        this.getCollection(collectionId);
      }else{
        this.getSimilar(id);
      }
    },
    error: (err) => console.log(err)
  });
}
watchNow(id: number){
  const routeType = this.activatedRoute.snapshot.params['routeType'];
  this.detail.watchNow(id, routeType).subscribe({
    next: (res) => {
      this.watchObj = res.results;
      // condition to get Official Trailer because there are many trailer
      const trailer = this.watchObj.find(w =>
            w.name?.toLowerCase().includes('official trailer') && w.type === 'Trailer'
          );
      if(trailer){
        this.trailerKey = trailer.key;
        this.safeTrailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            this.watchKey + this.trailerKey
          );
        this.showTrailer = true;
      }
    },
    error: (err) => console.log(err)
    
  })
}
  toggleTrailer(id: number) {
    if (this.showTrailer) {
      // Hide trailer if it's already shown
      this.showTrailer = false;
      return;
    }
  }
  getCast(id: number){
    const routeType = this.activatedRoute.snapshot.params['routeType'];
    this.detail.cast(id, routeType).subscribe({
      next: (res) => {
        this.cast = res.cast.slice(0, 6);
      },
      error: (err) => console.log(err)
    });
  }
  getCollection(collectionId: number){
    this.detail.collection(collectionId).subscribe({
      next: (res) => {
        this.similarMovies = res.parts.slice(0, 6);
      },
      error: (err) => console.log(err)
    });
  }
  getSimilar(id: number){
    const routeType = this.activatedRoute.snapshot.params['routeType'];
    this.detail.similar(id, routeType).subscribe({
      next: (res) => {
        this.similarMovies = res.results.slice(0, 6);
      },
      error: (err) => console.log(err)
    });
  }
  goToDetails(id: number): void {
    const routeType = this.activatedRoute.snapshot.params['routeType'];
    this.showTrailer = false;
    this.trailerKey = null;
    this.safeTrailerUrl = null;
    this.route.navigate([`/details/${routeType}/${id}`]);
  }
 
  addToWatchList(): void {
    const watchList = JSON.parse(localStorage.getItem('watchList') || '[]');
    const existingItem = watchList.find((w: IDetailsResponse) => w.id === this.details.id);

    if (!existingItem) {
      const newItem = { ...this.details, media_type: this.activatedRoute.snapshot.params['routeType'] };
      watchList.push(newItem);
      localStorage.setItem('watchList', JSON.stringify(watchList));
      this.toastr.success('Added to watch list');
    }else{
      this.toastr.warning('Already in watch list');
    }
  }
}