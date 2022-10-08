import { EStatusProduct } from '@constants/api.constants';
import { IBaseIncludeDateAttribute } from './base-attribute.interface';

export interface IProductAttribute extends IBaseIncludeDateAttribute {
  description: string;
  userId: string;
  userReceiveId: string;
  name: string;
  timeComplete: Date;
  status: EStatusProduct;
}
