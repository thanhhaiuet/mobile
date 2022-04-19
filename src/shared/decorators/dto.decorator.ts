import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
	IsBoolean,
	IsDateString,
	IsEnum,
	IsInt,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	Matches,
	Max,
	MaxLength,
	Min,
	MinLength,
} from 'class-validator';

interface IDtoDecoratorOption {
	optional?: boolean;
	expose?: boolean;
}

interface IDtoOptionsInitDecorators extends IDtoDecoratorOption {
	propertyType?: string | Function | [Function] | Record<string, any>;
}

function initializeDecorators(
	options: IDtoOptionsInitDecorators,
	additionMiddle: (decorators: PropertyDecorator[]) => any,
) {
	const ApiPropertyOpts = {} as ApiPropertyOptions;
	if (options?.optional) {
		ApiPropertyOpts.required = false;
	}
	if (options?.propertyType) {
		ApiPropertyOpts.type = options.propertyType;
	}
	const decorators = [ApiProperty(ApiPropertyOpts)];
	if (options?.expose) {
		decorators.push(Expose());
	}
	additionMiddle(decorators);
	if (options?.optional) {
		decorators.push(IsOptional());
	} else {
		decorators.push(IsNotEmpty());
	}
	return applyDecorators(...decorators);
}

export function DtoEnum(entity: object, options?: IDtoDecoratorOption) {
	return initializeDecorators(options, (decorators: PropertyDecorator[]) => decorators.push(IsEnum(entity)));
}

export function DtoDatetime(options?: IDtoDecoratorOption) {
	return initializeDecorators({ ...options, propertyType: Date }, (decorators: PropertyDecorator[]) =>
		decorators.push(IsDateString()),
	);
}

// Dto string
interface IDtoDecoratorStringOption extends IDtoOptionsInitDecorators {
	minLength?: number;
	maxLength?: number;
	matches?: RegExp;
}

function addStringOption(decorators: PropertyDecorator[], options?: IDtoDecoratorStringOption) {
	if (options?.matches) decorators.push(Matches(options.matches));
	if (typeof options?.maxLength === 'number') decorators.push(MaxLength(options.maxLength));
	if (typeof options?.minLength === 'number') decorators.push(MinLength(options.minLength));
	return decorators;
}

export function DtoString(options?: IDtoDecoratorStringOption) {
	return initializeDecorators(options, (decorators: PropertyDecorator[]) =>
		addStringOption(decorators, options).push(IsString()),
	);
}
//

// Dto number
interface IDtoDecoratorNumberOption extends IDtoOptionsInitDecorators {
	min?: number;
	max?: number;
}

function addNumberOption(decorators: PropertyDecorator[], options?: IDtoDecoratorNumberOption) {
	if (typeof options?.max === 'number') decorators.push(Max(options.max));
	if (typeof options?.min === 'number') decorators.push(Min(options.min));
	return decorators;
}

export function DtoNumber(options?: IDtoDecoratorNumberOption) {
	return initializeDecorators(options, (decorators: PropertyDecorator[]) =>
		addNumberOption(decorators, options).push(IsNumber()),
	);
}

export function DtoInt(options?: IDtoDecoratorNumberOption) {
	return initializeDecorators(options, (decorators: PropertyDecorator[]) =>
		addNumberOption(decorators, options).push(IsInt()),
	);
}

export function DtoId(options?: IDtoOptionsInitDecorators) {
	return initializeDecorators(options, (decorators: PropertyDecorator[]) =>
		addNumberOption(decorators, { ...options, min: 1 }).push(IsInt()),
	);
}
//

export function DtoProp(expose?: boolean, options?: ApiPropertyOptions) {
	return applyDecorators(ApiProperty(options), ...(expose ? [Expose()] : []));
}

export function DtoBoolean(options: IDtoOptionsInitDecorators) {
	return initializeDecorators(options, (decorators: PropertyDecorator[]) => decorators.push(IsBoolean()));
}

export function ResDto(options?: ApiPropertyOptions) {
	return applyDecorators(ApiProperty(options), Expose());
}
