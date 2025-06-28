import { Component, OnInit } from '@angular/core';
import { BannerComponent } from '../shared/components/banner/banner.component';
import { MainpageComponent } from '../shared/components/mainpage/mainpage.component';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
  imports: [BannerComponent, MainpageComponent],
  standalone: true
})
export class MovieComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
