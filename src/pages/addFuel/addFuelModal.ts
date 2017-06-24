import {Component} from '@angular/core';
import {ViewController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {VehicleApi} from '../../services/services';
import {IntValidator} from '../../validators/validators';

@Component({
  selector: 'AddFuel-modal',
  templateUrl: 'addFuelModal.html'
})

export class AddFuelModal {

  addFuelForm: FormGroup;
  submitAttempt: boolean = false;
  errorMessage: string = '';

  constructor(private vehicleApi: VehicleApi,
              private viewCtrl: ViewController,
              private formBuilder: FormBuilder){

    this.addFuelForm = formBuilder.group({
      odometer: ['', Validators.compose([Validators.required, Validators.maxLength(6), IntValidator.isInt])],
      amount: ['', Validators.compose([Validators.required, Validators.maxLength(4), IntValidator.isInt])]
    });

  }

  dismissModal(){
    this.viewCtrl.dismiss();
  }
}// export
