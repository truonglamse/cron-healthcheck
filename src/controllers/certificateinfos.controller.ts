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
import {certificateinfos} from '../models';
import {CertificateinfosRepository} from '../repositories';

export class CertificateinfosController {
  constructor(
    @repository(CertificateinfosRepository)
    public certificateinfosRepository : CertificateinfosRepository,
  ) {}

  @post('/certificateinfos')
  @response(200, {
    description: 'Certificateinfos model instance',
    content: {'application/json': {schema: getModelSchemaRef(certificateinfos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(certificateinfos, {
            title: 'NewCertificateinfos',
            exclude: ['_id'],
          }),
        },
      },
    })
    certificateinfos: Omit<certificateinfos, '_id'>,
  ): Promise<certificateinfos> {
    return this.certificateinfosRepository.create(certificateinfos);
  }

  @get('/certificateinfos/count')
  @response(200, {
    description: 'Certificateinfos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(certificateinfos) where?: Where<certificateinfos>,
  ): Promise<Count> {
    return this.certificateinfosRepository.count(where);
  }

  @get('/certificateinfos')
  @response(200, {
    description: 'Array of Certificateinfos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(certificateinfos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(certificateinfos) filter?: Filter<certificateinfos>,
  ): Promise<certificateinfos[]> {
    return this.certificateinfosRepository.find(filter);
  }

  @patch('/certificateinfos')
  @response(200, {
    description: 'Certificateinfos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(certificateinfos, {partial: true}),
        },
      },
    })
    certificateinfos: certificateinfos,
    @param.where(certificateinfos) where?: Where<certificateinfos>,
  ): Promise<Count> {
    return this.certificateinfosRepository.updateAll(certificateinfos, where);
  }

  @get('/certificateinfos/{id}')
  @response(200, {
    description: 'Certificateinfos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(certificateinfos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(certificateinfos, {exclude: 'where'}) filter?: FilterExcludingWhere<certificateinfos>
  ): Promise<certificateinfos> {
    return this.certificateinfosRepository.findById(id, filter);
  }

  @patch('/certificateinfos/{id}')
  @response(204, {
    description: 'Certificateinfos PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(certificateinfos, {partial: true}),
        },
      },
    })
    certificateinfos: certificateinfos,
  ): Promise<void> {
    await this.certificateinfosRepository.updateById(id, certificateinfos);
  }

  @put('/certificateinfos/{id}')
  @response(204, {
    description: 'Certificateinfos PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() certificateinfos: certificateinfos,
  ): Promise<void> {
    await this.certificateinfosRepository.replaceById(id, certificateinfos);
  }

  @del('/certificateinfos/{id}')
  @response(204, {
    description: 'Certificateinfos DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.certificateinfosRepository.deleteById(id);
  }
}
