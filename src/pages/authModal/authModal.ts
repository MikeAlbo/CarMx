import {Component, ViewChild} from '@angular/core';
import {NavController, Slides, ViewController, ModalController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {AuthApi} from '../../services/services';

import {EmailValidator, PasswordValidator} from '../../validators/validators';
import {LoginModal, SettingsPage, HomePage} from '../pages';


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
              private authApi: AuthApi,
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
    this.authApi.authViaGoogle().then(()=> this.dismissModal()).catch(err => console.log(err));
  }

  registeruser(){
    this.submitAttempt = true;

    if(this.registerForm.valid){
      this.authApi.registerViaEmail(this.registerForm.controls.email.value, this.registerForm.controls.password.value).then(()=>{
        this.dismissModal();
        this.onSuccessSubmission();
      }).catch((err)=> {
        console.log(err);
      })
    } else {
      console.log("there seems to be an error with the form.");
    }
  }




}
