import { Component } from '@angular/core';
import { NavController, reorderArray, ModalController, FabContainer} from 'ionic-angular';

import {DataService, FuelService, UserApi} from '../../services/services';
import {AddFuelModal, AlertsPage, MaintenancePage} from '../pages';
import {SettingsPage} from "../settings/settingsPage";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  otherData;
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
              public dataApi: DataService,
              private modalCtrl: ModalController,
              private fuelApi: FuelService,
              private userApi: UserApi) {

    this.otherData = this.fuelApi.fakeData;

  }

  reorderItems(indexes) {
    this.data = reorderArray(this.data, indexes);
  }

  reorder(){
    this.showReorder = !this.showReorder;
    this.navButton = this.navButton === "Edit" ? "Done" : "Edit";
  }

  showAddFuelModal(){
    let addFuelModal = this.modalCtrl.create(AddFuelModal, this.otherData);
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


  showSettingsPage() {
    //this.navCtrl.push(SettingsPage, {newUser: true});
    }
}

