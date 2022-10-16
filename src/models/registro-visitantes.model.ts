import {Entity, model, property, hasOne, belongsTo} from '@loopback/repository';
import {Persona} from './persona.model';
import {Residente} from './residente.model';

@model()
export class RegistroVisitantes extends Entity {
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
  asunto: string;

  @property({
    type: 'date',
  })
  fechaEntrada?: string;

  @property({
    type: 'date',
  })
  fechaSalida?: string;

  @hasOne(() => Persona)
  persona: Persona;

  @belongsTo(() => Residente)
  residenteId: string;

  constructor(data?: Partial<RegistroVisitantes>) {
    super(data);
  }
}

export interface RegistroVisitantesRelations {
  // describe navigational properties here
}

export type RegistroVisitantesWithRelations = RegistroVisitantes & RegistroVisitantesRelations;
