import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DonationEntity } from '@entities/donation.entity';

import { DonationController } from './donation.controller';
import { DonationService } from './donation.service';

@Module({
	imports: [TypeOrmModule.forFeature([DonationEntity])],
	providers: [DonationService],
	controllers: [DonationController],
	exports: [DonationService],
})
export class DonationModule {}
