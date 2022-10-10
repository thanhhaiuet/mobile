import { IBaseIncludeDateAttribute } from './base-attribute.interface';

export interface ICategoryAttribute extends IBaseIncludeDateAttribute {
	parentId: string;
	name: string;
}
