import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MascotafelizdsDataSource} from '../datasources';
import {Cliente, ClienteRelations, Usuario} from '../models';
import {UsuarioRepository} from './usuario.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly usuariocliente: BelongsToAccessor<Usuario, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.mascotafelizds') dataSource: MascotafelizdsDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Cliente, dataSource);
    this.usuariocliente = this.createBelongsToAccessorFor('usuariocliente', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuariocliente', this.usuariocliente.inclusionResolver);
  }
}
