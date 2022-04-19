import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost } from '@nestjs/core';
import { Request } from 'express';

import { IJwtPayload } from '@modules/auth/data-access/interfaces/auth.interface';

import { MsTeamsService } from '@shared/features/ms-teams/ms-teams.service';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly msTeamsService: MsTeamsService,
    private readonly configService: ConfigService,
    private readonly httpAdapterHost: HttpAdapterHost,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const data = {
      status: status,
      REQUEST: {
        host: request.headers?.host,
        url: request.url,
        method: request.method,
        user: null,
        body: null,
      },
      RESPONSE:
        exception instanceof HttpException
          ? exception.getResponse()
          : { statusCode: status, message: 'Internal server error' },
    };
    if (
      request.method == 'POST' ||
      request.method == 'PUT' ||
      request.method == 'PATCH'
    ) {
      data.REQUEST['body'] = JSON.stringify(request?.body)
        .split(',')
        .join(' <br> ');
    }
    if ((request as any)?.user) {
      const user = (request as any)?.user as IJwtPayload;
      data.REQUEST['user'] = { id: user?.userId };
    }

    const facts = [
      {
        name: 'status',
        value: `${data.status}`,
      },
      {
        name: 'request',
        value: `host: ${data.REQUEST.host} <br> url: ${data.REQUEST.url} <br> method: ${data.REQUEST.method}`,
      },
      {
        name: 'user',
        value: `id: ${data.REQUEST.user?.id}}`,
      },
      {
        name: 'response',
        value: `statusCode: ${
          (data.RESPONSE as any)?.statusCode
        } <br> message: ${(data.RESPONSE as any)?.message}`,
      },
    ];

    facts.push({
      name: 'body',
      value: `${data.REQUEST?.body}`,
    });

    this.msTeamsService.sendErrLog({
      '@type': 'MessageCard',
      '@context': 'http://schema.org/extensions',
      themeColor: '0076D7',
      summary: 'Yell - Error Log',
      sections: [
        {
          activityTitle: 'Error Log',
          facts: facts,
          markdown: true,
        },
      ],
    });

    httpAdapter.reply(response, data.RESPONSE, status);
  }
}
