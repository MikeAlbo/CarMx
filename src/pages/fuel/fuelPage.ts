import {Component} from '@angular/core';
import {NavController, NavParams, LoadingController} from 'ionic-angular';

import {FuelService} from '../../services/services';

@Component({
  selector: 'fuel-page',
  templateUrl: 'fuelPage.html'
})

export class FuelPage {

 newTrip: Object = {odometer: "123", fuel: "12"};


  fuelLog: any;

  constructor(private nacCtrl: NavController,
              private navParams: NavParams,
              private loadingCtrl: LoadingController,
              private fuelService: FuelService){

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


}
