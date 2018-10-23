import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, Checkbox } from 'ionic-angular';
import {Item} from "../../models/item";
import {Subjective} from "../../models/subjective";
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

@IonicPage()
@Component({
  selector: 'page-cards',
  templateUrl: 'tracking.html'
})
export class TrackingPage {
  cardItems: any[];
  subjectives: any[];
  active_subjectives: any[];
  intake: any[];
  dayOfWeek = this.getWeekday();

  expenses: any = [];
  totalIncome = 0;
  totalExpense = 0;
  balance = 0;

  constructor(public navCtrl: NavController, private sqlite: SQLite, private toast: Toast, private ngZone: NgZone) {
    this.cardItems = [
      {
        user: {
          avatar: 'assets/img/marty-avatar.png',
          name: 'Marty McFly'
        },
        date: 'November 5, 1955',
        image: 'assets/img/advance-card-bttf.png',
        content: 'Wait a minute. Wait a minute, Doc. Uhhh... Are you telling me that you built a time machine... out of a DeLorean?! Whoa. This is heavy.',
        intake: [
          {
            name: "Burt Bear",
            profilePic: "assets/img/speakers/bear.jpg",
            about: "Burt is a Bear.",
            note: "sdfsdfsdf"
          },
          {
            name: "Burt Bear",
            profilePic: "assets/img/speakers/bear.jpg",
            about: "Burt is a Bear.",
            note: "sdfsdfsdf"
          }
        ]
      }
    ];


    // this.subjectives = new Subjective({
    //   // items: [
    //     // {
    //     //   name: "Mood",
    //     //   profilePic: "assets/img/speakers/bear.jpg",
    //     //   about: "Burt is a Bear.",
    //     //   active: true,
    //     //   value: null
    //     // },
    //     // {
    //     //   name: "Sleep",
    //     //   profilePic: "assets/img/speakers/bear.jpg",
    //     //   about: "Burt is a Bear.",
    //     //   active: true,
    //     //   value: null
    //     // },
    //     // {
    //     //   name: "Motivation",
    //     //   profilePic: "assets/img/speakers/bear.jpg",
    //     //   about: "Burt is a Bear.",
    //     //   active: true,
    //     //   value: null
    //     // },
    //     // {
    //     //   name: "Energy",
    //     //   profilePic: "assets/img/speakers/bear.jpg",
    //     //   about: "Burt is a Bear.",
    //     //   active: true,
    //     //   value: null
    //     // }
    //   // ]
    // });
    this.subjectives = [
      {
        name: "Mood",
        profilePic: "assets/img/speakers/bear.jpg",
        about: "Burt is a Bear.",
        active: 1,
        value: null
      }
    ];

    this.intake = [
      // {
      //   name: "Supplements",
      //   profilePic: "assets/img/speakers/bear.jpg",
      //   about: "Burt is a Bear.",
      // },
      // {
      //   name: "Medication",
      //   profilePic: "assets/img/speakers/bear.jpg",
      //   about: "Burt is a Bear.",
      //   note: "sdfsdfsdf"
      // },
      // {
      //   name: "Food",
      //   profilePic: "assets/img/speakers/bear.jpg",
      //   about: "Burt is a Bear.",
      //   note: "sdfsdfsdf"
      // },
      // {
      //   name: "Exercise",
      //   profilePic: "assets/img/speakers/bear.jpg",
      //   about: "Burt is a Bear.",
      //   note: "sdfsdfsdf"
      // },
      // {
      //   name: "Meditation",
      //   profilePic: "assets/img/speakers/bear.jpg",
      //   about: "Burt is a Bear.",
      //   note: "sdfsdfsdf"
      // },
    ];

    this.getData();
  }

  // ionViewDidLoad() {
  //   this.getData();
  // }
  //
  // ionViewWillEnter() {
  //   this.getData();
  // }

