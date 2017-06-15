import {Component, ViewChild} from '@angular/core';
import {NavController, Slides, ViewController, ModalController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import {EmailValidator, PasswordValidator} from '../../validators/validators';
import {LoginModal} from '../pages';

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
              public formBuilder: FormBuilder,
              private modalCtrl: ModalController){

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

  loadLoginModal(){
    this.viewCtrl.dismiss().then(()=>{
      let loginModal = this.modalCtrl.create(LoginModal);
      loginModal.present();
    })
  }

  onSuccessSubmission(){
    this.registerForm.reset(); // resets the form values
  }

  loginViaGoogle(){
    this.AfAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((user)=> {
      this.dismissModal();
    } );
  }

  registeruser(){
    this.submitAttempt = true;

    if(this.registerForm.valid){
      this.AfAuth.auth.createUserWithEmailAndPassword(this.registerForm.controls.email.value, this.registerForm.controls.password.value)
        .then((user)=> {
          console.log(user); // !! remove before production !!
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
