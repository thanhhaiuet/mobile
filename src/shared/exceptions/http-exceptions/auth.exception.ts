import { EContextException } from '@constants/exception.constants';

import { ExceptionCustom, getExceptionContext } from '../http-exception';

export namespace AuthException {
	@ExceptionCustom.ContextException(getExceptionContext(EContextException.AUTH, 'GENERAL'))
	export class General implements ExceptionCustom.ITypeException {
		'email-existed' = 'Email existed';
		'username-existed' = 'Username existed';
		'not-found-user' = 'Can not found user';
		'account-blocked' = 'Account blocked';
		'account-not-existed' = 'Account did not exist';
		'not-verified-yet' = 'Account have not verified yet';
	}

	@ExceptionCustom.ContextException(getExceptionContext(EContextException.AUTH, 'REGISTER'))
	export class Register implements ExceptionCustom.ITypeException {
		'password-not-match-re-password' = 'Password does not match re password';
	}

	@ExceptionCustom.ContextException(getExceptionContext(EContextException.AUTH, 'LOGIN'))
	export class Login implements ExceptionCustom.ITypeException {
		'wrong-password' = 'Wrong password';
	}

	@ExceptionCustom.ContextException(getExceptionContext(EContextException.AUTH, 'CHANGE_PASSWORD'))
	export class CHangePassword implements ExceptionCustom.ITypeException {
		'new-password-not-match-re-new-password' = 'New password does not match re new password';
		'old-password-wrong' = 'Old password is not correct';
	}
}
