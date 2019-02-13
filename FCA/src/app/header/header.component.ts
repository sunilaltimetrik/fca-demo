import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NavigationEnd } from "@angular/router";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient
    ) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        $("#openSidebarMenu").prop('checked', false);
      }
    });
  }

  ngOnInit() {
  }

  changed() {

  }

  resetCache() {
    localStorage.clear();
    this.router.navigate(['/dashboard']);
  }

}
