import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {QcDataDataSource} from '../datasources';
import {manualtestingresults, ManualtestingresultsRelations} from '../models';

export class ManualtestingresultsRepository extends DefaultCrudRepository<
manualtestingresults,
  typeof manualtestingresults.prototype._id,
  ManualtestingresultsRelations
> {
  constructor(
    @inject('datasources.qcData') dataSource: QcDataDataSource,
  ) {
    super(manualtestingresults, dataSource);
  }
}
