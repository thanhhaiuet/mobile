import { Body, Controller, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { EUserRole } from '@constants/api.constants';

import { HttpGet, HttpPost } from '@shared/decorators/controllers.decorator';
import { BasePaginationRequestDto, BaseParamDto } from '@shared/dtos/base-request.dto';

import { CategoryService } from './data-access/category.service';
import { CMSCategoryBodyDto, CMSCategoryReqDto, ListCategoryRqDto } from './data-access/dtos/category-request.dto';
import { CMSListCategoryResDto, ListCategoryResDto } from './data-access/dtos/category-response.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @HttpGet('', { isPublic: true, validateQuery: ListCategoryRqDto })
  @ApiOkResponse({ type: ListCategoryResDto })
  getCategories(@Query() query: ListCategoryRqDto) {
    return this.categoryService.getCategories(query);
  }

  @HttpGet(':id/subcategories', { isPublic: true, validateQuery: [BasePaginationRequestDto, BaseParamDto] })
  @ApiOkResponse({ type: ListCategoryResDto })
  getSubcategories(@Param() param: BaseParamDto, @Query() query: BasePaginationRequestDto) {
    return this.categoryService.getSubcategories(param.id, query);
  }

  @HttpGet(``, { guard: EUserRole.ADMIN, validateQuery: [CMSCategoryReqDto] })
  @ApiOkResponse({ type: CMSListCategoryResDto })
  getListCategory(@Query() query: CMSCategoryReqDto) {
    return this.categoryService.cmsGetListCategory(query);
  }

  @HttpPost(``, { guard: EUserRole.USER })
  addNewCategory(@Body() body: CMSCategoryBodyDto) {
    return this.categoryService.addNewCategory(body);
  }

  @HttpGet('/subcategories', { guard: EUserRole.USER })
  getSubCategories(@Query() query: BasePaginationRequestDto) {
    return this.categoryService.getSubcategoriesNoId(query)
  }
}
