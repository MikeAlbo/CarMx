import {Component} from '@angular/core';
import {NavController,ViewController, ModalController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import {EmailValidator, PasswordValidator} from '../../validators/validators';
import {AuthModal} from '../pages';

@Component({
  selector: 'login-modal',
  templateUrl: 'loginModal.html'
})

export class LoginModal {

  loginForm: FormGroup;
  submitAttempt: boolean = false;
  errorMessage: string = '';

  constructor(private navCtrl: NavController,
              private viewCtrl: ViewController,
              private formBuilder: FormBuilder,
              private AfAuth: AngularFireAuth,
              private modalCtrl: ModalController){

    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([PasswordValidator.correctFormat, Validators.required])]
    })

} // constructor

  dismissModal(){
    this.viewCtrl.dismiss();
  }

  successfulLogin(){
    this.dismissModal();
    this.loginForm.reset();
  }

  loginViaEmail(){
    this.submitAttempt = true;
    if(this.loginForm.valid){
      this.AfAuth.auth.signInWithEmailAndPassword(this.loginForm.controls.email.value, this.loginForm.controls.password.value).then((user)=> {
        this.successfulLogin();
        console.log(user); // !! remove before production!!!
      }).catch((err)=>{
        console.log(`Error name: ${err.name}, Error msg: ${err.message}.`);
        this.errorMessage = err.message;
      });
    }
  }

  loginViaGoogle(){
    this.AfAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((user)=> {
      this.dismissModal();
    } );
  }

  loadRegisterModal(){
    this.viewCtrl.dismiss().then(()=>{
      let registerModal = this.modalCtrl.create(AuthModal);
      registerModal.present();
    });
  }


}
