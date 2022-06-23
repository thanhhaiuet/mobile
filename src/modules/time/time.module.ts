import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TimeEntity } from '@entities/time.entity';

import { TimeRepository } from './data-access/time.repository';
import { TimeService } from './data-access/time.service';
import { TimeController } from './time.controller';

@Module({
	imports: [TypeOrmModule.forFeature([TimeRepository, TimeEntity])],
	providers: [TimeService],
	controllers: [TimeController],
})
export class TimeModule {}
