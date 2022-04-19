import { Body, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HttpPost } from '@shared/decorators/controllers.decorator';
import { AuthService } from './data-access/auth.service';
import { ELoginReqDto, ERegisterReqDto } from './data-access/dto/auth-req.dro';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpPost('login', {isPublic: true})
  login(@Body() body: ELoginReqDto) {
    return this.authService.login(body.email, body.password);
  }

  @HttpPost('register', {isPublic: true})
  register(@Body() body: ERegisterReqDto) {
    return this.authService.register(body);
  }


}
