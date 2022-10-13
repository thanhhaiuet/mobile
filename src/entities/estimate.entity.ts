import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { ETableName } from '@constants/entity.constants';

import { BaseEntityIncludeTime } from '@core/base-entity';

import { IEstimateAttribute } from './attributes/estimate-attribute.interface';
import { ProductEntity } from './product.entity';
import { UserEntity } from './user.entity';

@Entity({ name: ETableName.ESTIMATE })
export class EstimateEntity extends BaseEntityIncludeTime implements IEstimateAttribute {
  @Column({ type: 'varchar', name: 'user_id' })
  userId: string;

  @Column({ type: 'varchar', name: 'product_id' })
  productId: string;

  @Column({ type: 'boolean', name: 'is_choose', default: null })
  isChoose: boolean;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'int', name: 'time_complete' })
  timeComplete: number;

  @ManyToOne(() => ProductEntity, product => product.estimates)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @ManyToOne(() => UserEntity, user => user.estimates)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
