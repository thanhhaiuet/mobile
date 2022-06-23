import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { In, Repository } from 'typeorm';

import { CommentEntity } from '@entities/comment.entity';
import { NewEntity } from '@entities/new.entity';

import { httpNotFound } from '@shared/exceptions/http-exception';

import { addCommentREqDto } from './dto/comment-req.dto';

@Injectable()
export class CommentService {
	constructor(
		@InjectRepository(CommentEntity) private readonly commentRepo: Repository<CommentEntity>,
		@InjectRepository(NewEntity) private readonly newRepo: Repository<NewEntity>,
	) {}

	async getComment(url: string) {
		const news = await this.newRepo.findOne({ url });

		if (!news) httpNotFound('Record is nots exist');

		const comments = await this.commentRepo.find({
			where: { newId: news.id },
			order: {
				createdAt: 'DESC',
			},
			relations: ['user'],
		});

		return comments.map(comment => {
			return {
				id: comment.id,
				name: comment?.user.username,
				commentText: comment?.content,
				submitTime: dayjs(comment.createdAt).format('YYYY-MM-DD HH:MM'),
			};
		});
	}

	async saveComment(userId: string, body: addCommentREqDto) {
		const { url } = body;

		const news = await this.newRepo.findOne({ url });

		if (!news) {
			const newInfo = this.newRepo.create({
				...body,
				source: JSON.stringify(body.source),
				publishedAt: dayjs(body.publishedAt).format('YYYY-MM-DD'),
			});

			const saveNew = await this.newRepo.save(newInfo);

			const newComment = this.commentRepo.create({ userId, newId: saveNew.id, content: body.comment });

			return this.commentRepo.save(newComment);
		}

		const newComment = this.commentRepo.create({ ...body, newId: news.id, userId, content: body.comment });

		await this.commentRepo.save(newComment);
	}

	async listComment(userId: string) {
		const comments = await this.commentRepo.find({ where: { userId }, select: ['newId'] });

		const newIds = [...new Set(comments.map(comment => comment.newId))];

		const news = await this.newRepo.find({ where: { id: In(newIds) }, relations: ['comments'] });

		return news;
	}
}
