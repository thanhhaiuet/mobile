export interface IBaseAttribute {
  id: string;
}

export interface IBaseIncludeDateAttribute extends IBaseAttribute {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface IBaseExcludeIdAttribute {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
