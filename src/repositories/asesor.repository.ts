import {inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository} from '@loopback/repository';
import {MascotafelizdsDataSource} from '../datasources';
import {Asesor, AsesorRelations, Usuario} from '../models';


export class AsesorRepository extends DefaultCrudRepository<
  Asesor,
  typeof Asesor.prototype.id,
  AsesorRelations
> {

  public readonly usuarioid: BelongsToAccessor<Usuario, typeof Asesor.prototype.id>;

  constructor(
    @inject('datasources.mascotafelizds') dataSource: MascotafelizdsDataSource,
  ) {
    super(Asesor, dataSource);

  }
}
