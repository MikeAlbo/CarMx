import {Component} from '@angular/core';
import {NavController, NavParams, LoadingController} from 'ionic-angular';

@Component({
  selector: 'settings-page',
  templateUrl: 'settingsPage.html'
})

export class SettingsPage {

  constructor(private nacCtrl: NavController,
              private navParams: NavParams,
              private loadingCtrl: LoadingController){}


}