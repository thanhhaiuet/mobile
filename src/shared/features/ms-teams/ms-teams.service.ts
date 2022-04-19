import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

import { EEnvKey } from '@constants/env.constants';

@Injectable()
export class MsTeamsService {
  private logger = new Logger(MsTeamsService.name);
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async sendErrLog(message: any): Promise<any> {
    try {
      if (this.configService.get('NODE_ENV') != 'development') {
        return;
      }
      const teamWebhook = this.configService.get<string>(
        '',
      );
      return await lastValueFrom(this.httpService.post(teamWebhook, message));
    } catch (error) {
      this.logger.error(error);
    }
  }
}
