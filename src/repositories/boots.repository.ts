import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {QcDataDataSource} from '../datasources';
import {boots, BootsRelations} from '../models';

export class BootsRepository extends DefaultCrudRepository<
boots,
  typeof boots.prototype._id,
  BootsRelations
> {
  constructor(
    @inject('datasources.qcData') dataSource: QcDataDataSource,
  ) {
    super(boots, dataSource);
  }
}
