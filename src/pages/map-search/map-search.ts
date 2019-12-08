import { Component, ViewChild, ElementRef,NgZone } from '@angular/core';
import { IonicPage, DateTime, AlertController, Searchbar } from 'ionic-angular';
import { NavController,LoadingController } from 'ionic-angular';

//add plugin Gelocation
import { Geolocation } from '@ionic-native/geolocation';
//declare var google;
declare const google:any;

import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { TraficMapPage } from '../trafic-map/trafic-map';
import { MemberListPage } from '../member-list/member-list';
import { SessionDetailPage } from '../session-detail/session-detail';

@IonicPage()
@Component({
  selector: 'page-map-search',
  templateUrl: 'map-search.html'
})
export class MapSearchPage {

  @ViewChild('map-search') mapElement: ElementRef;
  @ViewChild('mySearchbar') searchbar: Searchbar;
  // map: any;
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

  autocomplete_To: any;
  autocomplete_From: any;

  autocompleteItems_To: any;
  autocompleteItems_From: any;

  lat_current:any;
  lng_current:any;

  map:any;

  autocomplete_From_split:any;
  autocomplete_To_split:any;

  distance:any;
  duration:any;

  hideinfor=false;

  ori_to:any
  des_to:any
  
  ori_from:any
  des_from:any

  gps_address_1 : any;
  gps_address_2 : any;

  lat_current_gps:any;
  lng_current_gps:any;

  arrival_stop:any;

  turnonGPS:boolean=false

  input_From:any;
  list: Array<any> = [];
  list_bus: Array<any> = [];

  //transit_stop:any;
  constructor(
    public navCtrl: NavController,
    public zone: NgZone,
    public loadingCtrl: LoadingController,
    public geolocation: Geolocation,
    public nativeGeocoder: NativeGeocoder,
    private alertCtrl: AlertController
  ) 
  {
    this.geocoder = new google.maps.Geocoder;
    let elem = document.createElement("div")
    this.GooglePlaces = new google.maps.places.PlacesService(elem);
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete_From = {
      input_From: ''
    };
    
    this.autocomplete_To = {
      input_To: ''
    };

    this.markers = [];
    this.loading = this.loadingCtrl.create();
    this.autocompleteItems_From = [];
    this.autocompleteItems_To = [];

    
  }

  ionViewDidLoad(){
    this.initMap();
    
    //this.tryGeolocation()
  }
  
