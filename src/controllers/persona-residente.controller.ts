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
  Persona,
  Residente,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaResidenteController {
  constructor(
    @repository(PersonaRepository) protected personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/residente', {
    responses: {
      '200': {
        description: 'Persona has one Residente',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Residente),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Residente>,
  ): Promise<Residente> {
    return this.personaRepository.residente(id).get(filter);
  }

  @post('/personas/{id}/residente', {
    responses: {
      '200': {
        description: 'Persona model instance',
        content: {'application/json': {schema: getModelSchemaRef(Residente)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Persona.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Residente, {
            title: 'NewResidenteInPersona',
            exclude: ['id'],
            optional: ['personaId']
          }),
        },
      },
    }) residente: Omit<Residente, 'id'>,
  ): Promise<Residente> {
    return this.personaRepository.residente(id).create(residente);
  }

  @patch('/personas/{id}/residente', {
    responses: {
      '200': {
        description: 'Persona.Residente PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Residente, {partial: true}),
        },
      },
    })
    residente: Partial<Residente>,
    @param.query.object('where', getWhereSchemaFor(Residente)) where?: Where<Residente>,
  ): Promise<Count> {
    return this.personaRepository.residente(id).patch(residente, where);
  }

  @del('/personas/{id}/residente', {
    responses: {
      '200': {
        description: 'Persona.Residente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Residente)) where?: Where<Residente>,
  ): Promise<Count> {
    return this.personaRepository.residente(id).delete(where);
  }
}
