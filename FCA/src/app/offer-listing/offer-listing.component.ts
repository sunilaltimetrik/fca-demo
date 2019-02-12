import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-offer-listing',
  templateUrl: './offer-listing.component.html',
  styleUrls: ['./offer-listing.component.css']
})
export class OfferListingComponent implements OnInit {
  public tacticsDataOriginal1: any;
  public tacticsDataOriginal: any;
  public sample: any;
  public tacticsData: any;
  allTacticsData: any;
  objectList: any;
  val: any;


  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.getDataFromJson();
    // this.removeEmptyObject();
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
    // this.removeEmptyObject();
    localStorage.setItem('compareItems', JSON.stringify(_.filter(this.tacticsData, f => f.isChecked)));
    this.router.navigate(['/compaire-offer']);
  }

    //  _.mixin({ 'removeFalsies': this.removeFalsies });
   removeFalsies(obj) {
    //  debugger;
      return _.transform(obj, function (o, v, k) {
        if (v && typeof v === 'object') {
          o[k] = _.removeFalsies(v);
        } else if (v) {
          o[k] = v;
        }
      });
    }

    removeEmptyObject() {
      let i = 0;
      // debugger;
      this.http.get('../../assets/data.json', { responseType: 'json' }).subscribe(
      response => {
        this.tacticsDataOriginal1 = _.cloneDeep(response);
        _.mixin({ 'removeFalsies': this.removeFalsies });

          for ( i = 0; i < this.tacticsDataOriginal1.length; i++) {
          this.val = _.removeFalsies(this.tacticsDataOriginal1[i]);
          // console.log(this.val + "Loop");
          if  (i === 1) {
            this.objectList = _.merge({}, this.val[0], this.val[1]);
             console.log(this.objectList);
          } else {
             console.log(this.objectList);
          }
        }

        // const val1 = _.removeFalsies(this.tacticsDataOriginal1[0]);
        // const val2 = _.removeFalsies(this.tacticsDataOriginal1[1]);
        // console.log(val1, val2);
        // const offerObj =  _.merge({}, val1, val2);
        // console.log(offerObj);
      });
    }

}
