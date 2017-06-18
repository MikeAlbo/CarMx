import { Component } from '@angular/core';
import { NavController, reorderArray, ModalController, FabContainer} from 'ionic-angular';

import {AuthApi} from '../../services/services';
import {AddFuelModal, AlertsPage, MaintenancePage} from '../pages';

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

  data = this.testData;
  showReorder: boolean = false;
  navButton: string = "Edit";


  constructor(public navCtrl: NavController,
              private authApi: AuthApi,
              private modalCtrl: ModalController) {

  }

  reorderItems(indexes) {
    this.data = reorderArray(this.data, indexes);
  }

  reorder(){
    this.showReorder = !this.showReorder;
    this.navButton = this.navButton === "Edit" ? "Done" : "Edit";
  }

  showAddFuelModal(){
    let addFuelModal = this.modalCtrl.create(AddFuelModal);
    addFuelModal.present();
  }

  navToPage(page, fab: FabContainer){
    switch (page){
      case 'alert' : this.navCtrl.push(AlertsPage); break;
      case 'mx' : this.navCtrl.push(MaintenancePage); break;
      default: this.navCtrl.push(HomePage);
    }

    fab.close();


  }

}

