import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  RegistroVisitantes,
  Persona,
} from '../models';
import {RegistroVisitantesRepository} from '../repositories';

export class RegistroVisitantesPersonaController {
  constructor(
    @repository(RegistroVisitantesRepository) protected registroVisitantesRepository: RegistroVisitantesRepository,
  ) { }

  @get('/registro-visitantes/{id}/persona', {
    responses: {
      '200': {
        description: 'RegistroVisitantes has one Persona',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Persona),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Persona>,
  ): Promise<Persona> {
    return this.registroVisitantesRepository.persona(id).get(filter);
  }

  @post('/registro-visitantes/{id}/persona', {
    responses: {
      '200': {
        description: 'RegistroVisitantes model instance',
        content: {'application/json': {schema: getModelSchemaRef(Persona)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof RegistroVisitantes.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {
            title: 'NewPersonaInRegistroVisitantes',
            exclude: ['id'],
            optional: ['registroVisitantesId']
          }),
        },
      },
    }) persona: Omit<Persona, 'id'>,
  ): Promise<Persona> {
    return this.registroVisitantesRepository.persona(id).create(persona);
  }

  @patch('/registro-visitantes/{id}/persona', {
    responses: {
      '200': {
        description: 'RegistroVisitantes.Persona PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {partial: true}),
        },
      },
    })
    persona: Partial<Persona>,
    @param.query.object('where', getWhereSchemaFor(Persona)) where?: Where<Persona>,
  ): Promise<Count> {
    return this.registroVisitantesRepository.persona(id).patch(persona, where);
  }

  @del('/registro-visitantes/{id}/persona', {
    responses: {
      '200': {
        description: 'RegistroVisitantes.Persona DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Persona)) where?: Where<Persona>,
  ): Promise<Count> {
    return this.registroVisitantesRepository.persona(id).delete(where);
  }
}
