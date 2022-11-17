import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Mascota,
  Solicitud,
} from '../models';
import {MascotaRepository} from '../repositories';

export class MascotaSolicitudController {
  constructor(
    @repository(MascotaRepository) protected mascotaRepository: MascotaRepository,
  ) { }

  @get('/mascotas/{id}/solicitud', {
    responses: {
      '200': {
        description: 'Mascota has one Solicitud',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Solicitud),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Solicitud>,
  ): Promise<Solicitud> {
    return this.mascotaRepository.solicitud(id).get(filter);
  }

  @post('/mascotas/{id}/solicitud', {
    responses: {
      '200': {
        description: 'Mascota model instance',
        content: {'application/json': {schema: getModelSchemaRef(Solicitud)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Mascota.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {
            title: 'NewSolicitudInMascota',
            exclude: ['id'],
            optional: ['idmascota']
          }),
        },
      },
    }) solicitud: Omit<Solicitud, 'id'>,
  ): Promise<Solicitud> {
    return this.mascotaRepository.solicitud(id).create(solicitud);
  }

  @patch('/mascotas/{id}/solicitud', {
    responses: {
      '200': {
        description: 'Mascota.Solicitud PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {partial: true}),
        },
      },
    })
    solicitud: Partial<Solicitud>,
    @param.query.object('where', getWhereSchemaFor(Solicitud)) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.mascotaRepository.solicitud(id).patch(solicitud, where);
  }

  @del('/mascotas/{id}/solicitud', {
    responses: {
      '200': {
        description: 'Mascota.Solicitud DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Solicitud)) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.mascotaRepository.solicitud(id).delete(where);
  }
}
