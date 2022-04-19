import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

import { EUserRole } from '@constants/api.constants';

import { IJwtPayload } from '@modules/auth/data-access/interfaces/auth.interface';

export class AdminGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const { user } = context.switchToHttp().getRequest() as {
			user: IJwtPayload;
		};
		if (user.role !== EUserRole.ADMIN) return false;

		return true;
	}
}
