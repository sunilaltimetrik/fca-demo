import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  allTacticsData: any;


  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.getDataFromJson();
  }

  getDataFromJson() {

    this.http.get('../../assets/data.json', { responseType: 'json' }).subscribe(
      response => {
        this.tacticsDataOriginal = _.cloneDeep(response);
        this.allTacticsData = _.cloneDeep(response);
        console.log('data :' + response);
        this.sample = JSON.stringify(response);

        const data = localStorage.getItem('selectedCars');
        if (data) {
          const carIds = JSON.parse(data);
          this.tacticsData = _.filter(this.allTacticsData, f => {
            return _.includes(carIds, f.id + '');
          });
        }
      });
  }

  compaireOffer() {
    localStorage.setItem('compareItems', JSON.stringify(_.filter(this.tacticsData, f => f.isChecked)));
    this.router.navigate(['/compaire-offer']);
  }




}
