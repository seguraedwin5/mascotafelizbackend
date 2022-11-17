import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MascotafelizdsDataSource} from '../datasources';
import {Mascota, MascotaRelations, Solicitud} from '../models';
import {SolicitudRepository} from './solicitud.repository';

export class MascotaRepository extends DefaultCrudRepository<
  Mascota,
  typeof Mascota.prototype.id,
  MascotaRelations
> {

  public readonly solicitud: HasOneRepositoryFactory<Solicitud, typeof Mascota.prototype.id>;

  constructor(
    @inject('datasources.mascotafelizds') dataSource: MascotafelizdsDataSource, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(Mascota, dataSource);
    this.solicitud = this.createHasOneRepositoryFactoryFor('solicitud', solicitudRepositoryGetter);
    this.registerInclusionResolver('solicitud', this.solicitud.inclusionResolver);
  }
}
