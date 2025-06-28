import { Component, OnInit } from '@angular/core';
import { BannerComponent } from '../shared/components/banner/banner.component';
import { MainpageComponent } from '../shared/components/mainpage/mainpage.component';


@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.css'],
  standalone: true,
  imports: [BannerComponent, MainpageComponent]
})
export class TvComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
