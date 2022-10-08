import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { ETableName } from '@constants/entity.constants';

import { BaseEntityIncludeTime } from '@core/base-entity';

import { UserEntity } from './user.entity';
import { IProductAttribute } from './attributes/product.interface';
import { EStatusProduct } from '@constants/api.constants';

@Entity({ name: ETableName.COMMENT })
export class ProductEntity extends BaseEntityIncludeTime implements IProductAttribute {
  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: '50' })
  userId: string;

  @Column({ type: 'varchar', length: '50', name: 'user_receive_id' })
  userReceiveId: string;

  @Column({ type: 'varchar', length: '500' })
  name: string;

  @Column({ type: 'tinyint' })
  status: EStatusProduct;

  @Column({ type: 'date', name: 'time_complete' })
  timeComplete: Date;


  @ManyToOne(() => UserEntity, user => user.products)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
