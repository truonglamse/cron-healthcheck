import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {QcDataDataSource} from '../datasources';
import {certificateinfos, CertificateinfosRelations} from '../models';

export class CertificateinfosRepository extends DefaultCrudRepository<
certificateinfos,
  typeof certificateinfos.prototype._id,
  CertificateinfosRelations
> {
  constructor(
    @inject('datasources.qcData') dataSource: QcDataDataSource,
  ) {
    super(certificateinfos, dataSource);
  }
}
