import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AddNewIntakePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-new-intake',
  templateUrl: 'add-new-intake.html',
})
export class AddNewIntakePage {
  name: string;
  intake: any;

  constructor(public navCtrl: NavController, navParams: NavParams) {
    this.intake = navParams.get('intake');
  }

  save() {
    console.log("saving: ", this.name);
    console.log("subjectives before push: ", this.intake);
    this.intake.push({
      name: this.name,
      active: 1,
      value: null,
      notes: "",
    });
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddNewSubjectivePage');
  }

}
