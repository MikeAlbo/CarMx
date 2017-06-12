import {Component, ViewChild} from '@angular/core';
import {NavController, Slides, ViewController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
//import * as firebase from 'firebase/app';

import {EmailValidator, PasswordValidator} from '../../validators/validators';

@Component({
  selector: 'auth-modal',
  templateUrl: 'authModal.html'
})

export class AuthModal {

  @ViewChild(Slides) slides: Slides;

  registerForm: FormGroup;
  submitAttempt: boolean = false;
  errorMessage: string = '';


  constructor(private navCtrl: NavController,
              private viewCtrl: ViewController,
              private AfAuth: AngularFireAuth,
              public formBuilder: FormBuilder){

    this.registerForm = formBuilder.group({
      email: ['', Validators.compose([EmailValidator.isValid, Validators.required])],
      password: ['', Validators.compose([Validators.required, PasswordValidator.correctFormat])],
      confirmPassword: ['', Validators.compose([Validators.required])]
    },{
      validator: PasswordValidator.passwordMatch
    });

  }

  changeSlide(){
    this.slides.getActiveIndex() === 0 ? this.slides.slideNext() : this.slides.slidePrev();
  }

  dismissModal(){
    this.viewCtrl.dismiss();
  }

  onSuccessSubmission(){
    this.registerForm.reset(); // resets the form values
  }

  registeruser(){
    this.submitAttempt = true;

    if(this.registerForm.valid){
      this.AfAuth.auth.createUserWithEmailAndPassword(this.registerForm.controls.email.value, this.registerForm.controls.password.value)
        .then((user)=> {
          console.log(user);
          this.dismissModal();
          this.onSuccessSubmission();
        })
        .catch((err)=> {
          console.log(`error name: ${err.name}, error message: ${err.message}.`);
          this.errorMessage = err.message;
        }); // handle err
    } else {
      console.log("there seems to be an error with the form.");
    }
  }




}
