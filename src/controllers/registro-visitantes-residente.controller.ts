import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  RegistroVisitantes,
  Residente,
} from '../models';
import {RegistroVisitantesRepository} from '../repositories';

export class RegistroVisitantesResidenteController {
  constructor(
    @repository(RegistroVisitantesRepository)
    public registroVisitantesRepository: RegistroVisitantesRepository,
  ) { }

  @get('/registro-visitantes/{id}/residente', {
    responses: {
      '200': {
        description: 'Residente belonging to RegistroVisitantes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Residente)},
          },
        },
      },
    },
  })
  async getResidente(
    @param.path.string('id') id: typeof RegistroVisitantes.prototype.id,
  ): Promise<Residente> {
    return this.registroVisitantesRepository.residente(id);
  }
}
