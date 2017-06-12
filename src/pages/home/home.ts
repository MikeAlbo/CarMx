import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {AuthApi} from '../../services/services';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private authApi: AuthApi) {

  }

  logoutCurrentUser(){
    this.authApi.logout();
  }

}
