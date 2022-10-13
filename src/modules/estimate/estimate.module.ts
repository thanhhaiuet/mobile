import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EstimateRepository } from './data-access/estimate.repository';
import { EstimateService } from './data-access/estimate.service';
import { EstimateController } from './estimate.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EstimateRepository])],
  controllers: [EstimateController],
  providers: [EstimateService],
})
export class EstimateModule { }
