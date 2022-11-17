import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MascotafelizdsDataSource} from '../datasources';
import {Plan, PlanRelations} from '../models';

export class PlanRepository extends DefaultCrudRepository<
  Plan,
  typeof Plan.prototype.id,
  PlanRelations
> {
  constructor(
    @inject('datasources.mascotafelizds') dataSource: MascotafelizdsDataSource,
  ) {
    super(Plan, dataSource);
  }
}
