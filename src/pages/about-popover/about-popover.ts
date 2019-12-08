import { Component } from '@angular/core';

import { App, NavController, ModalController, ViewController } from 'ionic-angular';


@Component({
  template: `
    <ion-list>
      <button ion-item (click)="close('https://www.facebook.com/nguyen.h.dang.739')">Hoài Đăng</button>
      <button ion-item (click)="close('https://www.facebook.com/dangchaugiang.it')">Châu Giang</button>
      <button ion-item (click)="close('https://www.facebook.com/TTMinhTT?ref=br_rs')">Thanh Minh</button>
      <button ion-item (click)="close('https://www.facebook.com/meskill.bui')">Ngọc Minh</button>
    </ion-list>
  `
})
export class PopoverPage {

  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public app: App,
    public modalCtrl: ModalController
  ) { }

  // support() {
  //   this.app.getRootNav().push('SupportPage');
  //   this.viewCtrl.dismiss();
  // }

  close(url: string) {
    window.open(url, '_blank');
    this.viewCtrl.dismiss();
  }
}