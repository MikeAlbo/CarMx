import {Component} from '@angular/core';
import {NavController, NavParams, LoadingController, AlertController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {IntValidator} from  '../../validators/validators';

import {VehicleApi, UserApi, VehicleInfo} from '../../services/services';

@Component({
  selector: 'vehicle-details-page',
  templateUrl: 'vehicleDetailsPage.html'
})

export class VehicleDetailsPage{

  addVehicle: boolean = false;
  vehiclePhoto: boolean = false;
  formEnabled: boolean = false;

  vehicleForm: FormGroup;


  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private userApi: UserApi,
    private vehicleApi: VehicleApi,
    public vehicleInfo: VehicleInfo
  ){
    this.vehicleForm = this.formBuilder.group({
      make: ['', Validators.compose([Validators.required])],
      model: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])],
      year: ['', Validators.compose([Validators.required])],
      odometer: ['', Validators.compose([Validators.required, Validators.maxLength(7)])],
      vehicleName: [''],
      details: ['']
    });

    this.addVehicle ? this.vehicleForm.enable() : this.vehicleForm.disable();

  }


  resetForm(){
      this.vehicleForm.reset();
  }

  enableForm(){
    this.formEnabled ? this.vehicleForm.disable() : this.vehicleForm.enable();
    this.formEnabled = !this.formEnabled;
  }


  submitVehicleForm(){
    // this.vehicleInfo.odometerParse(this.vehicleForm.controls.odometer.value).then(value => console.log(value)).catch(err => console.log(err));

    console.log(this.vehicleForm);
  }

}
