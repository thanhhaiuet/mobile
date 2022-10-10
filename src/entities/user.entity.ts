import { Column, Entity, OneToMany } from 'typeorm';

import { ETableName } from '@constants/entity.constants';

import { BaseEntityIncludeTime } from '@core/base-entity';

import { IUserAttribute } from './attributes/user.interface';
import { EstimateEntity } from './estimate.entity';
import { ProductEntity } from './product.entity';

@Entity({ name: ETableName.USERS })
export class UserEntity extends BaseEntityIncludeTime implements IUserAttribute {
	@Column({ type: 'text' })
	email: string;

	@Column({ type: 'varchar', length: '255' })
	password: string;

	@Column({ type: 'varchar', length: '255' })
	username: string;

	@Column({ type: 'varchar', length: '11' })
	phone: string;

	@Column({
		name: 'privacy_updated_times',
		type: 'int',
		width: 11,
		nullable: true,
		default: 0,
	})
	privacyUpdatedTimes: number;

	@OneToMany(() => ProductEntity, product => product.user)
	products: ProductEntity[];

	@OneToMany(() => EstimateEntity, estimate => estimate.user)
	estimates: EstimateEntity[];
}
