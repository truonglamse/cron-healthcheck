import {Entity, model, property} from '@loopback/repository';

@model()
export class automatictestingresults extends Entity {
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @property({type: 'string', id: true, generated: true})
  _id?: string;

  @property({type: 'date'})
  date: Date; 
  
  @property({type: 'string'})
  testingName: string;

  @property({type: 'string'})
  macAddress: string;
  
  @property({type: 'string'})
  result: [];

  @property({type: 'string'})
  resultsSumarize: [];

  @property({type: 'string'})
  testingTime: Number;

  @property({type: 'string'})
  logDebug: String;

  @property({type: 'string'})
  testImage: String;

  @property({type: 'string'})
  isPass: Boolean;

  @property({type: 'string'})
  HPI: String;

  @property({type: 'string'})
  firmwareTestName: String;

  @property({type: 'string'})
  oldData: Boolean;

  @property({type: 'string'})
  reasonFail: String;

  constructor(data?: Partial<automatictestingresults>) {
    super(data);
  }
}

export interface AutomatictestingresultsRelations {
  // describe navigational properties here
}

export type AutomatictestingresultsWithRelations = automatictestingresults & AutomatictestingresultsRelations;
