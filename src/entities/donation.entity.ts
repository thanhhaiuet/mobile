import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { ETableName } from '@constants/entity.constants';

import { BaseEntityIncludeTime } from '@core/base-entity';

import { IDonationAttribute } from './attributes/donation.interface';

@Entity({ name: ETableName.DONATION })
export class DonationEntity extends BaseEntityIncludeTime implements IDonationAttribute {
	@Column({ type: 'int', name: 'up_votes' })
	upVotes: number;

	@Column({ type: 'varchar', length: '50' })
	method: string;

	@Column({ type: 'int' })
	amount: number;
}
