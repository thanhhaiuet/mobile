import { ETableName } from "@constants/entity.constants";
import { BaseEntityIncludeTime } from "@core/base-entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { INewDraftAttribute } from "./attributes/new_draft.interface";
import { NewEntity } from "./new.entity";
import { UserEntity } from "./user.entity";

@Entity({name: ETableName.NEW_DRAFTS})

export class NewDraftEntity extends BaseEntityIncludeTime implements INewDraftAttribute{

  @Column({name: 'user_id', type: 'varchar', length: '50'})
  userId: string;

  @Column({name: 'new_id', type: 'varchar', length: '50'})
  newId: string;

  @ManyToOne(() => NewEntity, news => news.new_drafts)
  @JoinColumn({name: 'new_id'})
  new: NewEntity;

  @ManyToOne(() => UserEntity, user => user.new_drafts)
  @JoinColumn({name: 'user_id'})
  user: UserEntity;
}