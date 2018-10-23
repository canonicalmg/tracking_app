import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { ChartsModule } from 'ng2-charts';

import { SubjectiveInput } from './subjective-input';

@NgModule({
  declarations: [
    SubjectiveInput,
  ],
  imports: [
    ChartsModule,
    IonicPageModule.forChild(SubjectiveInput),
    TranslateModule.forChild()
  ],
  exports: [
    SubjectiveInput
  ]
})
export class ItemDetailPageModule { }
