import { Component, ViewChild, ElementRef,NgZone } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavController,LoadingController,NavParams } from 'ionic-angular';

//add plugin Gelocation
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@IonicPage()
@Component({
  selector: 'page-map-detail',
  templateUrl: 'map-detail.html'
})
export class MapDetailPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  start = '';
  end = '';
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  markers: any;
  autocomplete: any;
  GoogleAutocomplete: any;
  GooglePlaces: any;
  geocoder: any;
  address :any;
  loading: any;


  session_To: any;
  session_From: any;

  sessionItems_To: any;
  sessionItems_From: any;
  data: string;
  constructor(
    public navCtrl: NavController,
    public zone: NgZone,
    public loadingCtrl: LoadingController,
    public geolocation: Geolocation,
    public navParams: NavParams
  ) 
  {
    // this.data = navParams.get('data');
    this.geocoder = new google.maps.Geocoder;
    let elem = document.createElement("div")
    this.GooglePlaces = new google.maps.places.PlacesService(elem);
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.sessionItems_From = {
      input_From: ''
    };
    
    this.sessionItems_To = {
      input_To: ''
    };

    this.markers = [];
    this.loading = this.loadingCtrl.create();


    this.sessionItems_From = [];
    this.sessionItems_To = [];
    
  }
  
  ionViewDidLoad(){
    this.initMap();
    this.calculateAndDisplayRoute_Detail();
    //this.tryGeolocation()
  }

  initMap() {
    // this.geolocation.getCurrentPosition().then((resp) => {
    //   let pos = {
    //     lat: resp.coords.latitude,
    //     lng: resp.coords.longitude
    //   });
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 30,
     // center: {lat: this.tryGeolocation_lat(), lng: this.tryGeolocation_long()},
      center: {lat: 10.8222049, lng: 106.68749760000003},
    });

    this.directionsDisplay.setMap(this.map);
  }


  calculateAndDisplayRoute_Detail() {
    this.directionsService.route({
      origin: this.sessionItems_From.input_From,
      destination: this.sessionItems_To.input_To,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        //window.alert('Không tìm được  ' + status);
        window.alert('Không tìm được !!!');
      }
    });
  }

}