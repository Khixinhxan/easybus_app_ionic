import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { MapPage } from '../map/map';
import { SchedulePage } from '../schedule/schedule';
import { MapSearchPage } from '../map-search/map-search';
import { TraficMapPage } from '../trafic-map/trafic-map';


//import {HomePage} from '../home/home';
import { PlaceSearchPage } from '../place-search/place-search';
import { MemberListPage } from '../member-list/member-list';
import { WebPage } from '../web/web';
import { FacebookPage } from '../facebook/facebook';
import { CameraPage } from '../camera/camera';
@Component({
  templateUrl: 'tabs-page.html'
})
export class TabsPage {
  //set the root pages for each tab
  tab1Root: any = SchedulePage;
  tab2Root: any = MapSearchPage;
  tab3Root: any = TraficMapPage;
  //tab4Root: any = AboutPage;
  //tab4Root: any= CalendarPage;
  //tab4Root: any= PlaceSearchPage;
  //tab4Rott: any = HomePage;
  tab4Root: any= WebPage;
  tab5Root: any= CameraPage;
  //tab4Root: any= FacebookPage;
  mySelectedIndex: number;

  //fix
  // tab1Root: any = SpeakerListPage;
  // tab2Root: any = SchedulePage;
  // tab3Root: any = MapPage;
  // tab4Root: any = AboutPage;
  // mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}
