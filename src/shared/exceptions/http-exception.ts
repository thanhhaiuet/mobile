import {
	BadRequestException,
	ConflictException,
	ForbiddenException,
	HttpException,
	HttpStatus,
	InternalServerErrorException,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';

import { EError } from '@constants/error.constants';

type HttpStatusKeys = keyof typeof HttpStatus;

const httpErrorSymbol = Symbol('error:http');

export interface IResponseException {
	context: string;
	type: string;
	message: string;
}

export namespace ExceptionCustom {
	export interface ITypeException {
		[key: string]: any;
	}

	export function ContextException(context: string) {
		return function (constructor: Function) {
			Reflect.defineMetadata(httpErrorSymbol, context, constructor);
		};
	}
}

export function httpException<T extends ExceptionCustom.ITypeException>(
	TargetClass: new () => T,
	statusCode: HttpStatusKeys,
	type: keyof T,
) {
	const instance = new TargetClass();
	throw new HttpException(
		{
			context: Reflect.getMetadata(httpErrorSymbol, TargetClass),
			type,
			message: instance[type],
		} as IResponseException,
		HttpStatus[statusCode],
	);
}

export function httpExceptionCustom(data: IResponseException, status: number) {
	throw new HttpException(data, status);
}

export function getExceptionContext(namespace: string, contextName?: string) {
	return namespace + (contextName ? `_${contextName}` : '');
}

// 400
export function httpBadRequest(message?: string, code?: string) {
	throw new BadRequestException({
		statusCode: 400,
		errorCode: code || EError.E_100,
		message,
	});
}

// 401
export function httpUnAuthorized(message?: string) {
	throw new UnauthorizedException(message);
}

// 403
export function httpForbidden(message?: string) {
	throw new ForbiddenException(message);
}

// 404
export function httpNotFound(message?: string) {
	throw new NotFoundException(message);
}

export function httpConflict(message?: string) {
	throw new ConflictException(message);
}

// 500
export function httpInternalServerError(message?: string) {
	throw new InternalServerErrorException(message);
}
