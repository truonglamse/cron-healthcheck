import {Entity, model, property} from '@loopback/repository';

@model()
export class certificateinfos extends Entity {
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @property({type: 'string', id: true, generated: true})
  _id: string;

  @property({type: 'date'})
  date: Date;

  @property({type: 'number'})
  dateCreated: Number;

  @property({type: 'string'})
  certificateFileName: String;

  @property({type: 'string'})
  serial: String;

  @property({type: 'string'})
  privateKey: String;

  @property({type: 'string'})
  publicKey: String;

  @property({type: 'string'})
  PEM: String;

  @property({type: 'string'})
  macAddress: String;

  @property({type: 'boolean'})
  isAllocated: Boolean

  constructor(data?: Partial<certificateinfos>) {
    super(data);
  }
}

export interface CertificateinfosRelations {
  // describe navigational properties here
}

export type CertificateinfosWithRelations = certificateinfos & CertificateinfosRelations;
