import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NewDraftEntity } from '@entities/new-draft.entity';
import { NewEntity } from '@entities/new.entity';

import { NewDraftService } from './data-access/new-draft.service';
import { NewDraftController } from './new-draft.controller';

@Module({
	imports: [TypeOrmModule.forFeature([NewDraftEntity, NewEntity])],
	providers: [NewDraftService],
	controllers: [NewDraftController],
})
export class NewDraftModule {}
