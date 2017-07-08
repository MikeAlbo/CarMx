import {Injectable} from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database';

import {VehicleApi} from './services'

@Injectable()

export class UserApi {

  public currentUser;
  private ref;
  public currentUserDetails;

  constructor(public authApi: AngularFireAuth, private db : AngularFireDatabase){

      authApi.authState.subscribe((user)=>{
        this.currentUser = user ? user: null;
        this.ref = `/users/${this.currentUser.uid}/`;
        db.object(`/users/${this.currentUser.uid}/`).subscribe((user) => {
          this.currentUserDetails = user;
          console.log("vehicleID: ", user);
        })
      });
  } // constructor




  // add a new user
  addNewUser(user: object){
    return new Promise((resolve, reject)=>{
      this.db.object(this.ref).update(user).then(()=>{
        resolve();
      }).catch((err)=>{
        reject(err);
      });
    });
  }

  // add user settings
  addUserSettings(settings: object){
    return new Promise((resolve, reject)=>{
      this.db.object(`${this.ref}/settings/`).set(settings).then(()=>{
        resolve();
      }).catch((err)=>{
        reject(err);
      });
    });
  }

  // update user settings
  updateUserSettings(settings: object){
    return new Promise((resolve, reject)=>{
      this.db.object(`${this.ref}/settings/`).set(settings).then(()=>{
        resolve();
      }).catch((err)=>{
        reject(err);
      });
    });
  }

  // add a new vehicle
  addNewVehicle(vehicleId: any, vehicle: object){
    return new Promise((resolve, reject)=>{
      this.db.object(`${this.ref}/vehicles/${vehicleId}`).set(vehicle).then(()=>{
        resolve(true);
      }).catch((err)=>{
        reject(err);
      });

    })
  }

  // delete a vehicle
  deleteAVehicle(vehicleKey: string){
    return new Promise((resolve, reject)=>{
      this.db.object(`${this.ref}/vehicles/${vehicleKey}`).remove().then(()=>{
        resolve(true);
      }).catch((err)=>{
        reject(err);
      });
    });
  }

  // delete a user
  deleteAUser(){
    return new Promise((resolve, reject)=>{
      this.db.object(`${this.ref}`).remove().then(()=>{
        resolve(true);
      }).catch((err)=>{
        reject(err);
      });
    });
  }

// a user can select which vehicle to view
  setCurrentVehicle(vehicleId: any){
    return new Promise((resolve, reject)=>{
      this.db.object(`${this.ref}/currentVehicle`).set(vehicleId).then(()=> resolve(true)).catch(err => reject(err));
    });
  }






} // userApi class
