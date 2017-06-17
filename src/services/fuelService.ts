import {Injectable} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
//import * as firebase from 'firebase/app';

@Injectable()

class FuelService {

  fuelLog: FirebaseListObservable<any>;

  constructor(public db: AngularFireDatabase){
    this.fuelLog = db.list('/fuelLog');
  }

  addTripToFuelLog(trip){   // add a new trip instance to the fuel log
    this.fuelLog.push(trip).then(()=>{
      console.log(this.fuelLog);
    });
  }

  removeTripFromFuelLog(key){  // delete a specific trip from the fuel log
    this.fuelLog.remove(key);
  }

  updateTripInFuelLog(key, value){    // update a specific trip inside the fuel log
    this.fuelLog.update(key, value);
  }

  // getTripFromFuelLog(val){   // get a specific trip from the fuel log
  //
  // }
  //
  // getFuelLog(){   // get the entire fuel log
  //
  // }

  removeFuelLog(){ // delete the entire fuel log
    this.fuelLog.remove();
  }


}

export {FuelService}
