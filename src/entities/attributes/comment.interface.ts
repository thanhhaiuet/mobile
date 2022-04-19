import { IBaseIncludeDateAttribute } from './base-attribute.interface';

export interface ICommentAttribute extends IBaseIncludeDateAttribute {
  content: string;
  userId: string;
  newId: string;
}
