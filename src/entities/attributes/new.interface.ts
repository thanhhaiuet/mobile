import { IBaseIncludeDateAttribute } from './base-attribute.interface';

export interface INewAttribute extends IBaseIncludeDateAttribute {
  author: string;
  source: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: Date;
  content: string;
  categoryId: number;
}
