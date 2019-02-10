import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-offer-compaire',
  templateUrl: './offer-compaire.component.html',
  styleUrls: ['./offer-compaire.component.css']
})
export class OfferCompaireComponent implements OnInit {
  public tacticsDataOriginal: any;
  public sample: any;
  public tacticsData: any;
  allTacticsData: any;


  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.getDataFromJson();
  }

  getDataFromJson() {
    const data = localStorage.getItem('compareItems');

    if (data) {
      this.tacticsData = JSON.parse(data);
    }
  }


}
