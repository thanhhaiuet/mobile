import { EntityRepository } from 'typeorm';

import { ETableName } from '@constants/entity.constants';

import { BaseRepository } from '@core/base-repository';

import { TimeEntity } from '@entities/time.entity';

import { formatDate } from '@shared/utils/time.utils';

@EntityRepository(TimeEntity)
export class TimeRepository extends BaseRepository<TimeEntity> {
	protected alias: ETableName = ETableName.TIME;

	async getTime(dayOfWeekNow: number) {
		// const qb = this.createQb();

		// const selects = ]
		// unix_timestamp(${this.alias}.timeStart) * 1000 - unix_timestamp(${this.alias}.createdAt) * 1000

		let selects = [];

		for (let i = dayOfWeekNow; i >= 1; i--) {
			selects = [
				...selects,
				`SUM(CASE WHEN (DATE(${this.alias}.createdAt) = DATE(date_sub(NOW(), interval ${dayOfWeekNow - i} day)) ) and ${
					this.alias
				}.dayOfWeek = ${i} THEN (unix_timestamp(${this.alias}.createdAt) - unix_timestamp(${
					this.alias
				}.timeStart))  ELSE 0 END) as total`,
			];
		}

		const result = await Promise.all(
			selects.map(async (item, index) => {
				const qb = this.createQb();
				qb.select([item, `${this.alias}.id as id`]);
				const data = await qb.getRawOne();
				data.time = formatDate(new Date(Date.now() - 24 * 60 * 60 * index), 'YYYY-MM-DD');
				data.dayOfWeek = dayOfWeekNow - index;
				return data;
			}),
		);

		console.log(result);

		// qb.select(selects).addSelect(`${this.alias}.id`);
		return result;
	}
}
