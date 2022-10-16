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
import {Residente} from '../models';
import {ResidenteRepository} from '../repositories';

export class ResidenteController {
  constructor(
    @repository(ResidenteRepository)
    public residenteRepository : ResidenteRepository,
  ) {}

  @post('/residentes')
  @response(200, {
    description: 'Residente model instance',
    content: {'application/json': {schema: getModelSchemaRef(Residente)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Residente, {
            title: 'NewResidente',
            exclude: ['id'],
          }),
        },
      },
    })
    residente: Omit<Residente, 'id'>,
  ): Promise<Residente> {
    return this.residenteRepository.create(residente);
  }

  @get('/residentes/count')
  @response(200, {
    description: 'Residente model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Residente) where?: Where<Residente>,
  ): Promise<Count> {
    return this.residenteRepository.count(where);
  }

  @get('/residentes')
  @response(200, {
    description: 'Array of Residente model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Residente, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Residente) filter?: Filter<Residente>,
  ): Promise<Residente[]> {
    return this.residenteRepository.find(filter);
  }

  @patch('/residentes')
  @response(200, {
    description: 'Residente PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Residente, {partial: true}),
        },
      },
    })
    residente: Residente,
    @param.where(Residente) where?: Where<Residente>,
  ): Promise<Count> {
    return this.residenteRepository.updateAll(residente, where);
  }

  @get('/residentes/{id}')
  @response(200, {
    description: 'Residente model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Residente, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Residente, {exclude: 'where'}) filter?: FilterExcludingWhere<Residente>
  ): Promise<Residente> {
    return this.residenteRepository.findById(id, filter);
  }

  @patch('/residentes/{id}')
  @response(204, {
    description: 'Residente PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Residente, {partial: true}),
        },
      },
    })
    residente: Residente,
  ): Promise<void> {
    await this.residenteRepository.updateById(id, residente);
  }

  @put('/residentes/{id}')
  @response(204, {
    description: 'Residente PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() residente: Residente,
  ): Promise<void> {
    await this.residenteRepository.replaceById(id, residente);
  }

  @del('/residentes/{id}')
  @response(204, {
    description: 'Residente DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.residenteRepository.deleteById(id);
  }
}
