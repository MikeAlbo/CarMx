import {Component, ViewChild} from '@angular/core';
import {NavController, Slides, ModalController, AlertController} from 'ionic-angular';
// import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import {AuthModal, LoginModal} from '../pages';
import {AuthApi} from '../../services/services';

@Component({
  selector: 'page-landing',
  templateUrl: 'landingPage.html'
})

export class LandingPage {

  @ViewChild(Slides) slides: Slides;

userCredentials = {email:null, password: null};

  constructor(private navCtrl: NavController,
              private modalCtrl: ModalController,
              private authApi: AuthApi,
              private alertCtrl: AlertController,
              private AfAuth: AngularFireAuth){

  }

  changeSlide(){
    this.slides.getActiveIndex() === 0 ? this.slides.slideNext() : this.slides.slidePrev();
  }

  showRegisterModal(){
    let authModal = this.modalCtrl.create(AuthModal);
    authModal.present();
  }

  showLoginModal(){
    let loginModal = this.modalCtrl.create(LoginModal);
    loginModal.present();
  }

  loginViaAnonymously(){
    let alert = this.alertCtrl.create({
      title: 'Welcome!',
      subTitle: 'Thanks for trying out Car MX, in order to save your data you must register.',
      buttons: ['ok']
    });

    alert.present();
    // this.authApi.loginAnonymously();
    firebase.auth().signInAnonymously();
  }




}
