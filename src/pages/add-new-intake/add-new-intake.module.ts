import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddNewIntakePage } from './add-new-intake';

@NgModule({
  declarations: [
    AddNewIntakePage,
  ],
  imports: [
    IonicPageModule.forChild(AddNewIntakePage),
  ],
})
export class AddNewIntakePageModule {}
