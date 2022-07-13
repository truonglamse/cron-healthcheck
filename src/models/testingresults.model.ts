import {Entity, model, property} from '@loopback/repository';

@model()
export class testingresults extends Entity {

  @property({type: 'string', id: true, generated: true})
  _id: string;

  @property({type: 'any'})
  inUsing: any;

  @property({type: 'string'})
  macAddress: string;

  @property({type: 'any'})
  automaticTestingResult: any;

  @property({type: 'date'})
  productionDate: Date;

  @property({type: 'any'})
  manualTestingResult: any;

  @property({type: 'number'})
  __v: number;

  constructor(data?: Partial<testingresults>) {
    super(data);
  }
}

export interface TestingresultsRelations {
  // describe navigational properties here
}

export type TestingresultsWithRelations = testingresults & TestingresultsRelations;
