import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {RegistroVisitantes, RegistroVisitantesRelations, Persona, Residente} from '../models';
import {PersonaRepository} from './persona.repository';
import {ResidenteRepository} from './residente.repository';

export class RegistroVisitantesRepository extends DefaultCrudRepository<
  RegistroVisitantes,
  typeof RegistroVisitantes.prototype.id,
  RegistroVisitantesRelations
> {

  public readonly persona: HasOneRepositoryFactory<Persona, typeof RegistroVisitantes.prototype.id>;

  public readonly residente: BelongsToAccessor<Residente, typeof RegistroVisitantes.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>, @repository.getter('ResidenteRepository') protected residenteRepositoryGetter: Getter<ResidenteRepository>,
  ) {
    super(RegistroVisitantes, dataSource);
    this.residente = this.createBelongsToAccessorFor('residente', residenteRepositoryGetter,);
    this.registerInclusionResolver('residente', this.residente.inclusionResolver);
    this.persona = this.createHasOneRepositoryFactoryFor('persona', personaRepositoryGetter);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
  }
}
