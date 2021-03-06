import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { AfterViewInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-tactic-dashboard',
  templateUrl: './tactic-dashboard.component.html',
  styleUrls: ['./tactic-dashboard.component.css']
})
export class TacticDashboardComponent implements OnInit, AfterViewInit, AfterViewChecked {
  tacticsData: any;
  showFilter = false;
  s: any;
  k: any;
  public show = false;
  public img_cover = 'cover';
  public width1 = '100';
  public width2 = '0';
  public height1 = '100';
  public height2 = '0';
  public buttonName: any = 'Show';
  public tacticsDataOriginal: any;
  public sample: any;
  rNum: any;

  public filterCheckbox = {
    all: false,
    fiat: false,
    grandCherokee: false,
    renegade: false,
    ram: false,
    chrysler: false
  };

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    // console.log(data);
    // console.log(data.tatics);
  }

  ngOnInit(): void {
    this.getDataFromJson();
  }


  ngAfterViewInit() {



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

  ngAfterViewChecked() {

    setTimeout(() => {
      // $('#drop-zone').droppable('destroy');
      // $('.car-panel').draggable('destroy');

      $('#drop-zone').droppable({
        accept: '.car-panel',
        drop: (event, ui) => {
          const ele = ui.draggable;
          const offersContainer = [];
          const draggingId = parseInt($(ele).attr('carId'), 10);

          $('#drop-zone > .cloned').each((index, ele1) => {
            offersContainer.push(parseInt($(ele1).attr('carId'), 10));
          });

          let brandDragged = '';

          if (offersContainer.length) {
            const find = _.find(this.tacticsDataOriginal, f => f.id === offersContainer[0]);
            if (find) {
              brandDragged = find.brand;
            }
          }

          const findDraggingData = _.find(this.tacticsDataOriginal, f => f.id === draggingId);

          if ((_.includes(offersContainer, draggingId) === false)
            && (offersContainer.length === 0 || (findDraggingData && findDraggingData.brand === brandDragged))
          ) {
            const cloned = ele.clone();

            cloned.addClass('cloned');
            cloned.append('<div onclick="deleteContainer(event)" class="cross-delete pointer">X</div>');
            cloned.appendTo('#drop-zone');
          }
        }
      });

      $('.car-panel').draggable({
        helper: 'clone'
      });

    }, 500);


  }

  toggle() {
    this.show = !this.show;
    if (this.show) {
      this.img_cover = 'contain';
      this.buttonName = 'Hide';
      this.width1 = '75';
      this.width2 = '25';
      this.height1 = '100';
      this.height2 = '400';
    } else {
      this.img_cover = 'cover';
      this.buttonName = 'Show';
      this.width1 = '100';
      this.width2 = '0';
      this.height1 = '100';
      this.height2 = '130';
    }
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  // drag(ev) {
  //   this.k = ev.dataTransfer.setData('text', ev.target.id);
  //   this.s = new Set();
  //   this.s.add(ev.target.id);
  //   console.log(this.s);
  // }

  // drop(ev) {
  //   ev.preventDefault();
  //   const data = _.clone(ev.dataTransfer.getData('text'));
  //   ev.target.appendChild(document.getElementById(data));
  //   console.log(data);
  // }

  filterBox() {
    this.showFilter = !this.showFilter;
  }



  createOffer() {
    const tacticId = [];
    let merged = {};

    $('#drop-zone > .cloned').each((index, ele) => {
      const id = parseInt($(ele).attr('carId'), 10);
      tacticId.push(id);

      const found = _.find(this.tacticsDataOriginal, f => f.id === id);

      if (found) {
        merged = _.assign(_.pickBy(merged, f => f !== ''), _.pickBy(found, f => f !== ''));
      }
    });

    let offersL: any = localStorage.getItem('offers');
    if (offersL) {
      offersL = JSON.parse(offersL);
    } else {
      offersL = [];
    }

    offersL.push(merged);

    localStorage.setItem('offers', JSON.stringify(offersL));

    this.rendomNum();

    this.router.navigate(['/offer-listing']);

  }

  clearFilter() {
      this.tacticsData = _.cloneDeep(this.tacticsDataOriginal);
  }

  applyFilter() {
    console.log(this.filterCheckbox);

    if (this.filterCheckbox.all) {
      this.tacticsData = _.cloneDeep(this.tacticsDataOriginal);
    } else {
      const filterBrands = [];

      if (this.filterCheckbox.fiat) {
        filterBrands.push('Fiat');
      }

      if (this.filterCheckbox.grandCherokee) {
        filterBrands.push('Grand Cherokee');
      }

      if (this.filterCheckbox.renegade) {
        filterBrands.push('RENEGADE');
      }

      if (this.filterCheckbox.ram) {
        filterBrands.push('RAM');
      }
      if (this.filterCheckbox.chrysler) {
        filterBrands.push('Chrysler');
      }
      const availableAllBrands = _.uniq(_.map(this.tacticsDataOriginal, f => f.brand));

      this.tacticsData = _.filter(this.tacticsDataOriginal, f => _.includes(filterBrands, f.brand));
    }
  }
  rendomNum() {
    this.rNum = Math.floor((Math.random() * 10) + 1);
    localStorage.setItem('offersId', this.rNum);
  }
}
