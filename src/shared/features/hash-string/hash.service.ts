import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { compare, hash } from 'bcrypt';

import { EEnvKey } from '@constants/env.constants';

@Injectable()
export class HashService {
  constructor(private configService: ConfigService) {}

  hashString(value: string): Promise<string> {
    const saltRounds =
      this.configService.get<number>(EEnvKey.BCRYPT_ROUND) || 10;
    return hash(value, saltRounds);
  }

  async check(value: string, hashValue: string): Promise<boolean> {
    return await compare(value, hashValue);
  }
}
