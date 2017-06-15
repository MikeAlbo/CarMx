import {Component} from '@angular/core';
import {NavController, NavParams, LoadingController} from 'ionic-angular';

@Component({
  selector: 'serviceProvider-page',
  templateUrl: 'serviceProviderPage.html'
})

export class ServiceProviderPage {

  constructor(private nacCtrl: NavController,
              private navParams: NavParams,
              private loadingCtrl: LoadingController){}


}
