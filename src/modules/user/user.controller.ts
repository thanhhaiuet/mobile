import { Controller, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { EUserRole } from '@constants/api.constants';

import { IJwtPayload } from '@modules/auth/data-access/interfaces/auth.interface';

import { HttpGet, HttpPost } from '@shared/decorators/controllers.decorator';

import { UserService } from './data-access/user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@HttpGet('', { guard: EUserRole.USER })
	getUser(@Req() req) {
		const userId = (req.user as IJwtPayload).userId;

		return this.userService.getUser(userId);
	}
}
