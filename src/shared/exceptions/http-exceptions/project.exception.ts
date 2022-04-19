import { EContextException } from '@constants/exception.constants';

import { ExceptionCustom, getExceptionContext } from '../http-exception';

export namespace ProjectException {
	@ExceptionCustom.ContextException(getExceptionContext(EContextException.PROJECT, 'GENERAL'))
	export class General implements ExceptionCustom.ITypeException {
		'can-not-found-project' = 'Can not found project';
	}
	@ExceptionCustom.ContextException(getExceptionContext(EContextException.PROJECT, 'CREATE_PROJECT'))
	export class CreateProject implements ExceptionCustom.ITypeException {
		'urlName-existed' = 'Url name existed';
	}

	@ExceptionCustom.ContextException(getExceptionContext(EContextException.PROJECT, 'UPDATE_PROJECT'))
	export class UpdateProject implements ExceptionCustom.ITypeException {
		'urlName-existed' = 'Url name existed';
		'can-not-update-time' = 'Can not update time';
	}
}
