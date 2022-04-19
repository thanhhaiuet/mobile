import {
	applyDecorators,
	ClassSerializerInterceptor,
	Delete,
	Get,
	Patch,
	Post,
	Put,
	UseGuards,
	UseInterceptors,
	UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { EUserRole } from '@constants/api.constants';

import { GuardPublic } from '@guards/guard.decorator';
import { AdminGuard } from '@guards/roles/admin.guard';
import { UserGuard } from '@guards/roles/user.guard';

import { ConvertHttpQueryPipe } from '@shared/pipes/convert-http-query.pipe';
import { ValidationBodyPipe, ValidationQueryPipe } from '@shared/pipes/validation.pipe';

interface IHttpMethodOptions {
	isPublic?: boolean;
	validateQuery?: Function | Function[];
	guard?: EUserRole; // TODO guard
	addClassSerializer?: boolean;
}

interface IHttpMethodHasBodyOptions extends IHttpMethodOptions {
	exValidateBody?: boolean;
}

function initializeDecorators(options?: IHttpMethodOptions) {
	const optionDecorators = [];

	if (options?.isPublic) {
		optionDecorators.push(GuardPublic());
	} else {
		optionDecorators.push(ApiBearerAuth());
	}

	if (options?.validateQuery) {
		let validateQueries = options.validateQuery as Function[];
		if (!options?.validateQuery?.length) {
			validateQueries = [options.validateQuery as Function];
		}
		optionDecorators.push(UsePipes(new ConvertHttpQueryPipe(...validateQueries)), UsePipes(ValidationQueryPipe));
	}

	if (options?.addClassSerializer) {
		optionDecorators.push(UseInterceptors(ClassSerializerInterceptor));
	}

	if (options?.guard) {
		optionDecorators.push(UseGuards(getGuard(options.guard)));
	}

	return optionDecorators;
}

export function HttpPost(path?: string | string[], options?: IHttpMethodHasBodyOptions) {
	const optionDecorators = initializeDecorators(options);

	if (!options?.exValidateBody) {
		optionDecorators.push(UsePipes(ValidationBodyPipe));
	}
	return applyDecorators(Post(path), ...optionDecorators);
}

export function HttpPut(path?: string | string[], options?: IHttpMethodHasBodyOptions) {
	const optionDecorators = initializeDecorators(options);

	if (!options?.exValidateBody) {
		optionDecorators.push(UsePipes(ValidationBodyPipe));
	}
	return applyDecorators(Put(path), ...optionDecorators);
}

export function HttpPatch(path?: string | string[], options?: IHttpMethodHasBodyOptions) {
	const optionDecorators = initializeDecorators(options);

	if (!options?.exValidateBody) {
		optionDecorators.push(UsePipes(ValidationBodyPipe));
	}
	return applyDecorators(Patch(path), ...optionDecorators);
}

export function HttpGet(path?: string | string[], options?: IHttpMethodOptions) {
	const optionDecorators = initializeDecorators(options);
	return applyDecorators(Get(path), ...optionDecorators);
}

export function HttpDelete(path?: string | string[], options?: IHttpMethodOptions) {
	const optionDecorators = initializeDecorators(options);
	return applyDecorators(Delete(path), ...optionDecorators);
}

function getGuard(role: EUserRole) {
	switch (role) {
		case EUserRole.ADMIN:
			return AdminGuard;
		case EUserRole.USER:
			return UserGuard;
		default:
			break;
	}
}
