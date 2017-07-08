import {Injectable} from '@angular/core';
@Injectable()

class VehicleSchema {

  public make: string;
  public model: string;
  public year: string;
  public name: string;

  constructor(params){
    this.make = params.make.value;
    this.model = params.model.value;
    this.year = params.year.value;
    this.name = params.vehicleName.value;

  }


}
//
//
class DetailedVehicleSchema extends  VehicleSchema {

  public dateUpdated: Date;
  protected dateInitialized: Date;
  public odometer: string;


  constructor({params, date, odometer}){
    super(params);

    this.dateUpdated = date;
    this.dateInitialized = date;
    this.odometer = odometer;

    console.log("dateUpdated: ", this.dateUpdated);

  }
}

export {VehicleSchema, DetailedVehicleSchema}
