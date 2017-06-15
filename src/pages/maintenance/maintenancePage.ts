import {Component} from '@angular/core';
import {NavController, NavParams, LoadingController} from 'ionic-angular';

@Component({
  selector: 'maintenance-page',
  templateUrl: 'maintenancePage.html'
})

export class MaintenancePage {

  constructor(private nacCtrl: NavController,
              private navParams: NavParams,
              private loadingCtrl: LoadingController){}


}
