import { EContextException } from '@constants/exception.constants';

import { ExceptionCustom, getExceptionContext } from '../http-exception';

export namespace ExampleException {
	@ExceptionCustom.ContextException(getExceptionContext(EContextException.EXAMPLE, 'GENERAL'))
	export class General implements ExceptionCustom.ITypeException {
		'example-error' = 'Example error';
	}
}
