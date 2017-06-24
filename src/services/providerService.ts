import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable()

export class ProviderApi {

  constructor(private db: AngularFireDatabase){} //constructor

  // add new provider to provider dataSet
  addNewProvider(provider: object){
    return new Promise((resolve, reject)=>{
      let key = firebase.database().ref().child('providers').push().key;
      this.db.object(`/providers/${key}`).set(provider).then(()=> resolve(key)).catch(err => reject(err));
    });
  }

  // update provider information
  updateProvider(providerId: string, provider: object){
    return new Promise((resolve, reject)=>{
      this.db.object(`/providers/${providerId}`).update(provider).then(()=> resolve(true)).catch(err => reject(err));
    })
  }


  // delete provider from dataSet
  deleteProvider(providerId: string){
    return new Promise((resolve, reject)=> {
      this.db.object(`/providers/${providerId}`).remove().then(()=> resolve(true)).catch(err => reject(err));
    });
  }

  // add service to provider/services
  addServiceToProvider(providerId: string, serviceName: string, serviceObject: object){
    return new Promise((resolve, reject)=>{
      this.db.object(`/providers/${providerId}/services/${serviceName}`).set(serviceObject).then(()=> resolve(true)).catch(err => reject(err));
    });
  }

  // update service in provider/services
  updateServiceInProvider(providerId: string, serviceName: string, serviceObject: object){
    return new Promise((resolve, reject)=>{
      this.db.object(`/providers/${providerId}/services/${serviceName}`).update(serviceObject).then(()=> resolve(true)).catch(err => reject(err));
    });
  }

  // delete service in provider/services
  deleteServiceFromProvider(providerId: string, serviceName: string){
    return new Promise((resolve, reject)=>{
      this.db.object(`/providers/${providerId}/services/${serviceName}`).remove().then(()=>resolve(true)).catch(err => reject(err));
    });
  }

} // ProviderApi
