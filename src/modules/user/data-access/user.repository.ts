import { ETableName } from "@constants/entity.constants";
import { BaseRepository } from "@core/base-repository";
import { UserEntity } from "@entities/user.entity";
import { EntityRepository } from "typeorm";

@EntityRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {
  protected alias: ETableName = ETableName.USERS;

  async test() {
    // const qb = await this.createQueryBuilder(ETableName.USERS).select([`${this.alias}.id`]).getMany();

    const qb = this.createQb();
    qb.select([`${this.alias}.id`]);

    return qb.getMany();
  }



}