import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SubjectiveMeasures } from './subjective-measures';

@NgModule({
  declarations: [
    SubjectiveMeasures,
  ],
  imports: [
    IonicPageModule.forChild(SubjectiveMeasures),
    TranslateModule.forChild()
  ],
  exports: [
    SubjectiveMeasures
  ]
})
export class ItemDetailPageModule { }
