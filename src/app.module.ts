import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MySQLModule } from 'databases/mysql.module';

import { CustomConfigModule } from '@config/config.module';

import { ENodeEnvironment } from '@constants/env.constants';

import { GuardModule } from '@guards/guard.module';

import { GlobalInterceptorModule } from '@shared/interceptors/global-interceptor.module';
import { LoggerHttpRequestMiddleware } from '@shared/middleware/logger-http-request.middleware';
import { PipeModule } from '@shared/pipes/pipe.module';

import { MODULES } from './modules';

let modules = [];
if (process.env.NODE_ENV === ENodeEnvironment.PRODUCTION) {
	if (process.env.SERVER_TYPE === 'CRON') {
		modules = [CustomConfigModule, MySQLModule];
	} else {
		modules = [
			CustomConfigModule,
			GuardModule,
			MySQLModule,
			GlobalInterceptorModule,
			// GlobalFilterModule,
			PipeModule,
			...MODULES,
		];
	}
} else {
	modules = [
		CustomConfigModule,
		GuardModule,
		MySQLModule,
		GlobalInterceptorModule,
		// GlobalFilterModule,
		PipeModule,
		...MODULES,
	];
}

@Module({
	imports: modules,
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerHttpRequestMiddleware).forRoutes('*');
	}
}
