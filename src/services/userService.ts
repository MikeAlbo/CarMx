import {Injectable} from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()

export class UserApi {

  public currentUser;
  private ref;

  constructor(public authApi: AngularFireAuth, private db : AngularFireDatabase){
      authApi.authState.subscribe((user)=>{
        this.currentUser = user ? user: null;
        this.ref = `/users/${this.currentUser.uid}/`;
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
  addNewVehicle(vehicleId: string, vehicle: object){
    return new Promise((resolve, reject)=>{
      this.db.list(`${this.ref}/vehicles/${vehicleId}`).push(vehicle).then((item)=>{
        resolve(item.key);
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
  setCurrentVehicle(vehicleId: string){
    return new Promise((resolve, reject)=>{
      this.db.object(`${this.ref}/currentVehicle`).update(vehicleId).then(()=> resolve(true)).catch(err => reject(err));
    });
  }






} // userApi class
