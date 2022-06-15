import {Entity, model, property} from '@loopback/repository';

@model()
export class boots extends Entity {
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @property({type: 'string', id: true, generated: true})
  _id: string;
  
  @property({type: 'string'})
  bootName: String;

  @property({type: 'string'})
  data: String;

  @property({type: 'string'})
  description: String;

  @property({type: 'date', default: () => new Date()})
  date: Date

  constructor(data?: Partial<boots>) {
    super(data);
  }
}

export interface BootsRelations {
  // describe navigational properties here
}

export type BootsWithRelations = boots & BootsRelations;
