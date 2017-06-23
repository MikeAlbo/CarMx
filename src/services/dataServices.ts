/*import { Observable } from 'rxjs/Observable';*/
import {Injectable} from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable()

export class DataService {

  currentUser;
  userApi: FirebaseObjectObservable<any>;
  providersApi: FirebaseObjectObservable<any>;
  vehiclesApi: FirebaseObjectObservable<any>;




  constructor(public fireAuth: AngularFireAuth, public db: AngularFireDatabase) {
    fireAuth.authState.subscribe((user)=>{
      if(user){
        this.currentUser = user;
        this.userApi = db.object(`/${user.uid}`);
        this.providersApi = db.object(`/providers`);
        this.vehiclesApi = db.object(`/vehicles`);
        console.log("dataApi: ", this.currentUser); // remove
      } else {
        console.log("no user") // remove
      }
    })
  }

  // user

  // add






}
