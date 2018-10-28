import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IntakeMeasuresPage } from './intake-measures';

@NgModule({
  declarations: [
    IntakeMeasuresPage,
  ],
  imports: [
    IonicPageModule.forChild(IntakeMeasuresPage),
  ],
})
export class IntakeMeasuresPageModule {}
