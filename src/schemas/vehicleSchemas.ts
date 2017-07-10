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
class AddNewVehicleSchema extends  VehicleSchema {

  public dateUpdated: Date;
  protected dateInitialized?: Date;
  public odometer: string;


  constructor({params, dateUpdated, dateInit, odometer}){
    super(params);

    this.dateUpdated = dateUpdated;
    this.dateInitialized = dateInit;
    this.odometer = odometer;

    console.log("dateUpdated: ", this.dateUpdated);

  }
}

class UpdateVehicleSchema extends  VehicleSchema {

  public dateUpdated: Date;
  public odometer: string;


  constructor({params, dateUpdated, odometer}){
    super(params);

    this.dateUpdated = dateUpdated;
    this.odometer = odometer;

    console.log("dateUpdated: ", this.dateUpdated);

  }
}

export {VehicleSchema, AddNewVehicleSchema, UpdateVehicleSchema}
