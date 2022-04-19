import { IBaseIncludeDateAttribute } from './base-attribute.interface';

export interface INewDraftAttribute extends IBaseIncludeDateAttribute {
  userId: string;
  newId: string;
}
