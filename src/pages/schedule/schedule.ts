import { Component, ViewChild } from '@angular/core';

import { AlertController, App, FabContainer, ItemSliding, List, ModalController, NavController, ToastController, LoadingController, Refresher, Item, ItemContent } from 'ionic-angular';

/*
  To learn how to use third party libs in an
  Ionic app check out our docs here: http://ionicframework.com/docs/v2/resources/third-party-libs/
*/
// import moment from 'moment';

import { Data } from '../../providers/data';
import { UserData } from '../../providers/user-data';

import { SessionDetailPage } from '../session-detail/session-detail';
import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';

import {SpeechRecognition } from "@ionic-native/speech-recognition";
import { isNull } from 'util';
//import firebase from 'firebase';
@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage {
  // the list is a child of the schedule page
  // @ViewChild('scheduleList') gets a reference to the list
  // with the variable #scheduleList, `read: List` tells it to return
  // the List and not a reference to the element
  @ViewChild('scheduleList', { read: List }) scheduleList: List;

  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  confDate: string;
  queryText_Convert:any;


  public translatedText:string = "";

  constructor(
    public alertCtrl: AlertController,
    public app: App,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public confData: Data,
    public user: UserData,
    public sr: SpeechRecognition
  ) {}

  ionViewDidLoad() {
    this.app.setTitle('Schedule');
    this.updateSchedule();
    //this.getListDetails();
    //var json = JSON.stringify(this.getListDetails());
    //console.log('json',json)
  }
  // getListDetails(){
  //   let keys_values = []
  //   firebase.database().ref().on('value', (snap) => {
  //       let result = snap.val();
  //       for(let k in result){
  //         keys_values.push({
  //           key : k,
  //           values : result[k]
  //         })
  //         console.log('aaa',keys_values)
  //       }console.log('bb',keys_values)
  //       return keys_values
        
  //   });
  //   var json1 = JSON.stringify(keys_values);
  //   console.log('json1',json1)
  // }

  ucwords (str) { 
    str = (str + '').toLowerCase(); 
    return str.replace(/^([a-z])|\s+([a-z])/g, function ($1) { 
     return $1.toUpperCase(); 
    }); 
} 

  updateSchedule() {
    this.scheduleList && this.scheduleList.closeSlidingItems();
    //Check status trans
    
    if(this.translatedText !='' )
    {
      this.queryText_Convert = this.ucwords(this.translatedText);
      // console.log("translatedText",this.translatedText);
      // console.log("queryText_Convert",this.queryText_Convert);
    }
    else

      {
        this.queryText_Convert = this.ucwords(this.queryText);
      }
      //this.queryText_Convert = this.ucwords(this.queryText);
    
    // Close any open sliding items when the schedule updates
    // this.scheduleList && this.scheduleList.closeSlidingItems();
    // this.queryText_Convert = this.ucwords(this.queryText);
    //console.log("queryText_Convert 1",this.queryText_Convert);
    this.confData.load()

    this.confData.getTimeline(this.dayIndex, this.queryText_Convert, this.excludeTracks, this.segment).subscribe((data: any) => {
      this.shownSessions = data.shownSessions;
      this.groups = data.groups;
      
    });
  }

  presentFilter() {
    let modal = this.modalCtrl.create(ScheduleFilterPage, this.excludeTracks);
    modal.present();

    modal.onWillDismiss((data: any[]) => {
      if (data) {
        this.excludeTracks = data;
        this.updateSchedule();
      }
    });

  }

  goToSessionDetail(sessionData: any) {
    // go to the session detail page
    // and pass in the session data

    this.navCtrl.push(SessionDetailPage, { sessionId: sessionData.id, name: sessionData.name });
  }

  addFavorite(slidingItem: ItemSliding, sessionData: any) {

    if (this.user.hasFavorite(sessionData.name)) {
      // woops, they already favorited it! What shall we do!?
      // prompt them to remove it
      this.removeFavorite(slidingItem, sessionData, 'Tuyến bus yêu thích đã tồn tại');
    } else {
      // remember this session as a user favorite
      this.user.addFavorite(sessionData.name);

      // create an alert instance
      let alert = this.alertCtrl.create({
        title: 'Tuyến bus yêu thích đã được thêm',
        buttons: [{
          text: 'Đồng ý',
          handler: () => {
            // close the sliding item
            slidingItem.close();
          }
        }]
      });
      // now present the alert on top of all other content
      alert.present();
    }

  }


  removeFavorite(slidingItem: ItemSliding, sessionData: any, title: string) {
    let alert = this.alertCtrl.create({
      title: title,
      message: 'Bạn có chắc xóa tuyến bus yêu thích này?',
      buttons: [
        {
          text: 'Hủy',
          handler: () => {
            // they clicked the cancel button, do not remove the session
            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        },
        {
          text: 'Xóa',
          handler: () => {
            // they want to remove this session from their favorites
            this.user.removeFavorite(sessionData.name);
            this.updateSchedule();

            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        }
      ]
    });
    // now present the alert on top of all other content
    alert.present();
  }

  openSocial(network: string, fab: FabContainer) {
    let loading = this.loadingCtrl.create({
      content: `Chia sẻ ${network}`,
      duration: (Math.random() * 1000) + 500
    });
    loading.onWillDismiss(() => {
      fab.close();
    });
    loading.present();
  }

  doRefresh(refresher: Refresher) {
    this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
      this.shownSessions = data.shownSessions;
      this.groups = data.groups;

      // simulate a network request that would take longer
      // than just pulling from out local json file
      setTimeout(() => {
        refresher.complete();

        const toast = this.toastCtrl.create({
          message: 'Các tuyến bus đã cập nhật',
          duration: 3000
        });
        toast.present();
      }, 1000);
    });
  }

//add speech
async turnOnTranscribing(){

  //check to see if you already have permission to access the device's microphone
  if(!(await this.sr.hasPermission())){
    this.sr.requestPermission()

    //try to get the user's permission 
    .then(this.startTranscribing,()=>{ alert("Tính năng này không thể sử dụng.")})
  }else{
    //you have the user's permission to access their device's microphone, so start listening
    this.startTranscribing();
  }
}

/** start listening to what the person is saying */
startTranscribing(){
  //var inputTrans =''
  // listen for english and only expect one match in the results array
  this.sr.startListening({
    //language : "en-EN",
    language : "vi-VN",
    matches : 1
  }).subscribe((_matches)=>{

    // if the API was able to generate at least one matching word or phrase, display it
    if(_matches && _matches.length > 0){
      //this.translatedText = _matches[0];

      this.translatedText = this.ucwords(_matches[0]);
      //inputTrans = this.translatedText
      this.updateSchedule()
    }
  },(_e)=>{
    // if something went wrong, show an error message
    alert("Không nhận diện được!");
  })

}

/** stop listening to the user's mic */
stopTranscribing(){
  this.sr.stopListening();
}

}
