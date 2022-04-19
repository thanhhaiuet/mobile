import { EContextException } from '@constants/exception.constants';

import { ExceptionCustom, getExceptionContext } from '../http-exception';

export namespace AdminSettingException {
	@ExceptionCustom.ContextException(getExceptionContext(EContextException.ADMIN_SETTINGS, 'GENERAL'))
	export class General implements ExceptionCustom.ITypeException {
		'mail-address-not-found' = 'Mail Address Not Found';
	}
}
