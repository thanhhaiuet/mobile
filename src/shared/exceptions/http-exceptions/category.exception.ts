import { EContextException } from '@constants/exception.constants';

import { ExceptionCustom, getExceptionContext } from '../http-exception';

export namespace CategoryException {
	@ExceptionCustom.ContextException(getExceptionContext(EContextException.CATEGORY, 'GENERAL'))
	export class General implements ExceptionCustom.ITypeException {
		'not-found-category' = 'Not found category';
	}
}
