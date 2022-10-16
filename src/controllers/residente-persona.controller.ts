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
  Residente,
  Persona,
} from '../models';
import {ResidenteRepository} from '../repositories';

export class ResidentePersonaController {
  constructor(
    @repository(ResidenteRepository) protected residenteRepository: ResidenteRepository,
  ) { }

  @get('/residentes/{id}/persona', {
    responses: {
      '200': {
        description: 'Residente has one Persona',
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
    return this.residenteRepository.persona(id).get(filter);
  }

  @post('/residentes/{id}/persona', {
    responses: {
      '200': {
        description: 'Residente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Persona)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Residente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {
            title: 'NewPersonaInResidente',
            exclude: ['id'],
            optional: ['residenteId']
          }),
        },
      },
    }) persona: Omit<Persona, 'id'>,
  ): Promise<Persona> {
    return this.residenteRepository.persona(id).create(persona);
  }

  @patch('/residentes/{id}/persona', {
    responses: {
      '200': {
        description: 'Residente.Persona PATCH success count',
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
    return this.residenteRepository.persona(id).patch(persona, where);
  }

  @del('/residentes/{id}/persona', {
    responses: {
      '200': {
        description: 'Residente.Persona DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Persona)) where?: Where<Persona>,
  ): Promise<Count> {
    return this.residenteRepository.persona(id).delete(where);
  }
}
