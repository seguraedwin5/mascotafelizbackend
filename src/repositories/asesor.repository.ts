import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MascotafelizdsDataSource} from '../datasources';
import {Asesor, AsesorRelations, Usuario} from '../models';
import {UsuarioRepository} from './usuario.repository';

export class AsesorRepository extends DefaultCrudRepository<
  Asesor,
  typeof Asesor.prototype.id,
  AsesorRelations
> {

  public readonly usuarioid: BelongsToAccessor<Usuario, typeof Asesor.prototype.id>;

  constructor(
    @inject('datasources.mascotafelizds') dataSource: MascotafelizdsDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Asesor, dataSource);
    this.usuarioid = this.createBelongsToAccessorFor('usuarioid', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuarioid', this.usuarioid.inclusionResolver);

  }
}
