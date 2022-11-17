import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MascotafelizdsDataSource} from '../datasources';
import {Mascota, MascotaRelations} from '../models';

export class MascotaRepository extends DefaultCrudRepository<
  Mascota,
  typeof Mascota.prototype.id,
  MascotaRelations
> {
  constructor(
    @inject('datasources.mascotafelizds') dataSource: MascotafelizdsDataSource,
  ) {
    super(Mascota, dataSource);
  }
}
