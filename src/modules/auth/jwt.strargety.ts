import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { EEnvKey } from '@constants/env.constants';

import { IJwtPayload } from './data-access/interfaces/auth.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(public readonly configService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: true,
			secretOrKey: configService.get(EEnvKey.SECRET_JWT),
		});
	}

	async validate(payload: IJwtPayload) {
		return payload;
	}
}
