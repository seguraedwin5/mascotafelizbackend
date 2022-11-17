import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MascotafelizdsDataSource} from '../datasources';
import {Plan, PlanRelations, Solicitud} from '../models';
import {SolicitudRepository} from './solicitud.repository';

export class PlanRepository extends DefaultCrudRepository<
  Plan,
  typeof Plan.prototype.id,
  PlanRelations
> {

  public readonly solicitudes: HasManyRepositoryFactory<Solicitud, typeof Plan.prototype.id>;

  constructor(
    @inject('datasources.mascotafelizds') dataSource: MascotafelizdsDataSource, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(Plan, dataSource);
    this.solicitudes = this.createHasManyRepositoryFactoryFor('solicitudes', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitudes', this.solicitudes.inclusionResolver);
  }
}
