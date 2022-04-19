import { EDirection } from '@constants/api.constants';

export interface IPagination {
	limit: number;
	page: number;
	sortBy?: string;
	direction?: EDirection;
}

export interface IRange {
	from: number | string; // string with date
	to: number | string; // string with date
}
