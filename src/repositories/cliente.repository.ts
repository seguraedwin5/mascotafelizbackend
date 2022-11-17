import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MascotafelizdsDataSource} from '../datasources';
import {Cliente, ClienteRelations, Usuario, Mascota} from '../models';
import {UsuarioRepository} from './usuario.repository';
import {MascotaRepository} from './mascota.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly usuariocliente: BelongsToAccessor<Usuario, typeof Cliente.prototype.id>;

  public readonly mascotas: HasManyRepositoryFactory<Mascota, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.mascotafelizds') dataSource: MascotafelizdsDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>,
  ) {
    super(Cliente, dataSource);
    this.mascotas = this.createHasManyRepositoryFactoryFor('mascotas', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascotas', this.mascotas.inclusionResolver);
    this.usuariocliente = this.createBelongsToAccessorFor('usuariocliente', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuariocliente', this.usuariocliente.inclusionResolver);
  }
}
