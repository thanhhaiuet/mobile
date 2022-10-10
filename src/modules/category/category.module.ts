import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryController } from './category.controller';
import { CategoryRepository } from './data-access/category.repository';
import { CategoryService } from './data-access/category.service';

@Module({
	imports: [TypeOrmModule.forFeature([CategoryRepository])],
	controllers: [CategoryController],
	providers: [CategoryService],
})
export class CategoryModule {}
