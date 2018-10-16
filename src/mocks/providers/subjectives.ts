import { Injectable } from '@angular/core';

import { Subjective } from '../../models/subjective';

@Injectable()
export class Subjectives {
  subjectives: Subjective = new Subjective({
    items: [
      {
        name: "Mood",
        profilePic: "assets/img/speakers/bear.jpg",
        about: "Burt is a Bear.",
        active: true
      },
      {
        name: "Sleep",
        profilePic: "assets/img/speakers/bear.jpg",
        about: "Burt is a Bear.",
        active: true
      },
      {
        name: "Motivation",
        profilePic: "assets/img/speakers/bear.jpg",
        about: "Burt is a Bear.",
        active: true
      },
      {
        name: "Energy",
        profilePic: "assets/img/speakers/bear.jpg",
        about: "Burt is a Bear.",
        active: true
      }
    ]
  });

  defaultSubjective: any = {
    "name": "Burt Bear",
    "profilePic": "assets/img/speakers/bear.jpg",
    "about": "Burt is a Bear.",
    "active": true
  };

}