  initMap() {
    this.init()
    this.map = new google.maps.Map(document.getElementById('map-search'), {
      zoom: 45,
      center: {lat: 10.8222049, lng: 106.68749760000003},
      
      //center: {lat:this.lat_current_gps , lng: this.lng_current_gps}
    }
    );
    var marker = new google.maps.Marker({
      position: this.map.getCenter(),
      map: this.map,
      icon: {
        //url: 'http://i.imgur.com/YsKYfOw.png',
        url: 'assets/icon/location.png',
        size: new google.maps.Size(90, 90),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 20),
        scaledSize: new google.maps.Size(20, 20),
        labelOrigin: new google.maps.Point(9, 8)
      }
    });
    this.directionsDisplay.setMap(this.map);
  }
  initMap_GPS() {
    this.map = new google.maps.Map(document.getElementById('map-search'), {
      zoom: 45,
      center: {lat:this.lat_current_gps , lng: this.lng_current_gps}
    }
    );
    var marker = new google.maps.Marker({
      position: this.map.getCenter(),
      map: this.map,
      icon: {
        //url: 'http://i.imgur.com/YsKYfOw.png',
        url: 'assets/icon/location.png',
        size: new google.maps.Size(90, 90),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 20),
        scaledSize: new google.maps.Size(20, 20),
        labelOrigin: new google.maps.Point(9, 8)
      }
    });
    this.directionsDisplay.setMap(this.map);
  }
  // openMaptraffic()
  // {
  //   this.navCtrl.push(TraficMapPage);
  // }
  calculateAndDisplayRoute() {
    // var start = '37.7683909618184, -122.51089453697205';
    // var end = '41.850033, -87.6500523';
    //var origin = this.convertAddress_to_Geo(this.autocomplete_From.input_From)
    //var des = this.convertAddress_to_Geo(this.autocomplete_To.input_To)
    // console.log('origin',this.codeAddress(this.autocomplete_From.input_From))
    // console.log('des',this.codeAddress(this.autocomplete_From.input_From))
    // console.log('hi',this.ori_to)
    // console.log('hi',this.des_to)
    // var xx = this.return_valueGeo(this.autocomplete_From.input_From)
    // console.log(xx)
    //this.returnGeo(this.autocomplete_From.input_From)
    if(this.turnonGPS==true)
    {
      this.input_From = this.gps_address_1
      this.searchbar.clearInput(null);
      // this.disable()
    }
    else
    {
      this.input_From =this.autocomplete_From.input_From.split(",",1).toString()
    }
    var list_bus_temp: Array<any> = [];
    this.directionsService.route({
      //origin: this.autocomplete_From.input_From.split(",",1).toString(),
      origin: this.input_From,
      destination: this.autocomplete_To.input_To.split(",",1).toString(),

      //origin: this.convertAddress_to_Geo(this.autocomplete_From.input_From),
      //destination: this.convertAddress_to_Geo(this.autocomplete_From.input_From),
      travelMode: 'TRANSIT',
    }, 
    (response, status) => {
    
      if (status === 'OK') {
        console.log(response);
        console.log(status);
        this.directionsDisplay.setDirections(response);
        //this.writeDirectionsSteps(response.routes[0].legs[0].steps)
        // console.log(response.routes[0].legs[0].distance.text);
        // console.log(response.routes[0].legs[0].duration.text);
        this.distance= response.routes[0].legs[0].distance.text;
        this.duration = this.rettime(response.routes[0].legs[0].duration.text);

        //this.arrival_stop = response.routes[0].legs[0].steps[1].transit.arrival_stop.name
        // if(response.routes[0].legs[0].steps[i] != null ||
        //   response.routes[0].legs[0].steps[i] != '')
          { this.list.push(response.routes[0].legs[0].steps[0])
            //this.export_list_step(this.list)
            //console.log('alo',this.list.length)
            for (var i=0; i < response.routes[0].legs[0].steps.length; i++)
            {
              // console.log('object',response.routes[0].legs[0].steps[i])
              // console.log('travel_mode',response.routes[0].legs[0].steps[i].travel_mode)
              // console.log('distance',response.routes[0].legs[0].steps[i].distance.text)
              // console.log('duration',response.routes[0].legs[0].steps[i].duration.text)
              // console.log('instructions',response.routes[0].legs[0].steps[i].instructions)
              if(response.routes[0].legs[0].steps[i].hasOwnProperty('travel_mode'))
              {
                //console.log('transit',response.routes[0].legs[0].steps[i].transit)
                if(response.routes[0].legs[0].steps[i].hasOwnProperty('transit'))
                {
                  if(response.routes[0].legs[0].steps[i].transit.hasOwnProperty('line'))
                  {
                    list_bus_temp.push(response.routes[0].legs[0].steps[i].transit.line.name)
                  }
                   
                }
              }
              
            }
          }
        this.list_bus = list_bus_temp
        // console.log('zz',this.retnum('03 -Bến Xe Buýt Sài Gòn - Bến Xe Buýt Thạnh Lộc'))
        this.hideinfor=true;
      } else {
        //window.alert('Không tìm được !!!');
        this.presentAlert()
        this.hideinfor=false;
      }
      

    });
    
  }
  retnum(str) { 
    //var num = str.replace(/[^0-9]/g, ''); 
    var num = str.substr(0,3)
    num = num.replace(' ','')
    return num; 
  }
  rettime(str)
  {
    var min = 'phút'; 
    var hour = 'giờ';
    var timeconvert = str.replace('mins',min)
    timeconvert = timeconvert.replace('min',min)
    timeconvert = timeconvert.replace('hour', hour)
    timeconvert = timeconvert.replace('hours', hour)
    return timeconvert
  }
  retnamebus(str1,str2)
  {
    var namebus = str1.replace(str2,'')
    return namebus
  }
goToSessionDetail(sessionData: any) {
  // go to the session detail page
  // and pass in the session data

  this.navCtrl.push(SessionDetailPage, { sessionId: this.retnum(sessionData) });
  //console.log('id', this.retnum(sessionData))
  // var x = '15 - Bến Xe Buýt Chợ Lớn - Bến xe Ngã 4 Ga'
  // console.log('id_test', this.retnum(x))
}


