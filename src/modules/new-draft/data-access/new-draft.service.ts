import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NewDraftEntity } from '@entities/new-draft.entity';
import { NewEntity } from '@entities/new.entity';

import { saveNewDraftReqDto } from './dto/new-draft-req.dto';

@Injectable()
export class NewDraftService {
	constructor(
		@InjectRepository(NewDraftEntity) private readonly newDraftRepo: Repository<NewDraftEntity>,
		@InjectRepository(NewEntity) private readonly newRepo: Repository<NewEntity>,
	) {}

	async getNewDraft(userId: string) {
		return this.newDraftRepo.find({ userId });
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
}
