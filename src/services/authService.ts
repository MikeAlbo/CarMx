import {Injectable} from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()

export class AuthApi {

  // public authenticatedUser = {
  //   email: null,
  //   displayName: null,
  //   photoURL: null,
  //   providers: []
  // };

  public  authenticatedUser = {
    email: null, photoURL: null, displayName: null, providers: null
  };

  constructor(private authService: AngularFireAuth){
      this.authService.authState.subscribe((user)=>{
        if(user){
          this.authenticatedUser.email = user.email;
          this.authenticatedUser.photoURL = user.photoURL;
          this.authenticatedUser.displayName = user.displayName;
          this.authenticatedUser.providers = user.providerData;
          console.log("authenticated user from service layer: ", this.authenticatedUser); //remove
        }
      });
  }// constructor

  // login via email and password
  loginViaEmail(email, password){
    return new Promise((resolve, reject)=>{
      this.authService.auth.signInWithEmailAndPassword(email, password).then((user)=>{
        this.authenticatedUser = user;
        resolve(true);
      }).catch(err => reject(err));
    });
  }

  // register via email and password

  registerViaEmail(email: string, password: string){
    return new Promise((resolve, reject)=>{
      this.authService.auth.createUserWithEmailAndPassword(email, password).then((user)=>{
        this.authenticatedUser = user;
        resolve(true);
      }).catch(err => reject(err));
    });
  }

  // authenticate via google
  authViaGoogle(){
    return new Promise((resolve, reject)=>{
      this.authService.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((user)=>{
        this.authenticatedUser = user;
        resolve(true);
      }).catch(err => reject(err));
    });
  }

  // link provider to current user
  linkAccountWithProvider(provider: string){
    return new Promise((resolve, reject)=>{
      let providerToLink;

      switch (provider){
        case "google" : providerToLink = new firebase.auth.GoogleAuthProvider(); break;
        default: reject("bad provider given");
      }

      this.authService.auth.currentUser.linkWithPopup(providerToLink).then((user)=>{
        this.authenticatedUser = user;
        resolve(true);
      }).catch(err => reject(err));
    })
  }

  // add email and password to a provider created account
  addEmailAndPassToProviderAccount(email: string, password: string){
    return new Promise((resolve, reject)=>{
      let credential = firebase.auth.EmailAuthProvider.credential(email, password);

      this.authService.auth.currentUser.linkWithCredential(credential).then((user)=>{
        this.authenticatedUser = user;
        resolve(true);
      }).catch(err => reject(err));
    });
  }

  // create an anonymous account
  createAnonymousAccount(){
    return new Promise((resolve, reject)=>{
      this.authService.auth.signInAnonymously().then(()=> resolve(true)).catch(err => reject(err));
    });
  }

  // reAuthenticate user
  reAuthUser(email, password, provider){
    return new Promise((resolve, reject)=>{
      let currentUser, credentials;

      if(email && password){
        currentUser = this.authService.auth.currentUser;
        credentials = firebase.auth.EmailAuthProvider.credential(email, password);
      } else if (provider){
        currentUser = this.authService.auth.currentUser;
        switch (provider){
          case "google" : credentials = new firebase.auth.GoogleAuthProvider(); break;
          default: reject("bad provider given");
        }
      } else {
        reject("provide either an Email/ Password Combination or a Provider.");
      }

      currentUser.reauthenticate(credentials).then(()=> resolve(true)).catch(err => reject(err));
    });
  }

  // update displayName
  updateProfile(displayName: string, photoURL: string){
    return new Promise((resolve, reject)=>{
      let currentUser = this.authService.auth.currentUser;
      currentUser.updateProfile({displayName, photoURL}).then(()=> resolve(true)).catch(err => reject(err));
    });
  }

  // update current user email
  updateEmail(newEmail: string){
    return new Promise((resolve, reject)=>{
      let currentUser = this.authService.auth.currentUser;
      currentUser.updateEmail(newEmail).then(()=>resolve(true)).catch(err => reject(err));
    });
  }

  // update current user password
  updatePassword(newPassword: string){
    return new Promise((resolve, reject)=>{
      let currentUser = this.authService.auth.currentUser;
      currentUser.updatePassword(newPassword).then(()=>resolve(true)).catch(err => reject(err));
    });
  }

  // delete user account
  deleteUser(){
    return new Promise((resolve, reject)=>{
      let currentUser = this.authService.auth.currentUser;
      currentUser.delete().then(()=>resolve(true)).catch(err => reject(err));
    });
  }

  // get current user
  getCurrentUser(){
    return this.authenticatedUser;
  }


  // send a user verification email

  // send a password reset email

  //unlink an account from an auth provider

  // deal with phone number authentication



}
