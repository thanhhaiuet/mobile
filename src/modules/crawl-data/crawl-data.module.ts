import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CrawlDataController } from './crawl-data.controller';
import { CrawlDataService } from './data-access/crawl-data.service';

@Module({
  imports: [HttpModule],
  providers: [CrawlDataService],
  controllers: [CrawlDataController],
  exports: [CrawlDataService],
})
export class CrawlDataModule {}
