import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { TrackingPage } from './tracking';

@NgModule({
  declarations: [
    TrackingPage,
  ],
  imports: [
    IonicPageModule.forChild(TrackingPage),
    TranslateModule.forChild()
  ],
  exports: [
    TrackingPage
  ]
})
export class TrackingPageModule { }
