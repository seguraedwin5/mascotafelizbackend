import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MascotafelizdsDataSource} from '../datasources';
import {Asesor, AsesorRelations, Usuario, Solicitud} from '../models';
import {UsuarioRepository} from './usuario.repository';
import {SolicitudRepository} from './solicitud.repository';

export class AsesorRepository extends DefaultCrudRepository<
  Asesor,
  typeof Asesor.prototype.id,
  AsesorRelations
> {

  public readonly usuarioid: BelongsToAccessor<Usuario, typeof Asesor.prototype.id>;

  public readonly solicitudes: HasManyRepositoryFactory<Solicitud, typeof Asesor.prototype.id>;

  constructor(
    @inject('datasources.mascotafelizds') dataSource: MascotafelizdsDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(Asesor, dataSource);
    this.solicitudes = this.createHasManyRepositoryFactoryFor('solicitudes', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitudes', this.solicitudes.inclusionResolver);
    this.usuarioid = this.createBelongsToAccessorFor('usuarioid', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuarioid', this.usuarioid.inclusionResolver);

  }
}
