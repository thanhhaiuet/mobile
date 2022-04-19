import { Controller, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HttpGet } from '@shared/decorators/controllers.decorator';
import { CrawlDataService } from './data-access/crawl-data.service';
import {  getNewsSourcesReqDto, getSearchNewsReqDto, getTopHeadlinesReqDto } from './data-access/dto/crawl-data-req.dto';

@ApiTags('Crawl')
@Controller('crawl-data')
export class CrawlDataController {
  constructor(private readonly crawlDataService: CrawlDataService) {}

  @HttpGet('top-headline', { isPublic: true, validateQuery: getTopHeadlinesReqDto })
  getTopHeadlines(@Query() query: getTopHeadlinesReqDto) {
    return this.crawlDataService.getTopHeadlines(query);
  }

  @HttpGet('search-new', { isPublic: true, validateQuery: getSearchNewsReqDto})
  getSearchNews(@Query() query: getSearchNewsReqDto) {
    return this.crawlDataService.getSearchNews(query)
  }

  @HttpGet('sources', { isPublic: true, validateQuery: getNewsSourcesReqDto})
  getNewsSources(@Query() query: getNewsSourcesReqDto) {
    return this.crawlDataService.getNewsSources(query);
  }
  
}
