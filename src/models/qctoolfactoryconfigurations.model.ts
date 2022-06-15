import {Entity, model, property} from '@loopback/repository';
import { boots } from './boots.model';

@model()
export class qctoolfactoryconfigurations extends Entity {

  @property({type: 'string', id: true, generated: true})
  _id: string;

  @property({type: 'date', default: () => new Date()})
  date: Date;
  
  @property({type: 'any'})
  efuseConfig: {
        model: String,
        productionCode: String,
        productionLine: String
    };
  
  @property({type: 'any'})
  bootExecuted: boots;
  
  @property({type: 'string'})
  OTAFirmwareName: string;

  constructor(data?: Partial<qctoolfactoryconfigurations>) {
    super(data);
  }
}

export interface QctoolfactoryconfigurationsRelations {
  // describe navigational properties here
}

export type QctoolfactoryconfigurationsWithRelations = qctoolfactoryconfigurations & QctoolfactoryconfigurationsRelations;
