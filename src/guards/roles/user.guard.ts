import { CanActivate, ExecutionContext } from '@nestjs/common';
import { getRepository } from 'typeorm';

import { EUserRole } from '@constants/api.constants';
import { EError } from '@constants/error.constants';

import { UserEntity } from '@entities/user.entity';

import { IJwtPayload } from '@modules/auth/data-access/interfaces/auth.interface';

import { httpBadRequest } from '@shared/exceptions/http-exception';

export class UserGuard implements CanActivate {
	async canActivate(context: ExecutionContext) {
		const { user } = context.switchToHttp().getRequest() as {
			user: IJwtPayload;
		};
		if (user.role !== EUserRole.USER) return false;

		const userExisted = await this.getUser(user.userId);

		if (userExisted.privacyUpdatedTimes !== user.privacyUpdatedTimes) {
			httpBadRequest('Token invalid.', EError.E_102);
		}

		return true;
	}

	getUser(userId: string) {
		return getRepository(UserEntity).findOne({
			where: { id: userId },
			select: ['id', 'privacyUpdatedTimes'],
		});
	}
}
