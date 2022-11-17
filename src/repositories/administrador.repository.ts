import {inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository} from '@loopback/repository';
import {MascotafelizdsDataSource} from '../datasources';
import {Administrador, AdministradorRelations, Usuario} from '../models';


export class AdministradorRepository extends DefaultCrudRepository<
  Administrador,
  typeof Administrador.prototype.id,
  AdministradorRelations
> {

  public readonly usuarioid: BelongsToAccessor<Usuario, typeof Administrador.prototype.id>;

  constructor(
    @inject('datasources.mascotafelizds') dataSource: MascotafelizdsDataSource,
  ) {
    super(Administrador, dataSource);


  }
}
