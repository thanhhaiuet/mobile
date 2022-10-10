import { EStatusProduct } from '@constants/api.constants';

import { IBaseIncludeDateAttribute } from './base-attribute.interface';

export interface IProductAttribute extends IBaseIncludeDateAttribute {
	description: string;
	userId: string;
	name: string;
	timeComplete: number;
	status: EStatusProduct;
	priceStart: number;
	priceEnd: number;
	categoryId: string;
}
