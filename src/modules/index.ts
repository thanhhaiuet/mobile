import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { EventModule } from './socket/event.module';
import { UserModule } from './user/user.module';

export const MODULES = [UserModule, AuthModule, EventModule, CategoryModule, ProductModule];
