import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CommentEntity } from '@entities/comment.entity';
import { NewEntity } from '@entities/new.entity';

import { addCommentREqDto } from './dto/comment-req.dto';

@Injectable()
export class CommentService {
	constructor(
		@InjectRepository(CommentEntity) private readonly commentRepo: Repository<CommentEntity>,
		@InjectRepository(NewEntity) private readonly newRepo: Repository<NewEntity>,
	) {}

	async getComment(userId: string) {
		return this.commentRepo.find({
			where: { userId },
			order: {
				createdAt: 'DESC',
			},
		});
	}

	async saveComment(userId: string, body: addCommentREqDto) {
		const { id, url } = body;

		let newId;

		if (id) {
			newId = id;
			return;
		}

		const news = await this.newRepo.findOne({ url });

		newId = news.id;

		const newComment = this.commentRepo.create({ ...body, newId: newId, userId });

		await this.commentRepo.save(newComment);
	}
}
