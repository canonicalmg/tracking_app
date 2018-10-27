import { Component } from '@angular/core';
import { IonicPage, NavController, Checkbox, App } from 'ionic-angular';
import {Subjective} from "../../models/subjective";
import { NativeStorage } from '@ionic-native/native-storage';

@IonicPage()
@Component({
  selector: 'page-cards',
  templateUrl: 'tracking.html'
})
export class TrackingPage {
  subjectives: any[];
  intake: any[];
  dayOfWeek = this.getWeekday();
  today_formatted = this.formatDate(new Date());

  constructor(app: App, public navCtrl: NavController, private nativeStorage: NativeStorage) {
    this.subjectives = [];
    this.intake = [];

    app.viewWillEnter.subscribe(
      () => {
        console.log('view about to be entered');
        // initialize measurements
        /*

          get stored keys
          iterate over preset keys
          if each preset key not in stored keys
          stored keys += preset key
          save stored keys

         */
        this.nativeStorage.getItem('measurement_keys')
          .then(
            data => {
              console.log("measurements already initialized");
            },
            error => {
              console.log("no measurement keys");
              // no stored keys
              let initial_measurement_keys = {
                subjectives: [
                  {
                    name: "Mood",
                    active: 1,
                  },
                  {
                    name: "Sleep",
                    active: 1,
                  },
                  {
                    name: "Motivation",
                    active: 1,
                  },
                  {
                    name: "Energy",
                    active: 1,
                  }
                ],
                intake: [
                  {
                    name: "Supplements",
                    active: 1,
                  },
                  {
                    name: "Medication",
                    active: 1,
                  },
                  {
                    name: "Food",
                    active: 1,
                  },
                  {
                    name: "Exercise",
                    active: 1,
                  },
                  {
                    name: "Meditation",
                    active: 1,
                  }
                ]
              };
              this.nativeStorage.setItem("measurement_keys", initial_measurement_keys)
            }
          ).then(e =>{
          //get storage data
          /*
            if no storage data, initialize day data with keys
              init
            if storage data exists and local data exists, assign storage to mirror local data
              user modified locally
            if storage data exists and no local data exists, assign local data to mirror storage data
              user opened app after it had been closed
          */
          console.log("getting storage data")
          this.nativeStorage.getItem(this.today_formatted+'_data')
            .then(
              data => {
                console.log("storage data for today exists");
                console.log("today's data: ", data);
                let localDataExists = this.localDataExists();
                console.log("local data exists: ", localDataExists);
                if(localDataExists == true){
                  // assign storage to mirror local data
                  console.log("setting storage data to mirror local data")
                  this.setStorageData({subjectives:this.subjectives, intake: this.intake});
                }
                else if(localDataExists == false){
                  // assign local data to mirror storage
                  console.log("assigning local data to mirror storage data");
                  this.getData();
                }
              },
              error => {
                console.log("storage data for today does not exist")
                // no storage data, initialize day and storage data
                this.initializeDayData();
              }
            );
        });
      }
    );
  }

  initializeDayData(){
    // get subjective keys
    // get intake keys
    // set local and storage data

    this.nativeStorage.getItem('measurement_keys')
      .then(
        data => {
          let subjectives = [];
          let intake = [];

          for(let key in data){
            if(key == "subjectives"){
              // handle subjectives
              for(var i=0; i < data[key].length; i++){
                if(data[key][i]['active'] == 1){
                  subjectives.push({
                    name: data[key][i]['name'],
                    active: 1,
                    value: null
                  })
                }
              }
            }
            else if(key == "intake"){
              //handle intakes
              for(var i=0; i < data[key].length; i++){
                if(data[key][i]['active'] == 1){
                  intake.push({
                    name: data[key][i]['name'],
                    active: 1,
                    value: null
                  })
                }
              }
            }

            // assign local data
            this.subjectives = subjectives;
            this.intake = intake;
            console.log("local data assigned");
            console.log("local subjective: ", this.subjectives);
            console.log("local intake: ", this.intake);
            // assign storage data
            this.setStorageData({subjectives:this.subjectives, intake: this.intake});
          }
        },
        error => {console.log("error");console.error(error)}
      );
  }

  localDataExists(){
    console.log("local subjectives: ", this.subjectives == []);
    console.log("local intake: ", this.intake == []);
    if(this.subjectives.length == 0){
      if(this.intake.length == 0){
        return false;
      }
    }
    return true;
  }

  setStorageData(data){
    this.nativeStorage.setItem(this.today_formatted+"_data", data)
      .then(
        () => console.log('Stored item!'),
        error => console.error('Error storing item', error)
      );
  }

  getData() {
    this.nativeStorage.getItem(this.today_formatted+'_data')
      .then(
        data => {
          console.log("my data: ");
          this.storageDataHandler(data);
          console.log(data)},
        error => {console.log("error");console.error(error)}
      );

    let keys = this.nativeStorage.keys();
    console.log("keys: ", keys);
  }

  storageDataHandler(data){
    console.log("storage data handler data: ", data);
    for(let key in data){
      if(key == "subjectives"){
        // handle subjectives
        console.log("SUBJECTIVES: ", data[key])
        this.subjectives = data[key];
      }
      else if(key == "intake"){
        //handle intakes
        console.log("INTAKES: ", data[key])
        this.intake = data[key];
      }
    }
  }

  displayValue(listItem) {
    if(listItem.value){
      return ": " + listItem.value + "/10";
    }
    else{
      return ""
    }
  }

  openItem(subjectiveItem) {
    this.navCtrl.push('SubjectiveInput', {
      subjectiveInput: subjectiveItem
    });
  }

  /**
   * Navigate to the detail page for this item.
   */
  openMeasurementEditModal(subjective) {
    this.navCtrl.push('SubjectiveMeasures', {
      subjective: subjective
    });
  }

  getWeekday() {
    let d = new Date();
    let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return weekday[d.getDay()];
  }

  formatDate(date) {
    return parseInt(date.getFullYear() + '' + ('0' + (date.getMonth()+1)).slice(-2) + '' + ('0' + date.getDate()).slice(-2));
  }
}
