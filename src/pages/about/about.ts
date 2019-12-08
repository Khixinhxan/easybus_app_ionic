import { Component } from '@angular/core';
import { PopoverController } from 'ionic-angular';

import { PopoverPage } from '../about-popover/about-popover';
import { HomePage } from '../home/home';
// import { ProductPage } from '../product/product'
import { MapSearchPage } from '../map-search/map-search';
import { TraficMapPage } from '../trafic-map/trafic-map';
import { GpsPage } from '../gps/gps';
//import { FindNearPage } from '../find-near/find-near';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  conferenceDate = '2047-05-17';


  homePage: any;
  productPage : any;
  weatherPage : any;
  // findNearPage : any;
  mapsearchPage: any;
  trafficPage: any;
  gpsPage:any;

  constructor(public popoverCtrl: PopoverController) {
    this.homePage = HomePage;
    // this.productPage = ProductPage;
    this.mapsearchPage= MapSearchPage;
    this.trafficPage= TraficMapPage;
    //this.findNearPage = FindNearPage;
    this.gpsPage = GpsPage
   }

  presentPopover(event: Event) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({ ev: event });
  }
  



}
