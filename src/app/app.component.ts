import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {LandingPage, HomePage, AlertsPage, ServiceProviderPage, MaintenancePage, SettingsPage, FuelPage} from '../pages/pages';
import {AngularFireAuth} from 'angularfire2/auth';
import {UserApi} from '../services/services';

import {FirebaseObjectObservable} from "angularfire2/database";



@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  //vehicles: Array<{title: string, component: any}>;

  vehicles;
  currentUserKey;
  currentUserData;

  rootPage:any;

  constructor(public platform: Platform,  public statusBar: StatusBar, public  splashScreen: SplashScreen, public authApi: AngularFireAuth, public userApi: UserApi) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      authApi.authState.subscribe((user) => {
        if (user) {
          this.rootPage = HomePage;

          this.userApi.currentUserDetails$.subscribe((userData)=>{
            if(userData){
              this.vehicles = userData.vehicles;
              this.currentUserKey = userData.$key;
            } else {
              this.vehicles = {1: {year: 'No', make: 'Vehicle', model: 'Data'}}
            }

          })

        } else {
          this.rootPage = LandingPage;
        }
      });
      
    });  };



  selectPage(page){
    switch (page) {
      case "alerts" : this.nav.push(AlertsPage); break;
      case "serviceProvider" : this.nav.push(ServiceProviderPage); break;
      case "maintenance" : this.nav.push(MaintenancePage); break;
      case "home" : this.nav.setRoot(HomePage); break;
      case "settings" : this.nav.push(SettingsPage); break;
      case "fuel" : this.nav.push(FuelPage); break;
      case "logOut" : this.authApi.auth.signOut(); break;
      default: this.nav.setRoot(HomePage); break;
    }
  }

  selectVehicle(vehicleKey){
    console.log("selected key: ", vehicleKey);
  }



} // MyApp class

