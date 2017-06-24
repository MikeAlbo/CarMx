import {Component} from '@angular/core';
import {NavController, NavParams, LoadingController, AlertController, ModalController} from 'ionic-angular';

import {AddFuelModal} from '../pages';

import {IntValidator} from  '../../validators/validators';

import {VehicleApi} from '../../services/services';

@Component({
  selector: 'fuel-page',
  templateUrl: 'fuelPage.html'
})

export class FuelPage {

  fuelLog: any;

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private loadingCtrl: LoadingController,
              private vehicleApi: VehicleApi,
              private alertCtrl: AlertController,
              private modalCtrl: ModalController ){

  }

  showAddFuelPopup(){
    let addFuelModal = this.modalCtrl.create(AddFuelModal);
    addFuelModal.present();
  }


}