  addMeasurements(name, type) {
    this.sqlite.create({
      name: 'tracking.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM measurements WHERE name=?',[name])
        .then(res => {
          if(res.rows.length == 0){
            db.executeSql('INSERT INTO measurements VALUES(NULL,?,?,?)',[name,1,type])
              .then(res => {
                this.toast.show("Done adding measurements4", '5000', 'center').subscribe(
                  toast => {
                    console.log("Error creating measurements table");
                  }
                );
              })
              .catch(e => {
                console.log(e);
                this.toast.show("error on adding measurement", '5000', 'center').subscribe(
                  toast => {
                    console.log("error on adding measurement");
                  }
                );
              });
          }
          this.toast.show("Received result from select: " + res.rows.length, '5000', 'center').subscribe(
            toast => {
              console.log("Error creating measurements table");
            }
          );
        })
        .catch(e => {
          console.log(e);
          this.toast.show("error on selecting for addMeasurement", '5000', 'center').subscribe(
            toast => {
              console.log("error on adding measurement");
            }
          );
        });
    }).catch(e => {
      console.log(e);
      this.toast.show("error on addMeasurement main loop", '5000', 'center').subscribe(
        toast => {
          console.log("error on addMeasurement main loop");
        }
      );
    });
  }

  hasCurrentData(rowID) {
    this.sqlite.create({
      name: 'tracking.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      let today = this.formatDate(new Date());
      // todo: improve this query, likely using count
      db.executeSql("SELECT * FROM measurements_data WHERE measurements_id=? AND date=? ORDER BY rowid DESC", [rowID, today])
        .then(res => {
         if(res.rows.length > 0){
           return 1;
         }
         else{
           return 0;
         }
        })
        .catch(e => {
          console.log(e);
          this.toast.show("error on checking if data exists", '5000', 'center').subscribe(
            toast => {
              console.log("error on checking if data exists");
            }
          );
        });
    }).catch(e => {
      console.log(e);
      this.toast.show("error on hasCurrentData main loop", '5000', 'center').subscribe(
        toast => {
          console.log("error on hasCurrentData main loop");
        }
      );
    });
  }

  getData() {
    this.sqlite.create({
      name: 'tracking.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS measurements(rowid INTEGER PRIMARY KEY, name TEXT, active INTEGER, type TEXT)', [])
        .then(res =>{
          this.addMeasurements("Mood", "subjective");
          this.addMeasurements("Sleep", "subjective");
          this.addMeasurements("Motivation", "subjective");
          this.addMeasurements("Energy", "subjective");

          this.addMeasurements("Supplements", "intake");
          this.addMeasurements("Medication", "intake");
          this.addMeasurements("Sleep", "intake");
          this.addMeasurements("Exercise", "intake");
          this.addMeasurements("Meditation", "intake");
          })
        .then(res =>{
          db.executeSql("SELECT * FROM measurements ORDER BY rowid DESC", [])
            .then(res => {
              // this.expenses = [];
              let currentItem = null;
              let currentItemDict = null;

              this.toast.show("count from select:"+res.rows.length, '5000', 'center').subscribe(
                toast => {
                  console.log("Error creating measurements table");
                }
              );
              this.subjectives = [];
              this.intake = [];
              for(var i=0; i<res.rows.length; i++) {
                currentItem = res.rows.item(i);
                if(currentItem.type == "subjective"){
                  this.toast.show("active val: " + currentItem.active, '5000', 'center').subscribe(
                    toast => {
                      console.log("Error creating measurements table");
                    }
                  );
                  currentItemDict = {name: currentItem.name, value: this.hasCurrentData(currentItem.rowid), active: currentItem.active};
                  this.ngZone.run(() => {
                    this.subjectives.push(currentItemDict)
                  });
                }
                else if(res.rows.item(i).type == "intake"){
                  currentItemDict = {name: currentItem.name, value: this.hasCurrentData(currentItem.rowid), active: currentItem.active};
                  this.ngZone.run(() => {
                    this.intake.push(currentItemDict)
                  });
                }
              }
            })
        })
      db.executeSql('CREATE TABLE IF NOT EXISTS measurement_data(rowid INTEGER PRIMARY KEY, measurements_id INTEGER, date TEXT, value INTEGER)', [])
        .then(res => console.log('Executed SQL'))
    }).catch(e => {
      console.log(e);
      this.toast.show("Error on entire first call", '5000', 'center').subscribe(
        toast => {
          console.log("Error on entire first call");
        }
      );
    });
  }

  persistItemValue(item, value){
    console.log("persistItemValue entered");
    console.log(item, value);
    item.hasValue = value;
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

  editMeasurementsCard() {

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
