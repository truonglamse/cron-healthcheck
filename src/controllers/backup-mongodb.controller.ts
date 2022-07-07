import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {testingresults as Testingresults} from '../models';
import {AutomatictestingresultsRepository, BootsRepository, CertificateinfosRepository, ManualtestingresultsRepository, QctoolfactoryconfigurationsRepository, TestingresultsRepository} from '../repositories';

export class BackupMongodbController {
  constructor(
    @repository(TestingresultsRepository)
    public testingresultsRepository : TestingresultsRepository,

    @repository(AutomatictestingresultsRepository)
    public automatictestingresultsRepository : AutomatictestingresultsRepository,
  
    @repository(BootsRepository)
    public bootsRepository : BootsRepository,
  
    @repository(CertificateinfosRepository)
    public certificateinfosRepository : CertificateinfosRepository,
  
    @repository(ManualtestingresultsRepository)
    public manualtestingresultsRepository : ManualtestingresultsRepository,
  
    @repository(QctoolfactoryconfigurationsRepository)
    public qctoolfactoryconfigurationsRepository : QctoolfactoryconfigurationsRepository,
  ) {}

  @get('/testingresults')
  @response(200, {
    description: 'Array of Testingresults model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Testingresults, {includeRelations: true}),
        },
      },
    },
  })
  async find(
  ): Promise<any> {

    let q = await this.automatictestingresultsRepository.find({});

    let w = await this.bootsRepository.find({});

    let e = await this.certificateinfosRepository.find({});

    let r = await this.manualtestingresultsRepository.find({});

    let t = await this.qctoolfactoryconfigurationsRepository.find({});

    let y = await this.testingresultsRepository.find({});

  
    return {
      automatictestingresults: q,
      boots: w,
      certificateinfos: e,
      manualtestingresults: r,
      qctoolfactoryconfigurations: t,
      testingresults: y,
    };

    

  }

  

}
