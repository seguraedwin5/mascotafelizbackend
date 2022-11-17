import {Entity, model, property} from '@loopback/repository';

@model()
export class Solicitud extends Entity {
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
  ciudad: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  estadosolicitud: string;

  @property({
    type: 'string',
    required: true,
  })
  idcliente: string;

  @property({
    type: 'string',
    required: true,
  })
  idmascota: string;

  @property({
    type: 'string',
  })
  idplan?: string;

  @property({
    type: 'string',
  })
  idasesor?: string;

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
