import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';

import { EUserRole } from '@constants/api.constants';
import { EEnvKey } from '@constants/env.constants';

import { UserRepository } from '@modules/user/data-access/user.repository';

import { httpBadRequest } from '@shared/exceptions/http-exception';

import { ERegisterReqDto } from './dto/auth-req.dro';
import { IJwtPayload } from './interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) { }
  async login(email: string, password: string) {
    const existUser = await this.userRepo.findOne({ email });

    if (!existUser) httpBadRequest('Record is not exist!');

    const comparePass = await compare(password, existUser.password);

    if (!comparePass) httpBadRequest('Wrong password!');

    return this.getLoginData(existUser.id, EUserRole.USER, existUser.privacyUpdatedTimes);
  }

  async register(body: ERegisterReqDto) {
    const { email, password, phone } = body;

    const existUser = await this.userRepo.findOne({ email, phone });

    if (existUser) {
      if (existUser?.email === body.email) httpBadRequest('Email đã được đăng kí');
      if (existUser?.phone === phone) httpBadRequest('Số điện thoại đã được đăng ký');
      httpBadRequest('Bản ghi đã tồn tại');
    }

    const hashPass = await hash(password, 10);

    const newUser = this.userRepo.create({ ...body, password: hashPass, privacyUpdatedTimes: 0 });

    return this.userRepo.save(newUser);
  }

  private getLoginData(userId: string, role: EUserRole, privacyUpdatedTimes: number) {
    const refreshTokenSecret = this.configService.get<string>(EEnvKey.REFRESH_TOKEN_SECRET_JWT);
    const payload = { userId, privacyUpdatedTimes, role } as IJwtPayload;

    const accessToken = this.jwtService.sign(payload, { expiresIn: '1d' });
    const refreshToken = this.jwtService.sign(payload, {
      secret: refreshTokenSecret,
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }
}
