import { Column, Entity, OneToMany } from 'typeorm';

import { EGender, ETableName, EUserStatus } from '@constants/entity.constants';

import { BaseEntityIncludeTime } from '@core/base-entity';

import { IUserAttribute } from './attributes/user.interface';
import { CommentEntity } from './comment.entity';
import { NewDraftEntity } from './new-draft.entity';

@Entity({ name: ETableName.USERS })
export class UserEntity
  extends BaseEntityIncludeTime
  implements IUserAttribute
{
  @Column({ type: 'text' })
  email: string;

  @Column({ type: 'varchar', length: '255' })
  password: string;

  @Column({ type: 'varchar', length: '255' })
  username: string;

  @Column({
    name: 'privacy_updated_times',
    type: 'int',
    width: 11,
    nullable: true,
    default: 0,
  })
  privacyUpdatedTimes: number;

  @OneToMany(() => CommentEntity, comment => comment.user)
  comments: CommentEntity[];

  @OneToMany(() => NewDraftEntity, newDraft => newDraft.user)
  new_drafts: NewDraftEntity[];
}
