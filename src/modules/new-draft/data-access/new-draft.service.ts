import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NewDraftEntity } from '@entities/new-draft.entity';
import { NewEntity } from '@entities/new.entity';

import { httpNotFound } from '@shared/exceptions/http-exception';
import { getNowUtc } from '@shared/utils/time.utils';

import { saveNewDraftReqDto } from './dto/new-draft-req.dto';

@Injectable()
export class NewDraftService {
	constructor(
		@InjectRepository(NewDraftEntity) private readonly newDraftRepo: Repository<NewDraftEntity>,
		@InjectRepository(NewEntity) private readonly newRepo: Repository<NewEntity>,
	) {}

	async getNewDraft(userId: string) {
		const drafts = await this.newDraftRepo.find({ where: { userId }, relations: ['new'] });

		return drafts.map(draft => draft.new);
	}

	async saveNewDraft(userId: string, body: saveNewDraftReqDto) {
		const news = await this.newRepo.findOne({ url: body.url });

		if (!news) {
			const newInfo = this.newRepo.create({ ...body, source: JSON.stringify(body.source) });

			const saveNew = await this.newRepo.save(newInfo);

			const newDraft = this.newDraftRepo.create({ userId, newId: saveNew.id });

			return this.newDraftRepo.save(newDraft);
		}

		const newDraft = this.newDraftRepo.create({ userId, newId: news.id });

		return this.newDraftRepo.save(newDraft);
	}

	async delete(url: string, userId: string) {
		const news = await this.newRepo.findOne({ url });
    
    console.log(123);
    

		if (!news) httpNotFound('Record is not exist!');

		const newDraft = await this.newDraftRepo.findOne({ userId, newId: news.id });

		if (!newDraft) httpNotFound('Record is not exist!');

		newDraft.deletedAt = getNowUtc();

		return this.newDraftRepo.save(newDraft);
	}

	async getDetailDraft(userId: string, url: string) {
		const news = await this.newRepo.findOne({ url });

		if (!news) httpNotFound('Record is not exist!');

		const draft = await this.newDraftRepo.findOne({ userId, newId: news.id });

		if (!draft) httpNotFound('Draft is not exist!');

		return draft;
	}
}

