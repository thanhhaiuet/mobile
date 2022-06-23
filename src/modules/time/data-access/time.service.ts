import { Injectable } from '@nestjs/common';

import { getDayOfWeek } from '@shared/utils/time.utils';

import { SaveTimeReqDto } from './time-req.dto';
import { TimeRepository } from './time.repository';

@Injectable()
export class TimeService {
	constructor(private readonly timeRepo: TimeRepository) {}

	async getTime() {
		const dayOfWeekNow = getDayOfWeek();
		return this.timeRepo.getTime(dayOfWeekNow);
	}

	async saveTime(userId: string, body: SaveTimeReqDto) {
		const dayOfWeek = getDayOfWeek();
		const pareDate = new Date(body.timeStart);

		const a = new Date(pareDate.getTime() + 7 * 60 * 60 * 1000);

		const newTime = this.timeRepo.create({ ...body, dayOfWeek, userId, timeStart: a });

		return this.timeRepo.save(newTime);
	}
}
