import { Body, Controller, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { EUserRole } from '@constants/api.constants';

import { IJwtPayload } from '@modules/auth/data-access/interfaces/auth.interface';

import { HttpGet, HttpPost } from '@shared/decorators/controllers.decorator';

import { SaveTimeReqDto } from './data-access/time-req.dto';
import { TimeService } from './data-access/time.service';

@Controller('time')
@ApiTags('TIME')
export class TimeController {
	constructor(private readonly timeService: TimeService) {}

	@HttpGet('', { guard: EUserRole.USER })
	getTime(@Req() req) {
		const userId = (req.user as IJwtPayload).userId;

		return this.timeService.getTime();
	}

	@HttpPost('', { guard: EUserRole.USER })
	saveTime(@Body() body: SaveTimeReqDto, @Req() req) {
		const userId = (req.user as IJwtPayload).userId;
		return this.timeService.saveTime(userId, body);
	}
}
