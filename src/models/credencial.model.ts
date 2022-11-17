import {Model, model, property} from '@loopback/repository';

@model()
export class Credencial extends Model {
  @property({
    type: 'string',
    required: true,
  })
  usuario: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;


  constructor(data?: Partial<Credencial>) {
    super(data);
  }
}

export interface CredencialRelations {
  // describe navigational properties here
}

export type CredencialWithRelations = Credencial & CredencialRelations;
