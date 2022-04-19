import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom, map, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { EEnvKey } from '@constants/env.constants';
import { ICrawlDataRes, IErrorData } from './interfaces/crawl-data.interface';
import { ConfigService } from '@nestjs/config';
import { httpBadRequest } from '@shared/exceptions/http-exception';
import { getNewsSourcesReqDto, getSearchNewsReqDto, getTopHeadlinesReqDto } from './dto/crawl-data-req.dto';
import { apiKey } from '@constants/api.constants';

@Injectable()
export class CrawlDataService {
  constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) {}
 
  async getTopHeadlines(query: getTopHeadlinesReqDto) {

    console.log({...query, apiKey});
    
    return this.httpService
      .get<ICrawlDataRes>(
        `${this.configService.get<string>(EEnvKey.CRAWL)}top-headlines`, { params: {...query, apiKey} }
      )
      .pipe(map((response) => response.data), catchError((error: { response: { data: IErrorData } }) => {
        const { data } = error.response;
					console.log(error);
        return throwError(() => httpBadRequest(`${data.message}`))
      }));
  }

  async getSearchNews(query: getSearchNewsReqDto) {
    return this.httpService
      .get<ICrawlDataRes>(
        `${this.configService.get<string>(EEnvKey.CRAWL)}everything`, { data: {...query, apiKey} }
      )
      .pipe(map((response) => response.data), catchError((error: { response: { data: IErrorData } }) => {
        const { data } = error.response;
					console.log(error?.response?.data);
        return throwError(() => httpBadRequest(`${data.message}`))
      }));
  }

  async getNewsSources(query: getNewsSourcesReqDto) {
    return this.httpService
      .get<ICrawlDataRes>(
      `${this.configService.get<string>(EEnvKey.CRAWL)}top-headlines/sources`, { data: {...query, apiKey} }
      )
      .pipe(map((response) => response.data), catchError((error: { response: { data: IErrorData } }) => {
        const { data } = error.response;
					console.log(error?.response?.data);
        return throwError(() => httpBadRequest(`${data.message}`))
      }));
  }
  
}
