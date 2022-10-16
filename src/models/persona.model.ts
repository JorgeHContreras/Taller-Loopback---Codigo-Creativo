import {Entity, model, property, hasOne} from '@loopback/repository';
import {Residente} from './residente.model';

@model()
export class Persona extends Entity {
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
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellido: string;

  @property({
    type: 'string',
    required: true,
  })
  cedula: string;

  @hasOne(() => Residente)
  residente: Residente;

  @property({
    type: 'string',
  })
  residenteId?: string;

  @property({
    type: 'string',
  })
  registroVisitantesId?: string;

  constructor(data?: Partial<Persona>) {
    super(data);
  }
}

export interface PersonaRelations {
  // describe navigational properties here
}

export type PersonaWithRelations = Persona & PersonaRelations;
