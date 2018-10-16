import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { ChartsModule } from 'ng2-charts';

import { SearchPage } from './analysis';

@NgModule({
  declarations: [
    SearchPage,
  ],
  imports: [
    ChartsModule,
    IonicPageModule.forChild(SearchPage),
    TranslateModule.forChild()
  ],
  exports: [
    SearchPage
  ]
})
export class SearchPageModule { }
