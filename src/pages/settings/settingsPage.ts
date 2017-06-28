import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, LoadingController, Slides, ModalController} from 'ionic-angular';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

import {UserApi, VehicleApi, VehicleInfo, AuthApi} from '../../services/services';
import {AngularFireAuth} from "angularfire2/auth";
import {EmailValidator} from '../../validators/validators';
import {VehicleDetailsPage} from '../pages';


@Component({
  selector: 'settings-page',
  templateUrl: 'settingsPage.html'
})

export class SettingsPage {


  @ViewChild(Slides) slides: Slides;


  newUser: boolean = false;
  emailDisabled: boolean = true;
  emailPlaceholder = "boom";

  userVehicles;
  currentUser;
  providers = {
    google: false,
    facebook: false,
    email: false
  };

  settingForm : FormGroup;
  resetPasswordForm: FormGroup;

  constructor(private nacCtrl: NavController,
              private navParams: NavParams,
              private loadingCtrl: LoadingController,
              private modalCtrl: ModalController,
              private formBuilder: FormBuilder,
              public userApi: UserApi,
              private vehicleApi: VehicleApi,
              public vehicleInfo: VehicleInfo,
              private authApi: AuthApi,
              private fireAuth: AngularFireAuth){

    this.fireAuth.authState.subscribe((user)=>{
      this.currentUser = user;

      user.providerData.forEach((provider)=>{
        if(provider.providerId == 'google.com') {this.providers.google = true}
        else if (provider.providerId == 'facebook.com') {this.providers.facebook = true}
        else if (provider.providerId == 'password') {this.providers.email = true}

      });
    });

    this.settingForm = formBuilder.group({
      displayName: ['', Validators.compose([Validators.minLength(6)])],
      email: ['', Validators.compose([EmailValidator.isValid])]
    });

    this.resetPasswordForm = formBuilder.group({
      oldPassword: [''],
      newPassword: [''],
      confirmPassword: ['']
    });

    //this.emailPlaceholder = navParams.data.email;

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

  showVehicleDetails(vehicle){
    if(!vehicle){
      let modal = this.modalCtrl.create(VehicleDetailsPage);
      modal.present();
    }
  }


}
