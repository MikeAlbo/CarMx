import {Component} from '@angular/core';
import {NavController, NavParams, LoadingController} from 'ionic-angular';

@Component({
  selector: 'alerts-page',
  templateUrl: 'alertsPage.html'
})

export class AlertsPage {

  constructor(private nacCtrl: NavController,
              private navParams: NavParams,
              private loadingCtrl: LoadingController){}


}
