import { IBaseIncludeDateAttribute } from './base-attribute.interface';

export interface IDonationAttribute extends IBaseIncludeDateAttribute {
	upVotes: number;
	method: string;
	amount: number;
}
