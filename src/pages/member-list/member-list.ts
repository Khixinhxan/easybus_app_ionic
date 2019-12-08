import { Component } from '@angular/core';

import {
  ActionSheetController,
  Config,
  NavController,
  AlertController
} from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

// TODO remove


@Component({
  selector: 'page-member-list',
  templateUrl: 'member-list.html'
})
export class MemberListPage {
 
  info_D="";
  info_G="";

  display_D=false;
  display_G=false;

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController,
    public config: Config,
    public inAppBrowser: InAppBrowser,
    private alertCtrl: AlertController
  ) {}

  ionViewDidLoad() {
    
  }

//  presentIns(name:string) {
//   let alert = this.alertCtrl.create({
//     title: 'Instagram',
//     subTitle: `www.instagram.com/${name}/`,
//     buttons: ['Ok']
//   });
//   alert.present();
// }
// presentFb(name:string) {
//   let alert = this.alertCtrl.create({
//     title: 'Facebook',
//     subTitle: `www.facebook.com/${name}`,
//     buttons: ['Ok']
//   });
//   alert.present();
// }
// presentGm(name:string) {
//   let alert = this.alertCtrl.create({
//     title: 'Gmail',
//     subTitle: `${name}`,
//     buttons: ['Ok']
//   });
//   alert.present();
// }

displayInfo_D(name_D:string)
{
  this.info_D=name_D;
  this.display_D=true;
}
displayInfo_G(name_G:string)
{
  this.info_G=name_G;
  this.display_G=true;
}

}
