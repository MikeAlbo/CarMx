import {Injectable} from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()

export class UserApi {

  public currentUser;
  private ref;

  constructor(private authApi: AngularFireAuth, private db : AngularFireDatabase){
      authApi.authState.subscribe((user)=>{
        this.currentUser = user ? user: null;
        this.ref = `/users/${this.currentUser.uid}/`;
      });
  } // constructor

  //get current user
  getCurrentUser(){
    return this.currentUser;
  }

  // add a new user
  addNewUser(user){
    return new Promise((resolve, reject)=>{
      this.db.object(this.ref).update(user).then(()=>{
        resolve();
      }).catch((err)=>{
        reject(err);
      });
    });
  }

  // add user settings
  addUserSettings(settings){
    return new Promise((resolve, reject)=>{
      this.db.object(`${this.ref}/settings/`).set(settings).then(()=>{
        resolve();
      }).catch((err)=>{
        reject(err);
      });
    });
  }

  // update user settings
  updateUserSettings(settings){
    return new Promise((resolve, reject)=>{
      this.db.object(`${this.ref}/settings/`).set(settings).then(()=>{
        resolve();
      }).catch((err)=>{
        reject(err);
      });
    });
  }

  // add a new vehicle
  addANewVehicle(vehicle){
    return new Promise((resolve, reject)=>{
      this.db.list(`${this.ref}/vehicles/`).push(vehicle).then((item)=>{
        resolve(item.key);
      }).catch((err)=>{
        reject(err);
      });

    })
  }

  // delete a vehicle
  deleteAVehicle(vehicleKey){
    return new Promise((resolve, reject)=>{
      this.db.list(`${this.ref}/vehicles/`).remove(vehicleKey).then(()=>{
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






} // userApi class
