import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'qcData',
  connector: 'mongodb',
  url: 'mongodb://qc-server:qc-server%40123@34.174.19.10:27017/qc?authSource=qc&readPreference=primary&authMechanism=DEFAULT&serverSelectionTimeoutMS=3000&retryWrites=true&directConnection=true&ssl=false',
  host: '',
  port: '',
  user: '',
  password: '',
  database: '',
  useNewUrlParser: true,
  retryWrites: false,
  authSource: '',
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class QcDataDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'qcData';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.qcData', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
