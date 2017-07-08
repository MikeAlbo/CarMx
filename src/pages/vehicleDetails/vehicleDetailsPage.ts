import {Component} from '@angular/core';
import {NavController, NavParams, LoadingController, AlertController, ViewController, Alert} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {OdometerValidator} from  '../../validators/validators';

import {VehicleApi, UserApi, VehicleInfo} from '../../services/services';
import {MaintenancePage, AlertsPage, HomePage} from '../pages';
import {VehicleSchema, DetailedVehicleSchema} from'../../schemas/schemas';
//import * as firebase from 'firebase/app';

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
    private viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    private userApi: UserApi,
    private vehicleApi: VehicleApi,
    public vehicleInfo: VehicleInfo
  ){
    this.vehicleForm = this.formBuilder.group({
      make: ['', Validators.compose([Validators.required])],
      model: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])],
      year: ['', Validators.compose([Validators.required])],
      odometer: ['', Validators.compose([Validators.required, Validators.maxLength(7), OdometerValidator.isCorrectFormat])],
      vehicleName: [''],
      details: ['']
    });

    this.addVehicle ? this.vehicleForm.enable() : this.vehicleForm.disable();


  }// constructor

  //close modal
  modalDismiss(){
      this.viewCtrl.dismiss();
  }

  // navigate to page
  navigateTo(page){
    this.navCtrl.popToRoot();
    switch (page){
      case 'mx' : this.navCtrl.push(MaintenancePage); break; // need to pass vehicle data
      case 'alert' : this.navCtrl.push(AlertsPage); break;
      case 'settings' : this.viewCtrl.dismiss(); break;
      default: return null;
    }
  }

  // reset the form
  resetForm(){
      this.vehicleForm.reset();
  }

  // enable / disable form
  enableForm(){
    this.formEnabled ? this.vehicleForm.disable() : this.vehicleForm.enable();
    this.formEnabled = !this.formEnabled;
  }


  submitVehicleForm(){
    let date = Date.now();
    let parsedOdometer = this.vehicleInfo.odometerParse(this.vehicleForm.controls.odometer.value);
    let basicSchema = new VehicleSchema(this.vehicleForm.controls);
    let fullVehicleSchema = new DetailedVehicleSchema({params: this.vehicleForm.controls, date: date, odometer: parsedOdometer});

    this.vehicleApi.createNewVehicle(fullVehicleSchema).then(key => {
      this.vehicleApi.setCurrentVehicle(key);  // set the new vehicle to the current
      this.userApi.addNewVehicle(key, basicSchema).then(e => console.log("success: ", e)).catch(err => console.log(err));
      this.userApi.setCurrentVehicle(key).catch(err => console.error(err)); // handle error
      this.modalDismiss(); // dismiss the modal
      this.resetForm(); // clear out the form

    }).catch(err => console.log("error: ", err));

  }

  deleteVehicle(){
    let deleteAlert  = this.alertCtrl.create({
      title: 'Remove this Vehicle',
      message: 'Do you wish to permanently remove this vehicle and all associated data?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',

        },
        {
          text: 'Remove',
          handler: ()=>{
            //this.vehicleApi.deleteVehicle()
            console.log("deleted vehicle, need to add ID");
          }
        }

        ]
    });

    deleteAlert.present();
  }

}

