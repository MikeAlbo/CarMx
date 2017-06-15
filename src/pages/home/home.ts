import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {AuthApi} from '../../services/services';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  testData = [
    {
      sectionTitle: "Gas",
      content: {
        primaryLabel: "Avg:",
        primaryValue: "24",
        units: "mpg",
        secondaryLabel: "last trip:",
        secondaryValue: "25.6",
      }
    },
    {
      sectionTitle: "Alerts",
      contents: ["Oil change needed soon", "rotate tires in 1000 miles"]
    },
    {
      sectionTitle: "MX",
      contents: [
        {mx: "oil", val: "2300"},
        {mx: "tires", val: "500"},
        {mx: "air filter", val: "1500"}
      ]
    }
  ];

  constructor(public navCtrl: NavController, private authApi: AuthApi) {

  }


}
