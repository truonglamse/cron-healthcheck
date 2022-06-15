import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {QcDataDataSource} from '../datasources';
import {automatictestingresults, AutomatictestingresultsRelations} from '../models';

export class AutomatictestingresultsRepository extends DefaultCrudRepository<
automatictestingresults,
  typeof automatictestingresults.prototype._id,
  AutomatictestingresultsRelations
> {
  constructor(
    @inject('datasources.qcData') dataSource: QcDataDataSource,
  ) {
    super(automatictestingresults, dataSource);
  }
}
