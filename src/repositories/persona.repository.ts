import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Persona, PersonaRelations, Residente} from '../models';
import {ResidenteRepository} from './residente.repository';

export class PersonaRepository extends DefaultCrudRepository<
  Persona,
  typeof Persona.prototype.id,
  PersonaRelations
> {

  public readonly residente: HasOneRepositoryFactory<Residente, typeof Persona.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ResidenteRepository') protected residenteRepositoryGetter: Getter<ResidenteRepository>,
  ) {
    super(Persona, dataSource);
    this.residente = this.createHasOneRepositoryFactoryFor('residente', residenteRepositoryGetter);
    this.registerInclusionResolver('residente', this.residente.inclusionResolver);
  }
}
