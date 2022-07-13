import { inject } from '@loopback/core';
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
import { Convertdata2JsonService } from '../services';

export class BackupMongodbController {
  constructor(
    @inject('services.Convertdata2JsonService') private convertData2JsonService: Convertdata2JsonService,
  ) {}

  @get('/backup')
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
    await this.convertData2JsonService.convertData2Json('2022-07-13T00:00:00.000+00:00');
    return true;
  }
}
