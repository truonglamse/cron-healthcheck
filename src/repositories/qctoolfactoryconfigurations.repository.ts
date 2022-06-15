import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {QcDataDataSource} from '../datasources';
import {qctoolfactoryconfigurations, QctoolfactoryconfigurationsRelations} from '../models';

export class QctoolfactoryconfigurationsRepository extends DefaultCrudRepository<
qctoolfactoryconfigurations,
  typeof qctoolfactoryconfigurations.prototype._id,
  QctoolfactoryconfigurationsRelations
> {
  constructor(
    @inject('datasources.qcData') dataSource: QcDataDataSource,
  ) {
    super(qctoolfactoryconfigurations, dataSource);
  }
}
