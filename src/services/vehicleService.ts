import {Injectable} from '@angular/core';
import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';
import * as firebase from 'firebase/app';

import {UserApi} from './services';
import {VehicleInfo} from '../services/vehicleInfo';

@Injectable()

export class VehicleApi {

  public currentVehicle;
  ref = `/vehicles/`;

  constructor(private userApi: UserApi, private db: AngularFireDatabase, private  vehicleInfo: VehicleInfo){

    this.userApi.currentUserDetails$.subscribe((user)=>{
      if(user){
        this.setCurrentVehicle(user.currentVehicle)
      } else {
        this.currentVehicle = null;
      }
    })

  }// constructor

  // set the current vehicle
  setCurrentVehicle(vehicleId: any){
    console.log("setting current vehicle");
    this.db.object(`${this.ref}/${vehicleId}`).subscribe((vehicle)=> {
      this.currentVehicle = vehicle;
      //console.log(this.currentVehicle);
    });

  }

  // a user can add a new vehicle
  createNewVehicle(vehicle){
    return new Promise((resolve, reject)=>{
      let key = firebase.database().ref().child('vehicles').push().key;
      this.db.object(`${this.ref}/${key}/`).set(vehicle).then(()=>{
        resolve(key);
      }).catch(err => reject(err));
    });
  }

  // a user can delete a new vehicle
  deleteVehicle(vehicleId: string){
    return new Promise((resolve, reject)=>{
      this.db.object(`${this.ref}/${vehicleId}`).remove().then(()=>resolve(true)).catch(err => reject(err));
    });
  }

  // a user can update the vehicle's details
  updateVehicleDetails(vehicleId: string, details: object){
    return new Promise((resolve, reject)=>{
      this.db.object(`${this.ref}/${vehicleId}`).update(details).then(()=> resolve(true)).catch(err => reject(err));
    });
  }

  //a user can add an odometer reading
  addOdometer(odometerObject: object){
    return new Promise((resolve, reject)=>{
      this.db.list(`${this.ref}/odometer`).push(odometerObject).then((item)=>{
        resolve(item.key);
      }).catch(err => reject(err));
    })
  }

  // a user can update an odometer reading
  updateOdometer(odometerKey: string, odometerObject: object){
    return new Promise((resolve, reject)=> {
      this.db.object(`${this.ref}/odometer/${odometerKey}`).update(odometerObject).then(()=> resolve(true)).catch(err => reject(err));
    })
  }

  // a user can add a fuel event to the fuel log
  addFuelEvent(fuelEvent: object){
    return new Promise((resolve, reject)=>{
      this.db.list(`${this.ref}/fuelLog/`).push(fuelEvent).then((item)=> resolve(item.key)).catch(err => reject(err));
    });
  }

  // a user can modify a fuel event inside the log
  updateFuelEvent(eventId: string, fuelEvent: object){
    return new Promise((resolve, reject)=>{
      this.db.object(`${this.ref}/${eventId}`).update(fuelEvent).then(()=> resolve(true)).catch(err => reject(err));
    });
  }

  // a user can delete a fuel event inside the log
  deleteFuelEvent(eventId: string){
    return new Promise((resolve, reject)=>{
      this.db.list(`${this.ref}/fuelLog`).remove(eventId).then(()=> resolve(true)).catch(err => reject(err));
    });
  }

  // a user can add a mx task
  addMxTask(task: object){
    return new Promise((resolve, reject)=>{
      this.db.list(`${this.ref}/mxTask`).push(task).then((item)=> resolve(item.key)).catch(err => reject(err));
    });
  }

  // a user can modify a mx task
  updateMxTask(taskId: string, task: object){
    return new Promise((resolve, reject)=>{
      this.db.object(`${this.ref}/mxTask/${taskId}`).update(task).then(()=> resolve(true)).catch(err => reject(err));
    });
  }

  // a user can delete a mx task
  deleteMxTask(taskId: string){
    return new Promise((resolve, reject)=> {
      this.db.list(`${this.ref}/mxTask`).remove(taskId).then(()=>resolve(true)).catch(err => reject(err));
    });
  }

  // a user can add a provider to a mx task
  addProviderToMxTask(mxTaskId: string, providerId: string){
    return new Promise((resolve, reject)=> {
      this.db.list(`${this.ref}/mxTask/${mxTaskId}/providers/`).push(providerId).then(()=> resolve(true)).catch(err => reject(err));
    });
  }

  // a user can delete a provider from a mx task
  removeProviderFromMxTask(mxTaskId: string, providerId: string){
   return new Promise((resolve, reject)=>{
     this.db.list(`${this.ref}/mxTask/${mxTaskId}/providers`).remove(providerId).then(()=> resolve(true)).catch(err => reject(err));
   })
  }


}// vehicleApi
