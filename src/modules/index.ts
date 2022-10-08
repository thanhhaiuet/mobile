import { AuthModule } from './auth/auth.module';
import { EventModule } from './socket/event.module';
import { UserModule } from './user/user.module';

export const MODULES = [
  UserModule,
  AuthModule,
  EventModule,
];
