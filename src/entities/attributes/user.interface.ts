import { EGender, EUserStatus } from '@constants/entity.constants';

import { IBaseIncludeDateAttribute } from './base-attribute.interface';

export interface IUserAttribute extends IBaseIncludeDateAttribute {
  email: string;
  password: string;
  username: string;
}
