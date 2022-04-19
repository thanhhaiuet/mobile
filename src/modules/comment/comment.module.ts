import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentEntity } from '@entities/comment.entity';
import { NewEntity } from '@entities/new.entity';
import { UserEntity } from '@entities/user.entity';

import { CommentController } from './comment.controller';
import { CommentService } from './data-access/comment.service';

@Module({
	imports: [TypeOrmModule.forFeature([CommentEntity, NewEntity, UserEntity])],
	providers: [CommentService],
	controllers: [CommentController],
})
export class CommentModule {}
