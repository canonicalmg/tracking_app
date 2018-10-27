import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Subjectives} from "../../providers";

/**
 * Generated class for the AddNewSubjectivePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-new-subjective',
  templateUrl: 'add-new-subjective.html',
})
export class AddNewSubjectivePage {
  name: string;
  subjectives: any;

  constructor(public navCtrl: NavController, navParams: NavParams) {
    this.subjectives = navParams.get('subjectives');
  }

  save() {
    console.log("saving: ", this.name);
    console.log("subjectives before push: ", this.subjectives);
    this.subjectives.push({
      name: this.name,
      active: 1,
      value: null
    });
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddNewSubjectivePage');
  }

}
