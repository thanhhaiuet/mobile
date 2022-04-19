import { EContextException } from '@constants/exception.constants';

import { ExceptionCustom, getExceptionContext } from '../http-exception';

export namespace UserException {
	@ExceptionCustom.ContextException(getExceptionContext(EContextException.USER, 'GENERAL'))
	export class General implements ExceptionCustom.ITypeException {
		'user-not-existed' = 'User did not existed';
		'owner-project-process' = 'Users who have submitted / published a project';
	}

	@ExceptionCustom.ContextException(getExceptionContext(EContextException.USER, 'UPDATE'))
	export class UpdateUser implements ExceptionCustom.ITypeException {
		'account-blocked' = 'Account has been blocked';
		'account-deleted' = 'Account has been deleted';
		'username-existed' = 'Username has existed';
		'password-incorrect' = 'Password is incorrect';
		'email-existed' = 'Email existed';
	}
}
