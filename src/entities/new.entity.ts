import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { ETableName } from '@constants/entity.constants';

import { BaseEntityIncludeTime } from '@core/base-entity';

import { INewAttribute } from './attributes/new.interface';
import { CommentEntity } from './comment.entity';
import { NewDraftEntity } from './new-draft.entity';

@Entity({ name: ETableName.NEW })

export class NewEntity
  extends BaseEntityIncludeTime
  implements INewAttribute
{
 @Column({type: 'varchar', length: '512', nullable: true})
 author: string;

 @Column({type: 'varchar', length: '512', nullable: true})
 title: string;

 @Column({type: 'text', nullable: true})
 description: string;

 @Column({type: 'json'})
 source: string;

 @Column({type: 'varchar', length: '255'})
 url: string;

 @Column({type: 'varchar', length: '255'})
 urlToImage: string;

 @Column({type: 'text'})
 content: string;

 @Column({type: 'date'})
 publishedAt: Date;

 @Column({type: 'int'})
 categoryId: number;

 @OneToMany(() => CommentEntity, comment => comment.new)
 comments: CommentEntity[];

 @OneToMany(() => NewDraftEntity, newDraft => newDraft.new)
 new_drafts: NewDraftEntity[];

}
