import {Component, ViewChild} from '@angular/core';
import {NavController, Slides, ModalController, AlertController} from 'ionic-angular';
// import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import {AuthModal} from '../pages';
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

  showModal(){
    let authModal = this.modalCtrl.create(AuthModal);
    authModal.present();
  }

  loginViaEmail(){
    //this.authApi.login("password", this.userCredentials.email, this.userCredentials.password);
    this.AfAuth.auth.signInWithEmailAndPassword(this.userCredentials.email, this.userCredentials.password)
      .catch((err)=>{console.log(err)}); // handle err
}

  loginViaGoogle(){
    // this.authApi.login("google", null, null);
    this.AfAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
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
