import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DonationEntity } from '@entities/donation.entity';

import { httpNotFound } from '@shared/exceptions/http-exception';
import { getNowUtc } from '@shared/utils/time.utils';

import { deleteDonationReqDto, saveDonationReqDto } from './req.dto';

@Injectable()
export class DonationService {
	constructor(@InjectRepository(DonationEntity) private readonly donationRepo: Repository<DonationEntity>) {}

	async getAllDonation() {
		return this.donationRepo.find({ order: { upVotes: 'ASC' } });
	}

	async saveDonation(body: saveDonationReqDto) {
		const findMaxVote = await this.donationRepo.findOne({ order: { upVotes: 'DESC' } });

		console.log(findMaxVote);

		const newDonation = this.donationRepo.create({ ...body, upVotes: findMaxVote.upVotes + 1 });
		console.log(newDonation);

		return this.donationRepo.save(newDonation);
	}

	async deleteOne(id: string) {
		const donation = await this.donationRepo.findOne({ id });

		if (!donation) httpNotFound('record is not exxist!');

		donation.deletedAt = getNowUtc();

		return this.donationRepo.save(donation);
	}

	async delete() {
		const donations = await this.donationRepo.find();

		const newDonations = donations.map(donation => {
			donation.deletedAt = getNowUtc();
			return donation;
		});

		return this.donationRepo.save(newDonations);
	}
}
