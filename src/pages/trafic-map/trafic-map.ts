import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the TraficMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

import { GoogleMap } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
//import { ViewChild, ElementRef } from '@angular/core';
// import { googlemaps } from 'googlemaps';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
declare const google:any;

@IonicPage()
@Component({
  selector: 'page-trafic-map',
  templateUrl: 'trafic-map.html',
})
export class TraficMapPage {
  //add
  //@ViewChild('map') mapElement: ElementRef;
  // map: any;
  // directionsDisplay = new google.maps.DirectionsRenderer;
  map_traffic: GoogleMap;
  //isEnabled: boolean = false;

 // marker: Marker;
  lat_current:any;
  lng_current:any;
  address:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public geo:Geolocation,
    public nativeGeocoder: NativeGeocoder,
    private alertCtrl: AlertController
  ) {
    
  }
  doRefresh() {
    this.ionViewDidLoad();
  }
  
  // initMap() {
  //   this.map = new google.maps.Map(this.mapElement.nativeElement, {
  //     zoom: 50,
  //     center: {lat: 10.8222049, lng: 106.68749760000003},
  //   });

  //   this.directionsDisplay.setMap(this.map);
  // }
  // initMap() {
  //   this.geo.getCurrentPosition().then( pos => {
  //     this.lat_current = pos.coords.latitude;
  //     this.lng_current = pos.coords.longitude;
  //     this.map = new google.maps.Map(this.mapElement.nativeElement, {
  //       zoom: 70,
  //       //center: {lat: 10.8222049, lng: 106.68749760000003}
  //       center: {lat: this.lat_current, lng: this.lng_current}
  //     });
  //       this.directionsDisplay.setMap(this.map);
  //       var trafficLayer = new google.maps.TrafficLayer();
  //       trafficLayer.setMap(this.map);
  //   }).catch( err => console.log(err));
  // }
  initMap() {
  
    this.geo.getCurrentPosition().then( pos => {
      //console.log(pos)
      this.lat_current = pos.coords.latitude;
      this.lng_current = pos.coords.longitude;
      var map_traffic = new google.maps.Map(document.getElementById('map-trafic'), {
        zoom: 15,
        //center: {lat: 10.8222049, lng: 106.68749760000003}
        center: {lat: this.lat_current, lng: this.lng_current}
  
      });
     
      //add market
      var marker = new google.maps.Marker({
        position: map_traffic.getCenter(),
        map: map_traffic,
        icon: {
          //url: 'http://i.imgur.com/YsKYfOw.png',
          url: 'assets/icon/location.png',
          size: new google.maps.Size(90, 90),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(0, 20),
          scaledSize: new google.maps.Size(20, 20),
          labelOrigin: new google.maps.Point(9, 8)
        }
        // },
        // label: {
        //   text: '5',
        //   fontWeight: 'bold',
        //   fontSize: '12px',
        //   color: 'white'
        // }
      });
         var trafficLayer = new google.maps.TrafficLayer();
         trafficLayer.setMap(map_traffic); 
        
    }).catch( err => console.log(err));
  }
  ionViewDidLoad(){
    this.initMap();
 
  }
  //  reverseGeoCoding() {
  //   let geocoder = new google.maps.Geocoder;
  //   let latlng = {lat: this.lat_current, lng: this.lng_current};
  //   console.log('Latlng',latlng)
  //   geocoder.geocode({'location': latlng}, (results, status) => {
  //     console.log(results);
  //      console.log('ket qua',results[0].formatted_address); // read data from here
  //      console.log(status);
  //   });
  //  }
  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Lưu ý',
      subTitle: `
      <p>Các đoạn <span class='text_red'>màu đỏ</span> trên bản đồ có nghĩa là giao thông đường cao tốc đang chuyển động ở mức dưới ~40 km mỗi giờ và có thể chỉ ra một tai nạn hoặc ùn tắc trên tuyến đường đó. </p>
      <p>Đoạn <span class='text_yellow'>màu vàng</span> trên bản đồ chỉ ra rằng giao thông đang chuyển động nhanh hơn, từ  ~40 đến ~80 km mỗi giờ.</p>
      <p>Đoạn <span class='text_green'>màu xanh lá cây</span> có nghĩa là trên bản đồ giao thông đang chuyển động ở mức từ 80 km mỗi giờ hoặc nhiều hơn. </p>
      <p>Đoạn <span class='text_gray'>màu xám</span> trên bản đồ, hãy cho biết rằng không có thông tin giao thông vào thời điểm đó.</p>`,
      buttons: ['Ok'],
      cssClass: 'alertClass'
    });
    alert.present();
  }
  }
