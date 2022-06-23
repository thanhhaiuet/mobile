import { IBaseIncludeDateAttribute } from './base-attribute.interface';

export interface ITimeAttribute extends IBaseIncludeDateAttribute {
	timeStart: Date;
	dayOfWeek: number;
	userId: string;
}
