import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HttpGet, HttpPost } from '@shared/decorators/controllers.decorator';
import { UserService } from './data-access/user.service';


@ApiTags('User')
@Controller('user')
export class UserController {
  
  constructor(private readonly userService: UserService){}

 @HttpGet('user')
 user() {
   return;
 }
  
}
