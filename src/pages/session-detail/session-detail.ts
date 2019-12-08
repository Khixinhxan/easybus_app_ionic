import { Component } from '@angular/core';
import { NavParams,NavController } from 'ionic-angular';

import { Data } from '../../providers/data';
import { MapDetailPage } from '../map-detail/map-detail';

//---
import { ViewChild, ElementRef } from '@angular/core';
//---
//add plugin Gelocation
import { Geolocation } from '@ionic-native/geolocation';
// import { TraficMapPage } from '../trafic-map/trafic-map';
// import { CameraPage } from '../camera/camera';
declare const google;
@Component({
  selector: 'page-session-detail',
  templateUrl: 'session-detail.html'
})
export class SessionDetailPage {
  session: any;
  mapdetailPage: any;

//---
  @ViewChild('map-detail') mapElement: ElementRef;
  map: any;

  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  markers: any;
  autocomplete: any;
  GoogleAutocomplete: any;
  GooglePlaces: any;
  geocoder: any;
  address :any;
  loading: any;

  outward_from:any;
  outward_to:any;

  return_from:any;
  return_to:any;
  //hideMe:boolean=false;

  lat_current:any;
  lng_current:any;
  //map: GoogleMap;
  
  constructor(
    public dataProvider: Data,
    public navParams: NavParams,
    public navCtrl: NavController,
    public geolocation: Geolocation,
  ) 
  {
    this.mapdetailPage= MapDetailPage;
    
  }
  
  // hide() {
  //   this.hideMe = true;
  // }
  //--
  ionViewDidLoad(){
      this.initMap();
      
      
  }
  // initMap() {
  //   this.geolocation.getCurrentPosition().then( pos => {
  //     this.lat_current = pos.coords.latitude;
  //     this.lng_current = pos.coords.longitude;
  //     var map = new google.maps.Map(document.getElementById('map'), {
  //       zoom: 15,
  //       //center: {lat: 10.8222049, lng: 106.68749760000003}
  //       center: {lat: this.lat_current, lng: this.lng_current}
  //     });
  //     this.directionsDisplay.setMap(this.map);
      
  //   }).catch( err => console.log(err));
  // }
  // openMaptraffic()
  // {
  //   this.navCtrl.push(TraficMapPage);
  // }
  initMap() {
    this.map = new google.maps.Map(document.getElementById('map-detail'), {
      zoom: 50,
      center: {lat: 10.8222049, lng: 106.68749760000003},
    });

    this.directionsDisplay.setMap(this.map);
    this.map.infowindow.close()
  }

  calculateAndDisplayRoute() {
    this.directionsService.route({
      origin: this.session.outward_from,
      destination: this.session.outward_to,
      //travelMode: 'DRIVING',
      
      travelMode: 'TRANSIT',
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
    
        
       
      } else {
        //window.alert('Không tìm được  ' + status);
        window.alert('Không tìm được !!!');
      }
      
    });
  }
  calculateAndDisplayRoute_return() {
    this.directionsService.route({
      origin: this.session.return_from,
      destination: this.session.return_to,
      //travelMode: 'DRIVING',
      travelMode: 'TRANSIT',
    }, (response, status) => {
      if (status === 'OK') {
        var mapStyles = [{
          featureType: "all",
          elementType: "labels.text",
          stylers: [{
              visibility: "off"
          }]
      }];
        this.map.setOptions(mapStyles);
        this.directionsDisplay.setDirections(response);
      } else {
        //window.alert('Không tìm được  ' + status);
        window.alert('Không tìm được !!!');
      }
    });
  }
  //--
  // Camera()
  // {
  //   this.navCtrl.push(CameraPage,{},{animate: false})
  // }
  //--
  ionViewWillEnter() {
    this.dataProvider.load().subscribe((data: any) => {
      if (
        data &&
        data.schedule &&
        data.schedule[0] &&
        data.schedule[0].groups
      ) {
        for (const group of data.schedule[0].groups) {
          if (group && group.sessions) {
            for (const session of group.sessions) {
              if (session && session.id === this.navParams.data.sessionId) {
                this.session = session;
                break;
              }
            }
          }
        }
      }
    });
  }
}
