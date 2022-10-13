import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '@entities/user.entity';

import { httpNotFound } from '@shared/exceptions/http-exception';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>) { }
  async getUser(id: string) {
    const user = await this.userRepo.findOne({ id });

    if (!user) httpNotFound('User is not exist!');

    return user;
  }
}
