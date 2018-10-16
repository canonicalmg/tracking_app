import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-cards',
  templateUrl: 'tracking.html'
})
export class TrackingPage {
  cardItems: any[];
  subjectives: any[];
  intake: any[];
  dayOfWeek = this.getWeekday();


  constructor(public navCtrl: NavController) {
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

    this.subjectives = [
      {
        name: "Mood",
        profilePic: "assets/img/speakers/bear.jpg",
        about: "Burt is a Bear.",
      },
      {
        name: "Sleep",
        profilePic: "assets/img/speakers/bear.jpg",
        about: "Burt is a Bear.",
        note: "sdfsdfsdf"
      },
      {
        name: "Motivation",
        profilePic: "assets/img/speakers/bear.jpg",
        about: "Burt is a Bear.",
        note: "sdfsdfsdf"
      },
      {
        name: "Energy",
        profilePic: "assets/img/speakers/bear.jpg",
        about: "Burt is a Bear.",
        note: "sdfsdfsdf"
      },
    ]
    this.intake = [
      {
        name: "Supplements",
        profilePic: "assets/img/speakers/bear.jpg",
        about: "Burt is a Bear.",
      },
      {
        name: "Medication",
        profilePic: "assets/img/speakers/bear.jpg",
        about: "Burt is a Bear.",
        note: "sdfsdfsdf"
      },
      {
        name: "Food",
        profilePic: "assets/img/speakers/bear.jpg",
        about: "Burt is a Bear.",
        note: "sdfsdfsdf"
      },
      {
        name: "Exercise",
        profilePic: "assets/img/speakers/bear.jpg",
        about: "Burt is a Bear.",
        note: "sdfsdfsdf"
      },
      {
        name: "Meditation",
        profilePic: "assets/img/speakers/bear.jpg",
        about: "Burt is a Bear.",
        note: "sdfsdfsdf"
      },
    ]

  }

  getWeekday() {
    let d = new Date();
    let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return weekday[d.getDay()];
  }
}
