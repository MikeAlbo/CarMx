import {Component} from '@angular/core';
import {NavController, NavParams, LoadingController, AlertController, ModalController} from 'ionic-angular';

import {AddFuelModal} from '../pages';

import {IntValidator} from  '../../validators/validators';

import {FuelService} from '../../services/services';

@Component({
  selector: 'fuel-page',
  templateUrl: 'fuelPage.html'
})

export class FuelPage {

 newTrip: Object = {odometer: "123", fuel: "12"};


  fuelLog: any;

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private loadingCtrl: LoadingController,
              private fuelService: FuelService,
              private alertCtrl: AlertController,
              private modalCtrl: ModalController ){

    this.fuelLog = this.fuelService.fuelLog;
  }

  // resetNewTrip(){
  //   this.newTrip. = "";
  //   this.newTrip.odometer = "";
  // }

  addNewTrip(){
    if(this.newTrip){
      this.fuelService.addTripToFuelLog(this.newTrip);
      console.log(this.fuelLog);
      //this.resetNewTrip();
    }
  }

  showAddFuelPopup(){
    let addFuelModal = this.modalCtrl.create(AddFuelModal);
    addFuelModal.present();
  }


}
