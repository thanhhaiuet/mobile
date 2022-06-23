import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { ETableName } from '@constants/entity.constants';

import { BaseEntityIncludeTime } from '@core/base-entity';

import { ITimeAttribute } from './attributes/time.interface';
import { UserEntity } from './user.entity';

@Entity({ name: ETableName.TIME })
export class TimeEntity extends BaseEntityIncludeTime implements ITimeAttribute {
	@Column({ type: 'datetime', name: 'time_start' })
	timeStart: Date;

	@Column({ type: 'int' })
	dayOfWeek: number;

	@Column({ type: 'varchar', length: '50', name: 'user_id' })
	userId: string;

	@ManyToOne(() => UserEntity, user => user.times)
	@JoinColumn({ name: 'user_id' })
	new: UserEntity;
}
