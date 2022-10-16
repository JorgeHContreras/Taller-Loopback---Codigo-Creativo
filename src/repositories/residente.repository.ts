import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Residente, ResidenteRelations, Persona, RegistroVisitantes} from '../models';
import {PersonaRepository} from './persona.repository';
import {RegistroVisitantesRepository} from './registro-visitantes.repository';

export class ResidenteRepository extends DefaultCrudRepository<
  Residente,
  typeof Residente.prototype.id,
  ResidenteRelations
> {

  public readonly persona: HasOneRepositoryFactory<Persona, typeof Residente.prototype.id>;

  public readonly registroVisitantes: HasManyRepositoryFactory<RegistroVisitantes, typeof Residente.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>, @repository.getter('RegistroVisitantesRepository') protected registroVisitantesRepositoryGetter: Getter<RegistroVisitantesRepository>,
  ) {
    super(Residente, dataSource);
    this.registroVisitantes = this.createHasManyRepositoryFactoryFor('registroVisitantes', registroVisitantesRepositoryGetter,);
    this.registerInclusionResolver('registroVisitantes', this.registroVisitantes.inclusionResolver);
    this.persona = this.createHasOneRepositoryFactoryFor('persona', personaRepositoryGetter);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
  }
}
