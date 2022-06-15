import {Entity, model, property} from '@loopback/repository';

@model()
export class testingresults extends Entity {

  @property({type: 'string', id: true, generated: true})
  _id: string;

  constructor(data?: Partial<testingresults>) {
    super(data);
  }
}

export interface TestingresultsRelations {
  // describe navigational properties here
}

export type TestingresultsWithRelations = testingresults & TestingresultsRelations;
