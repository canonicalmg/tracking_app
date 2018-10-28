import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IntakeInputPage } from './intake-input';

@NgModule({
  declarations: [
    IntakeInputPage,
  ],
  imports: [
    IonicPageModule.forChild(IntakeInputPage),
  ],
})
export class IntakeInputPageModule {}
