import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Subjectives} from "../../providers";

/**
 * Generated class for the IntakeMeasuresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-intake-measures',
  templateUrl: 'intake-measures.html',
})
export class IntakeMeasuresPage {
  intake: any;

  constructor(public navCtrl: NavController, navParams: NavParams) {
    this.intake = navParams.get('intake');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntakeMeasuresPage');
  }

  addNew(intake) {
    this.navCtrl.push('AddNewIntakePage', {
      intake: intake
    });
  }

}
