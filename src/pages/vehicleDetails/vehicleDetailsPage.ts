import {Component} from '@angular/core';
import {NavController, NavParams, LoadingController, AlertController, ViewController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {OdometerValidator} from  '../../validators/validators';

import {VehicleApi, UserApi, VehicleInfo} from '../../services/services';
import {MaintenancePage, AlertsPage} from '../pages';
import {VehicleSchema, AddNewVehicleSchema, UpdateVehicleSchema} from'../../schemas/schemas';
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

  currentVehicle;


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

    this.addVehicle = this.navParams.data.newVehicle;

    this.addVehicle ? this.vehicleForm.enable() : this.vehicleForm.disable();

    if(this.vehicleApi.currentVehicle && !this.addVehicle){
      this.addVehicle = false;
      this.currentVehicle = this.vehicleApi.currentVehicle;
      this.vehicleForm.disable();
      this.preloadForm(this.vehicleApi.currentVehicle);
    } else {
      this.addVehicle = true;
      this.formEnabled = true;
    }

    console.log(this.currentVehicle);

  }// constructor

  preloadForm(vehicle):void{
      this.vehicleForm.controls.make.setValue(vehicle.make);
      this.vehicleForm.controls.model.setValue(vehicle.model);
      this.vehicleForm.controls.year.setValue(vehicle.year);
      this.vehicleForm.controls.odometer.setValue(vehicle.odometer);
      this.vehicleForm.controls.vehicleName.setValue(vehicle.name);
  }

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


    if(this.addVehicle){
      let fullVehicleSchema = new AddNewVehicleSchema({params: this.vehicleForm.controls, dateUpdated: date, dateInit: date, odometer: parsedOdometer});
      this.vehicleApi.createNewVehicle(fullVehicleSchema).then(key => {
        this.vehicleApi.setCurrentVehicle(key);  // set the new vehicle to the current
        this.userApi.addNewVehicle(key, basicSchema).then(e => console.log("success: ", e)).catch(err => console.log(err));
        this.userApi.setCurrentVehicle(key).catch(err => console.error(err)); // handle error
        this.modalDismiss(); // dismiss the modal
        this.resetForm(); // clear out the form

      }).catch(err => console.log("error: ", err));
    } else {
      let fullVehicleSchema = new UpdateVehicleSchema({params: this.vehicleForm.controls, dateUpdated: date, odometer: parsedOdometer});
      this.vehicleApi.updateVehicleDetails(this.currentVehicle.$key, fullVehicleSchema).then(key => {
        //this.vehicleApi.setCurrentVehicle(key);  // set the new vehicle to the current
        this.userApi.updateVehicle(this.currentVehicle.$key, basicSchema);
        //this.userApi.setCurrentVehicle(key).catch(err => console.error(err)); // handle error
        this.modalDismiss(); // dismiss the modal
        this.resetForm(); // clear out the form

      }).catch(err => console.log("error: ", err));
    }



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
            this.vehicleApi.deleteVehicle(this.currentVehicle.$key);
            this.userApi.deleteVehicle(this.currentVehicle.$key);
            this.userApi.setCurrentVehicle('');
            this.modalDismiss();
            this.resetForm();
            console.log("deleted vehicle, need to add ID");
          }
        }

        ]
    });

    deleteAlert.present();
  }

}

