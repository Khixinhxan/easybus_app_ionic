import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { PopoverPage } from '../pages/about-popover/about-popover';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { SchedulePage } from '../pages/schedule/schedule';
import { ScheduleFilterPage } from '../pages/schedule-filter/schedule-filter';
import { SessionDetailPage } from '../pages/session-detail/session-detail';
import { SignupPage } from '../pages/signup/signup';

import { TabsPage } from '../pages/tabs-page/tabs-page';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { SupportPage } from '../pages/support/support';

import { Data } from '../providers/data';
import { UserData } from '../providers/user-data';

import { Toast } from '@ionic-native/toast';
import { HomePage } from '../pages/home/home';
import { HttpClientModule } from '@angular/common/http';
import { DataServiceProvider } from '../providers/data-service/data-service';

//add
import * as firebase from 'firebase';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
// import { ProductsProvider } from '../providers/products/products';
// import { CategoryProvider } from '../providers/category/category';
// import { CartProvider } from '../providers/cart/cart';
// import { AuthProvider } from '../providers/auth/auth';
// import { OrderProvider } from '../providers/order/order';
// import { ProductPage} from '../pages/product/product';
import { config } from '../config/app.config';

import { GoogleMaps } from '@ionic-native/google-maps';

import { Geolocation } from '@ionic-native/geolocation';   
// import { FindNearPage} from '../pages/find-near/find-near';
import { MapSearchPage } from '../pages/map-search/map-search';
import { MapDetailPage } from '../pages/map-detail/map-detail';

//add traffic
import { TraficMapPage } from '../pages/trafic-map/trafic-map';
import { GpsPage } from '../pages/gps/gps';
import { Geofence } from '@ionic-native/geofence';
//add calendar

import { PlaceSearchPage } from '../pages/place-search/place-search';
import { MemberListPage } from '../pages/member-list/member-list';


import {TranslateModule} from "@ngx-translate/core";
import {TextToSpeech} from "@ionic-native/text-to-speech";
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { WebPage } from '../pages/web/web';

import { FacebookPage } from '../pages/facebook/facebook';
import { Facebook } from '@ionic-native/facebook';
import {AngularFireModule} from "angularfire2";
import {AngularFireAuthModule} from 'angularfire2/auth'
import { Camera } from '@ionic-native/camera';
import { CameraPage } from '../pages/camera/camera';
import { SocialSharing } from '@ionic-native/social-sharing';

firebase.initializeApp(config.firebasConfig);


const firebaseConfig = {
  apiKey: "AIzaSyCPvCPoGr_XBxmyFJf-iHw8DbFGzTqCCzo",
    authDomain: "easybus-d1ec4.firebaseapp.com",
    databaseURL: "https://easybus-d1ec4.firebaseio.com",
    projectId: "easybus-d1ec4",
    storageBucket: "easybus-d1ec4.appspot.com",
    messagingSenderId: "873413927853"
};
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    AccountPage,
    LoginPage,
    MapPage,
    PopoverPage,
    SchedulePage,
    ScheduleFilterPage,
    SessionDetailPage,
    SignupPage,
    TabsPage,
    TutorialPage,
    SupportPage,
    HomePage,
    //BarcodeScanner,
    // Toast,
    //ProductPage,
    //WeatherPage,
    // FindNearPage,
    MapSearchPage,
    MapDetailPage,
    TraficMapPage,
    GpsPage,
    // AddEventPage,
    // CalendarPage,
    // EditEventPage,
    PlaceSearchPage,
    MemberListPage,
    WebPage,
    // OcrPage
    FacebookPage,
    CameraPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {}, {
      links: [
        { component: TabsPage, name: 'TabsPage', segment: 'tabs-page' },
        { component: SchedulePage, name: 'Schedule', segment: 'schedule' },
        { component: SessionDetailPage, name: 'SessionDetail', segment: 'sessionDetail/:sessionId' },
        { component: ScheduleFilterPage, name: 'ScheduleFilter', segment: 'scheduleFilter' },
        { component: MapSearchPage, name: 'Map', segment: 'map' },
        { component: AboutPage, name: 'About', segment: 'about' },
        { component: TutorialPage, name: 'Tutorial', segment: 'tutorial' },
        { component: SupportPage, name: 'SupportPage', segment: 'support' },
        { component: LoginPage, name: 'LoginPage', segment: 'login' },
        { component: AccountPage, name: 'AccountPage', segment: 'account' },
        { component: SignupPage, name: 'SignupPage', segment: 'signup' },
        { component: HomePage, name: 'HomePage', segment: 'scan' },
        // { component: CalendarPage, name: 'CalendarPage', segment: 'calendar' },
        { component:  MemberListPage, name: ' MemberListPage', segment: 'List' },
        { component:  WebPage, name: ' WebPage', segment: 'Web' },
        { component:  FacebookPage, name: ' FacebookPage', segment: 'Facebook' },
        { component:  CameraPage, name: ' CameraPage', segment: 'Camera' },

      ]
    }),
    IonicStorageModule.forRoot(),
    HttpModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    AccountPage,
    LoginPage,
    MapPage,
    PopoverPage,
    SchedulePage,
    ScheduleFilterPage,
    SessionDetailPage,
    SignupPage,
    TabsPage,
    TutorialPage,
    SupportPage,
    HomePage,
    //ProductPage,
    // WeatherPage,
    // FindNearPage,
    MapSearchPage,
    MapDetailPage,
    TraficMapPage,
    GpsPage,
    // AddEventPage,
    // CalendarPage,
    // EditEventPage,
    PlaceSearchPage,
    MemberListPage,
    WebPage,
    // OcrPage
    FacebookPage,
    CameraPage
  ],
  providers: [
    SocialSharing,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Data,
    UserData,
    InAppBrowser,
    SplashScreen,
    Toast,
    StatusBar,
    DataServiceProvider,
    // ProductsProvider,
    // CategoryProvider,
    NativePageTransitions,
    // CartProvider,
    // AuthProvider,
    // OrderProvider,
    GoogleMaps,
    //OpenWeatherProvider,
    Geolocation,
    Geofence,
    NativeGeocoder,
    // Calendar,
    SpeechRecognition,
    TextToSpeech,
    Facebook,
    Camera
  ]
})
export class AppModule { }
