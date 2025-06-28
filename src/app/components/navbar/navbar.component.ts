import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [RouterModule,FormsModule, CommonModule],
})
export class NavbarComponent implements OnInit {
  searchQuery : string = '';
  constructor( private router : Router) { }

  ngOnInit() {
  }

  search(searchQuery: string): void {
    if (searchQuery.trim()) {
      this.router.navigate(['/search', searchQuery]);
      this.searchQuery = '';
    }
  }
}
