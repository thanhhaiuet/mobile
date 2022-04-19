import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EEnvKey } from '@constants/env.constants';

import { UserRepository } from '@modules/user/data-access/user.repository';
import { UserModule } from '@modules/user/user.module';

import { AuthController } from './auth.controller';
import { AuthService } from './data-access/auth.service';
import { JwtStrategy } from './jwt.strargety';

@Module({
	imports: [
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => {
				return {
					secret: configService.get(EEnvKey.SECRET_JWT),
					signOptions: {
						expiresIn: '1d',
					},
				} as JwtModuleOptions;
			},
			inject: [ConfigService],
		}),
		TypeOrmModule.forFeature([UserRepository]),
		HttpModule,
		UserModule,
	],
	providers: [AuthService, JwtStrategy],
	controllers: [AuthController],
	exports: [AuthService],
})
export class AuthModule {}
