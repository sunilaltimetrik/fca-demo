import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NavigationEnd } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) {
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

}
