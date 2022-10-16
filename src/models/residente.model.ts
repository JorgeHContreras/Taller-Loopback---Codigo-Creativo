import {Entity, model, property, hasOne, hasMany} from '@loopback/repository';
import {Persona} from './persona.model';
import {RegistroVisitantes} from './registro-visitantes.model';

@model()
export class Residente extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  departamento: string;

  @property({
    type: 'string',
  })
  personaId?: string;

  @hasOne(() => Persona)
  persona: Persona;

  @hasMany(() => RegistroVisitantes)
  registroVisitantes: RegistroVisitantes[];

  constructor(data?: Partial<Residente>) {
    super(data);
  }
}

export interface ResidenteRelations {
  // describe navigational properties here
}

export type ResidenteWithRelations = Residente & ResidenteRelations;
