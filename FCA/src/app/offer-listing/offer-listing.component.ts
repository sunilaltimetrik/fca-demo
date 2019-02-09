import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-offer-listing',
  templateUrl: './offer-listing.component.html',
  styleUrls: ['./offer-listing.component.css']
})
export class OfferListingComponent implements OnInit {
  public tacticsDataOriginal: any;
  public sample: any;
  public tacticsData: any;


  constructor(
    private router: Router,
    private http: HttpClient,
    ) { }

  ngOnInit() {
  }
  getDataFromJson() {
    this.http.get('../../assets/data.json', { responseType: 'json' }).subscribe(
      response => {
        this.tacticsDataOriginal = _.cloneDeep(response);
        this.tacticsData = _.cloneDeep(response);
        console.log('data :' + response);
        this.sample = JSON.stringify(response);
      });
  }

  compaireOffer() {
     this.router.navigate(['/compaire-offer']);
  }
}
