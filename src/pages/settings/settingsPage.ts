import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, LoadingController, Slides} from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';

import {UserApi, VehicleApi, VehicleInfo} from '../../services/services';


@Component({
  selector: 'settings-page',
  templateUrl: 'settingsPage.html'
})

export class SettingsPage {


  @ViewChild(Slides) slides: Slides;


  newUser: boolean = false;
  emailDisabled: boolean = true;

  userVehicles;

  settingForm : FormGroup;

  constructor(private nacCtrl: NavController,
              private navParams: NavParams,
              private loadingCtrl: LoadingController,
              private formBuilder: FormBuilder,
              private userApi: UserApi,
              private vehicleApi: VehicleApi,
              public vehicleInfo: VehicleInfo){

    this.settingForm = formBuilder.group({
      name: [''],
      email: ['']
    });

    //this.newUser = navParams.data.newUser;

    if(this.userApi.currentUser){
      this.emailDisabled = true;
      //this.userVehicles = this.dataApi.currentUserData['/vehicles'];
    }
  }

  submitSettingsForm(){
    this.newUser = false;
    let settings = {
      name: this.settingForm.controls.name.value,
      email: this.settingForm.controls.email.value
    };
  }

  changeSlide(){
    let currentIndex = this.slides.getActiveIndex();
    this.slides.slideTo(currentIndex == 0 ? 1 : 0);
    console.log(currentIndex);
  }

  addNewVehicle(){

  }

  submitNewVehicle(){

  }

}
