import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {Usuario} from './usuario.model';

@model()
export class Cliente extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @belongsTo(() => Usuario, {name: 'usuarioid'})
  idusuario: string;

  @hasOne(() => Usuario, {keyTo: 'id'})
  usuario: Usuario;

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
