import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Subjectives } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'subjective-measures.html'
})
export class SubjectiveMeasures {
  subjectives: any;

  constructor(public navCtrl: NavController, navParams: NavParams, subjectives: Subjectives) {
    this.subjectives = navParams.get('subjective') || subjectives.defaultSubjective;
  }

  addNew(subjectives) {
    this.navCtrl.push('AddNewSubjectivePage', {
      subjectives: subjectives
    });
  }

}
