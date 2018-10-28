import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the IntakeInputPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-intake-input',
  templateUrl: 'intake-input.html',
})
export class IntakeInputPage {
  intake_input: any;
  dayOfWeek = this.getWeekday();
  public lineChartData = [];
  public lineChartLabels = [];

  constructor(public navCtrl: NavController, navParams: NavParams) {
    this.intake_input = navParams.get('intakeInput');
  }

  getWeekday() {
    let d = new Date();
    let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return weekday[d.getDay()];
  }



}
