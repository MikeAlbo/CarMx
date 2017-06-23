import {Injectable} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
//import * as firebase from 'firebase/app';

@Injectable()

class FuelService {

  fuelLog: FirebaseListObservable<any>;

  public fakeData = {
    odometer: "12345",
    lastTrip: {
      tripDistance: "235",
      fuelAmountPurchased: "26",
      date: 'date'
    },
    fuelPurchases: [
      {
        id: "123",
        odometerReading: "12654",
        fuelAmountPurchased: "24",
        date: 'date'
      },
      {
        id: "124",
        odometerReading: "1324",
        fuelAmountPurchased: "24",
        date: 'date'
      },
      {
        id: "125",
        odometerReading: "1365",
        fuelAmountPurchased: "24",
        date: 'date'
      },
      {
        id: "126",
        odometerReading: "1415",
        fuelAmountPurchased: "24",
        date: 'date'
      }
    ]
  };

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
