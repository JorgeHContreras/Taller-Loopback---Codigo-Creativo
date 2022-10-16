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
import {RegistroVisitantes} from '../models';
import {RegistroVisitantesRepository} from '../repositories';

export class RegistroVisitanteController {
  constructor(
    @repository(RegistroVisitantesRepository)
    public registroVisitantesRepository : RegistroVisitantesRepository,
  ) {}

  @post('/registro-visitantes')
  @response(200, {
    description: 'RegistroVisitantes model instance',
    content: {'application/json': {schema: getModelSchemaRef(RegistroVisitantes)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RegistroVisitantes, {
            title: 'NewRegistroVisitantes',
            exclude: ['id'],
          }),
        },
      },
    })
    registroVisitantes: Omit<RegistroVisitantes, 'y'>,
  ): Promise<RegistroVisitantes> {
    return this.registroVisitantesRepository.create(registroVisitantes);
  }

  @get('/registro-visitantes/count')
  @response(200, {
    description: 'RegistroVisitantes model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(RegistroVisitantes) where?: Where<RegistroVisitantes>,
  ): Promise<Count> {
    return this.registroVisitantesRepository.count(where);
  }

  @get('/registro-visitantes')
  @response(200, {
    description: 'Array of RegistroVisitantes model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(RegistroVisitantes, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(RegistroVisitantes) filter?: Filter<RegistroVisitantes>,
  ): Promise<RegistroVisitantes[]> {
    return this.registroVisitantesRepository.find(filter);
  }

  @patch('/registro-visitantes')
  @response(200, {
    description: 'RegistroVisitantes PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RegistroVisitantes, {partial: true}),
        },
      },
    })
    registroVisitantes: RegistroVisitantes,
    @param.where(RegistroVisitantes) where?: Where<RegistroVisitantes>,
  ): Promise<Count> {
    return this.registroVisitantesRepository.updateAll(registroVisitantes, where);
  }

  @get('/registro-visitantes/{id}')
  @response(200, {
    description: 'RegistroVisitantes model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(RegistroVisitantes, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(RegistroVisitantes, {exclude: 'where'}) filter?: FilterExcludingWhere<RegistroVisitantes>
  ): Promise<RegistroVisitantes> {
    return this.registroVisitantesRepository.findById(id, filter);
  }

  @patch('/registro-visitantes/{id}')
  @response(204, {
    description: 'RegistroVisitantes PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RegistroVisitantes, {partial: true}),
        },
      },
    })
    registroVisitantes: RegistroVisitantes,
  ): Promise<void> {
    await this.registroVisitantesRepository.updateById(id, registroVisitantes);
  }

  @put('/registro-visitantes/{id}')
  @response(204, {
    description: 'RegistroVisitantes PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() registroVisitantes: RegistroVisitantes,
  ): Promise<void> {
    await this.registroVisitantesRepository.replaceById(id, registroVisitantes);
  }

  @del('/registro-visitantes/{id}')
  @response(204, {
    description: 'RegistroVisitantes DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.registroVisitantesRepository.deleteById(id);
  }
}
