import {Entity, model, property} from '@loopback/repository';

@model()
export class manualtestingresults extends Entity {

  @property({type: 'string', id: true, generated: true})
  _id: string;

  @property({type: 'date'})
  date: Date;

  @property({type: 'string'})
  macAddress: string;

  @property({type: 'string'})
  result: string;

  @property({type: 'string'})
  testingName: string;

  @property({type: 'number'})
  testingTime: number;

  @property({type: 'string'})
  logDebug: string;

  @property({type: 'string'})
  testImage: [];

  @property({type: 'boolean'})
  isPass: boolean;

  @property({type: 'string'})
  oldData: boolean;

  @property({type: 'string'})
  HPI: string;

  @property({type: 'string'})
  firmwareTestName: string;

  @property({type: 'string'})
  updatedOTAFirmwareName: string;

  constructor(data?: Partial<manualtestingresults>) {
    super(data);
  }
}

export interface ManualtestingresultsRelations {
  // describe navigational properties here
}

export type ManualtestingresultsWithRelations = manualtestingresults & ManualtestingresultsRelations;
