import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '@entities/user.entity';

import { UserRepository } from './data-access/user.repository';
import { UserService } from './data-access/user.service';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, UserEntity]), HttpModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule { }
