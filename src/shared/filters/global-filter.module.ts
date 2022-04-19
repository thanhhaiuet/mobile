import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { MsTeamsModule } from '@shared/features/ms-teams/ms-teams.module';

import { HttpExceptionFilter } from './http-exception.filter';

@Module({
	imports: [MsTeamsModule],
	providers: [
		{
			provide: APP_FILTER,
			useClass: HttpExceptionFilter,
		},
	],
})
export class GlobalFilterModule {}
