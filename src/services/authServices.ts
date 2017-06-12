/*import { Observable } from 'rxjs/Observable';*/
import {Injectable} from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()

export class AuthApi{


  constructor(public fireAuth: AngularFireAuth){}

  getAuthState(){
    return this.fireAuth.authState.subscribe((user)=>{
      return user;
    });
  }

  login(mode, email, password){
      switch(mode) {
        case "password" : loginPassword(email, password);  break;
        case "google" : signInGoogle(this.fireAuth);  break;
      }
  }

  logout(){
    this.fireAuth.auth.signOut();
  }

  register(mode, email, password){
    switch(mode) {
      case "password" : registerPassword(email, password);  break;
      case "google" : signInGoogle(this.fireAuth);  break;
    }
  }

  loginAnonymously(){
    firebase.auth().signInAnonymously();
  }
}

function loginPassword(email, password){
  firebase.auth().signInWithEmailAndPassword(email, password).catch((err)=>{
    console.log(err);
  });
  console.log(`email: ${email} and Password: ${password}`);
}

function registerPassword(email, password){
  firebase.auth().createUserWithEmailAndPassword(email, password).catch((err)=>{
    console.log(err);
  });
}

function signInGoogle(af){
  af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
}
