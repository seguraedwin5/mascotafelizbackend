import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Usuario} from './usuario.model';
import {Mascota} from './mascota.model';

@model()
export class Cliente extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @belongsTo(() => Usuario, {name: 'usuariocliente'})
  idusuario: string;

  @hasMany(() => Mascota, {keyTo: 'idcliente'})
  mascotas: Mascota[];

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