//   writeDirectionsSteps(steps) {
//   //var directions = document.getElementById('panel');
//   //directions.innerHTML = '';
//   for (var i = 0; i < steps.length; i++) {
//     //this. += '<br/><br/>' + steps[i].instructions + '<br/>' + steps[i].distance.text;
//     // if .transit property exists
//     if (!!steps[i].transit) {
//       this.transit_stop += steps[i].transit.arrival_stop.name;
//       console.log(this.transit_stop)
//     }
//   }
//   return this.transit_stop
// }
  // codeAddress(address) {
  //   var geocoder = new google.maps.Geocoder();
  //   var loc=[];
  //   geocoder.geocode( { 'address': address}, function(results, status) {
  //     if (status == google.maps.GeocoderStatus.OK) {
  //       loc[0]=results[0].geometry.location.lat();
  //       loc[1]=results[0].geometry.location.lng();
  //       this.ori_to =loc[0]
  //       this.des_to =loc[1]
  //       console.log(loc)
  //     }
  //   });
  //   return loc;
  
  // }
  // returnGeo(address)
  // {
  //   let options: NativeGeocoderOptions = {
  //     useLocale: true,
  //     maxResults: 5
  // };
  // this.nativeGeocoder.forwardGeocode(address, options)
  // .then((coordinates: NativeGeocoderForwardResult[]) => 
  // console.log( coordinates[0].latitude + ', ' + coordinates[0].longitude)

  // )
  
  // .catch((error: any) => console.log(error));
  
  
   
  // }

  //  convertAddress_to_Geo(address)
  // {
  //   var geocoder = new google.maps.Geocoder();
  //   var latitude=''
  //   var longitude =''
  //   //var geoconvert =''
  //   geocoder.geocode( { 'address': address}, function(results, status) {
      
  //     if (status == google.maps.GeocoderStatus.OK) {
  //       latitude = results[0].geometry.location.lat();
  //       longitude = results[0].geometry.location.lng();
  //       console.log('lat',latitude)
  //       console.log('lon',longitude)
  //       var geoconvert = latitude +', '+longitude
  //       console.log('geoconvert',geoconvert)
  //     }
  //   }); 
   
  // }
  reverseGeoCoding() {
    this.init()//call function init()
    
    // this.reverseGeoCoding()
    let geocoder_gps = new google.maps.Geocoder;
    let latlng = {lat: this.lat_current_gps, lng: this.lng_current_gps};
    geocoder_gps.geocode({'location': latlng}, (results, status) => {
      // console.log(results);
      //  console.log('ket qua',results[0].formatted_address); // read data from here
      //  console.log(status);
       this.gps_address_1 = results[0].formatted_address
       this.gps_address_2 = results[1].formatted_address
      //  console.log(this.gps_address_1)
      //  console.log(this.gps_address_2)
    });
    this.turnonGPS=true
    this.initMap_GPS()
   }
   init() {
    this.geolocation.getCurrentPosition().then( pos => {
      //console.log(pos)
      this.lat_current_gps = pos.coords.latitude;
      this.lng_current_gps = pos.coords.longitude;
      // console.log(pos.coords.latitude)
      // console.log(pos.coords.longitude)
      });
  }
  // disable() {
  //   const inputs: any = document.getElementById("autocomplete_From.input_From").getElementsByTagName("INPUT");
  //   inputs[0].disabled=true;
  // }
  updateSearchResults_From(){
    if (this.autocomplete_From.input_From == '') {
      this.autocompleteItems_From = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete_From.input_From,
      componentRestrictions: {country: 'vn'}
    },
      (predictions, status) => {
        this.autocompleteItems_From = [];
        if(predictions){
          //check predictions
          //console.log(predictions);
          this.zone.run(() => {
            predictions.forEach((prediction) => {
              this.autocompleteItems_From.push(prediction);
      
            });
          });
        }
    });
  }
  selectSearchResult_From(item){
    this.clearMarkers();
    this.autocompleteItems_From = [];
    this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
      if(status === 'OK' && results[0]){
        // let position = {
        //     lat: results[0].geometry.location.lat,
        //     lng: results[0].geometry.location.lng
        // };
        this.autocomplete_From=results[0];
        let marker = new google.maps.Marker({
         // position: results[0].geometry.location,
          map: this.map
        });
        this.markers.push(marker);
        //this.map.setCenter(results[0].geometry.location);
    this.autocomplete_From.input_From = item.description;
      }
    })
  }


  //To
  updateSearchResults_To(){
    if (this.autocomplete_To.input_To == '') {
      this.autocompleteItems_To = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete_To.input_To,
      componentRestrictions: {country: 'vn'}},
      (predictions, status) => {
        this.autocompleteItems_To = [];
        if(predictions){
          this.zone.run(() => {
            predictions.forEach((prediction) => {
              this.autocompleteItems_To.push(prediction);
            });
          });
        }
    });
  }

  selectSearchResult_To(item){
    this.clearMarkers();
    this.autocompleteItems_To = [];
    this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
      if(status === 'OK' && results[0]){
        // let position = {
        //     lat: results[0].geometry.location.lat,
        //     lng: results[0].geometry.location.lng
        // };
        let marker = new google.maps.Marker({
          //position: results[0].geometry.location,
          map: this.map
        });
        this.markers.push(marker);
        // this.map.setCenter(results[0].geometry.location);
    this.autocomplete_To.input_To = item.description;
    // console.log(this.autocomplete_To.input_To)
      }
    })
  }

  clearMarkers(){
    for (var i = 0; i < this.markers.length; i++) {
      console.log(this.markers[i])
      this.markers[i].setMap(null);
    }
    this.markers = [];
  }
  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Thông báo',
      subTitle: 'Không tìm thấy kết quả phù hợp',
      buttons: ['Ok']
    });
    alert.present();
  }
}