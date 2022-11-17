import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Usuario} from './usuario.model';
import {Solicitud} from './solicitud.model';

@model()
export class Asesor extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @belongsTo(() => Usuario, {name: 'usuarioid'})
  idusuario: string;

  @hasMany(() => Solicitud, {keyTo: 'idasesor'})
  solicitudes: Solicitud[];

  constructor(data?: Partial<Asesor>) {
    super(data);
  }
}

export interface AsesorRelations {
  // describe navigational properties here
}

export type AsesorWithRelations = Asesor & AsesorRelations;
