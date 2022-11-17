import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MascotafelizdsDataSource} from '../datasources';
import {Administrador, AdministradorRelations, Usuario} from '../models';
import {UsuarioRepository} from './usuario.repository';

export class AdministradorRepository extends DefaultCrudRepository<
  Administrador,
  typeof Administrador.prototype.id,
  AdministradorRelations
> {

  public readonly usuarioid: BelongsToAccessor<Usuario, typeof Administrador.prototype.id>;

  constructor(
    @inject('datasources.mascotafelizds') dataSource: MascotafelizdsDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Administrador, dataSource);
    this.usuarioid = this.createBelongsToAccessorFor('usuarioid', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuarioid', this.usuarioid.inclusionResolver);


  }
}
