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
  RegistroVisitantes,
} from '../models';
import {ResidenteRepository} from '../repositories';

export class ResidenteRegistroVisitantesController {
  constructor(
    @repository(ResidenteRepository) protected residenteRepository: ResidenteRepository,
  ) { }

  @get('/residentes/{id}/registro-visitantes', {
    responses: {
      '200': {
        description: 'Array of Residente has many RegistroVisitantes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(RegistroVisitantes)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<RegistroVisitantes>,
  ): Promise<RegistroVisitantes[]> {
    return this.residenteRepository.registroVisitantes(id).find(filter);
  }

  @post('/residentes/{id}/registro-visitantes', {
    responses: {
      '200': {
        description: 'Residente model instance',
        content: {'application/json': {schema: getModelSchemaRef(RegistroVisitantes)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Residente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RegistroVisitantes, {
            title: 'NewRegistroVisitantesInResidente',
            exclude: ['id'],
            optional: ['residenteId']
          }),
        },
      },
    }) registroVisitantes: Omit<RegistroVisitantes, 'id'>,
  ): Promise<RegistroVisitantes> {
    return this.residenteRepository.registroVisitantes(id).create(registroVisitantes);
  }

  @patch('/residentes/{id}/registro-visitantes', {
    responses: {
      '200': {
        description: 'Residente.RegistroVisitantes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RegistroVisitantes, {partial: true}),
        },
      },
    })
    registroVisitantes: Partial<RegistroVisitantes>,
    @param.query.object('where', getWhereSchemaFor(RegistroVisitantes)) where?: Where<RegistroVisitantes>,
  ): Promise<Count> {
    return this.residenteRepository.registroVisitantes(id).patch(registroVisitantes, where);
  }

  @del('/residentes/{id}/registro-visitantes', {
    responses: {
      '200': {
        description: 'Residente.RegistroVisitantes DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(RegistroVisitantes)) where?: Where<RegistroVisitantes>,
  ): Promise<Count> {
    return this.residenteRepository.registroVisitantes(id).delete(where);
  }
}
