import {
	registerDecorator,
	ValidationArguments,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isNotEqualsTo', async: false })
class IsNotEqualToConstraint implements ValidatorConstraintInterface {
	validate(value, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
		const [relatedPropertyName] = validationArguments.constraints;
		if (value === validationArguments.object[relatedPropertyName]) return false;
		return true;
	}
	defaultMessage(validationArguments?: ValidationArguments): string {
		return `${validationArguments.property} match ${validationArguments.constraints[0]}`;
	}
}

export function IsNotEqualsTo(property: string, validationOptions?: ValidationOptions) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			target: object.constructor,
			propertyName,
			options: validationOptions,
			constraints: [property],
			validator: IsNotEqualToConstraint,
		});
	};
}
