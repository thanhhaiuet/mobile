import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { ETableName } from '@constants/entity.constants';

import { BaseEntityIncludeTime } from '@core/base-entity';

import { ICommentAttribute } from './attributes/comment.interface';
import { NewEntity } from './new.entity';
import { UserEntity } from './user.entity';

@Entity({ name: ETableName.COMMENT })
export class CommentEntity extends BaseEntityIncludeTime implements ICommentAttribute {
	@Column({ type: 'text' })
	content: string;

	@Column({ type: 'varchar', length: '50', name: 'user_id' })
	userId: string;

	@Column({ type: 'varchar', length: '50', name: 'new_id' })
	newId: string;

	@ManyToOne(() => NewEntity, news => news.comments)
	@JoinColumn({ name: 'new_id' })
	new: NewEntity;

	@ManyToOne(() => UserEntity, user => user.comments)
	@JoinColumn({ name: 'user_id' })
	user: UserEntity;
}
