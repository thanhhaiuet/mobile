import { IBaseIncludeDateAttribute } from './base-attribute.interface';

export interface IEstimateAttribute extends IBaseIncludeDateAttribute {
	productId: string;
	userId: string;
	isChoose: boolean;
	price: number;
	timeComplete: number;
}
