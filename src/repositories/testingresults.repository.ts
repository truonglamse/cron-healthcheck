import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {QcDataDataSource} from '../datasources';
import {testingresults, TestingresultsRelations} from '../models';

export class TestingresultsRepository extends DefaultCrudRepository<
testingresults,
  typeof testingresults.prototype._id,
  TestingresultsRelations
> {
  constructor(
    @inject('datasources.qcData') dataSource: QcDataDataSource,
  ) {
    super(testingresults, dataSource);
  }
}
