import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddNewSubjectivePage } from './add-new-subjective';

@NgModule({
  declarations: [
    AddNewSubjectivePage,
  ],
  imports: [
    IonicPageModule.forChild(AddNewSubjectivePage),
  ],
})
export class AddNewSubjectivePageModule {}
