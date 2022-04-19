import {
	registerDecorator,
	ValidationArguments,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isEqualsTo', async: false })
class IsEqualToConstraint implements ValidatorConstraintInterface {
	validate(value, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
		const [relatedPropertyName] = validationArguments.constraints;
		if (value !== validationArguments.object[relatedPropertyName]) return false;
		return true;
	}
	defaultMessage(validationArguments?: ValidationArguments): string {
		return `${validationArguments.property} does not match ${validationArguments.constraints[0]}`;
	}
}

export function IsEqualsTo(property: string, validationOptions?: ValidationOptions) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			target: object.constructor,
			propertyName,
			options: validationOptions,
			constraints: [property],
			validator: IsEqualToConstraint,
		});
	};
}
