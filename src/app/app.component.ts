import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {LandingPage, HomePage } from '../pages/pages';
import {AngularFireAuth} from 'angularfire2/auth';
/*import {AuthApi} from '../services/services';
import {HomePage} from "../pages/home/home";*/

@Component({
  templateUrl: 'app.html'
})
export class MyApp {



  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, authApi: AngularFireAuth) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      authApi.authState.subscribe((user)=>{
        if(user){
          this.rootPage = HomePage;
        } else {
          this.rootPage = LandingPage;
        }
      })
    });
  }
}

