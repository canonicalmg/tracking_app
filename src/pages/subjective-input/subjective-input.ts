import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Subjectives } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'subjective-input.html'
})
export class SubjectiveInput {
  subjective_input: any;
  dayOfWeek = this.getWeekday();
  public lineChartData = [];
  public lineChartLabels = [];

  constructor(public navCtrl: NavController, navParams: NavParams) {
    this.subjective_input = navParams.get('subjectiveInput');
    this.lineChartData = [
      {data: [4,6,7,8,8,7,0], label: this.subjective_input.name},
    ];
    this.modifyChartLabels();
  }

  modifyChartLabels(){
    // while(this.lineChartLabels.length > this.lineChartLabels.indexOf(this.dayOfWeek)){
    //   this.lineChartLabels.pop()
    // }
    console.log("before: ", this.lineChartLabels);
    let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let d = new Date();
    for(let i=1; i <= 7; i++){
      this.lineChartLabels.push(weekday[(d.getDay() + i)%7])
    }
    console.log("after: ", this.lineChartLabels);
  }

  getWeekday() {
    let d = new Date();
    let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return weekday[d.getDay()];
  }

  // lineChart
  public lineChartOptions:any = {
    responsive: false
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  public updateGraph() {
    console.log("updating graph");
    console.log("value: ", this.subjective_input.value);
    console.log(this.lineChartData);

    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = this.lineChartData[i].data[j];
      }
    }
    _lineChartData[0].data.pop();
    _lineChartData[0].data.push(this.subjective_input.value);
    this.lineChartData = _lineChartData;
  }

  public randomize():void {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

}
