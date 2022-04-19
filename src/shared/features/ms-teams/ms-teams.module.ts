import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MsTeamsService } from './ms-teams.service';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [MsTeamsService],
  exports: [MsTeamsService],
})
export class MsTeamsModule {}
