import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WebPage } from './web';

@NgModule({
  declarations: [
    WebPage,
  ],
  imports: [
    IonicPageModule.forChild(WebPage),
  ],
})
export class WebPageModule {}
