import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlaceSearchPage } from './place-search';

@NgModule({
  declarations: [
    PlaceSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(PlaceSearchPage),
  ],
})
export class PlaceSearchPageModule {}
